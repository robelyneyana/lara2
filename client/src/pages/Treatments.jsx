import CrudPage from "../components/CrudPage";
const fields = [
    { name: "name", label: "Treatment Name" },
    { name: "price", label: "Price", type: "number" },
    { name: "description", label: "Description", type: "textarea" },
    { name: "AppointmentId", label: "Appointment", optionsEndpoint: "appointment",
      optionLabel: (item) => `Appointment #${item.id} — ${item.status} — ${new Date(item.appointmentDate).toLocaleDateString()}` }
];
export default function Treatments() {
    return <CrudPage title="Treatment Management" endpoint="treatment" fields={fields}
        columns={[
            { key: "name", label: "Treatment" }, { label: "Price", value: (row) => `₱${Number(row.price || 0).toLocaleString()}` },
            { key: "description", label: "Description" },
            { label: "Appointment", value: (row) => `#${row.AppointmentId || "—"}` }
        ]} />;
}
