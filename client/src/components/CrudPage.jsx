import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router";
import { Alert, Button, Form, Modal, Spinner, Table } from "react-bootstrap";

const API = "http://localhost:3007/api";

export default function CrudPage({ title, endpoint, fields, columns }) {
    const [searchParams] = useSearchParams();
    const searchTerm = searchParams.get("search") || "";
    const [records, setRecords] = useState([]);
    const [options, setOptions] = useState({});
    const [formData, setFormData] = useState({});
    const [editingId, setEditingId] = useState(null);
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const url = `${API}/${endpoint}`;

    const loadRecords = useCallback(async () => {
        setLoading(true);
        try {
            const response = await fetch(`${url}${searchTerm ? `?search=${encodeURIComponent(searchTerm)}` : ""}`);
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "Could not load records.");
            setRecords(data);
            setError("");
        } catch (err) {
            setError(`${err.message} Check that the backend and MySQL are running.`);
        } finally {
            setLoading(false);
        }
    }, [url, searchTerm]);

    useEffect(() => { loadRecords(); }, [loadRecords]);

    const relationFields = useMemo(
        () => fields.filter((field) => field.optionsEndpoint),
        [fields]
    );

    async function openForm(record = null) {
        setError("");
        setEditingId(record?.id ?? null);
        const initial = {};
        fields.forEach((field) => {
            let value = record ? (record[field.name] ?? "") : (field.defaultValue ?? "");
            if (field.type === "datetime-local" && value) {
                const date = new Date(value);
                value = new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
            } else if (field.type === "date" && value) {
                value = String(value).slice(0, 10);
            }
            initial[field.name] = value;
        });
        setFormData(initial);

        const nextOptions = {};
        await Promise.all(relationFields.map(async (field) => {
            try {
                const response = await fetch(`${API}/${field.optionsEndpoint}`);
                if (!response.ok) throw new Error("Unable to load options");
                nextOptions[field.name] = await response.json();
            } catch {
                nextOptions[field.name] = [];
            }
        }));
        setOptions(nextOptions);
        setShow(true);
    }

    function changeField(event) {
        setFormData((previous) => ({ ...previous, [event.target.name]: event.target.value }));
    }

    async function submitForm(event) {
        event.preventDefault();
        setSaving(true);
        setError("");
        const payload = { ...formData };
        fields.forEach((field) => {
            if (field.type === "number" && payload[field.name] !== "") {
                payload[field.name] = Number(payload[field.name]);
            }
        });
        try {
            const response = await fetch(editingId ? `${url}/${editingId}` : url, {
                method: editingId ? "PUT" : "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "Unable to save record.");
            setShow(false);
            await loadRecords();
        } catch (err) {
            setError(err.message);
        } finally {
            setSaving(false);
        }
    }

    async function deleteRecord(id) {
        if (!window.confirm("Are you sure you want to delete this record?")) return;
        setError("");
        try {
            const response = await fetch(`${url}/${id}`, { method: "DELETE" });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "Unable to delete record.");
            await loadRecords();
        } catch (err) {
            setError(err.message);
        }
    }

    function displayValue(record, column) {
        if (column.render) return column.render(record);
        const value = column.value ? column.value(record) : record[column.key];
        if (value === null || value === undefined || value === "") return "—";
        if (column.date) return new Date(value).toLocaleString();
        return String(value);
    }

    return (
        <section>
            <div className="page-heading">
                <div>
                    <div className="eyebrow">PETCARE MANAGEMENT</div>
                    <h1>{title}</h1>
                    <p>View, add, update, and manage {title.toLowerCase()} records.</p>
                </div>
                <Button onClick={() => openForm()} className="add-button">＋ Add {title.replace(" Management", "").replace(/s$/, "")}</Button>
            </div>

            {searchTerm && <Alert variant="info" className="py-2">Search results for: <strong>{searchTerm}</strong></Alert>}
            {error && <Alert variant="danger" dismissible onClose={() => setError("")}>{error}</Alert>}

            <div className="table-panel">
                <div className="table-panel-heading">
                    <div><strong>{title} List</strong><small>{records.length} record(s)</small></div>
                    <Button variant="outline-secondary" size="sm" onClick={loadRecords}>↻ Refresh</Button>
                </div>
                <Table responsive hover className="data-table mb-0">
                    <thead>
                        <tr>
                            <th>ID</th>
                            {columns.map((column) => <th key={column.label}>{column.label}</th>)}
                            <th className="actions-heading">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan={columns.length + 2} className="empty-cell"><Spinner size="sm" /> Loading records...</td></tr>
                        ) : records.length === 0 ? (
                            <tr><td colSpan={columns.length + 2} className="empty-cell">No records found. Select “Add” to create your first record.</td></tr>
                        ) : records.map((record) => (
                            <tr key={record.id}>
                                <td className="id-cell">#{record.id}</td>
                                {columns.map((column) => <td key={column.label}>{displayValue(record, column)}</td>)}
                                <td className="text-nowrap">
                                    <Button size="sm" variant="outline-primary" className="me-2" onClick={() => openForm(record)}>Edit</Button>
                                    <Button size="sm" variant="outline-danger" onClick={() => deleteRecord(record.id)}>Delete</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>

            <Modal show={show} onHide={() => setShow(false)} centered>
                <Form onSubmit={submitForm}>
                    <Modal.Header closeButton>
                        <Modal.Title>{editingId ? "Edit" : "Add"} {title.replace(" Management", "").replace(/s$/, "")}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {fields.map((field) => (
                            <Form.Group className="mb-3" key={field.name}>
                                <Form.Label>{field.label}</Form.Label>
                                {field.optionsEndpoint ? (
                                    <Form.Select name={field.name} value={formData[field.name] ?? ""} onChange={changeField} required>
                                        <option value="">Select {field.label}</option>
                                        {(options[field.name] || []).map((option) => (
                                            <option key={option.id} value={option.id}>
                                                {field.optionLabel ? field.optionLabel(option) : `${option.name} (ID: ${option.id})`}
                                            </option>
                                        ))}
                                    </Form.Select>
                                ) : field.type === "textarea" ? (
                                    <Form.Control as="textarea" rows={3} name={field.name} value={formData[field.name] ?? ""} onChange={changeField} required={field.required !== false} />
                                ) : (
                                    <Form.Control type={field.type || "text"} name={field.name} value={formData[field.name] ?? ""} onChange={changeField} required={field.required !== false} min={field.type === "number" ? 0 : undefined} />
                                )}
                            </Form.Group>
                        ))}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShow(false)}>Cancel</Button>
                        <Button type="submit" disabled={saving}>{saving ? "Saving..." : "Save Record"}</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </section>
    );
}
