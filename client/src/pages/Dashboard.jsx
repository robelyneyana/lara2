import { useEffect, useState } from "react";
import { Alert, Button, Card, Col, Row, Table } from "react-bootstrap";
import { Link } from "react-router";

const API = "http://localhost:3007/api";

export default function Dashboard() {
    const [data, setData] = useState({ customer: [], pet: [], veterinarian: [], appointment: [], treatment: [] });
    const [error, setError] = useState("");

    useEffect(() => {
        let active = true;
        async function load() {
            try {
                const names = ["customer", "pet", "veterinarian", "appointment", "treatment"];
                const values = await Promise.all(names.map(async (name) => {
                    const response = await fetch(`${API}/${name}`);
                    const result = await response.json();
                    if (!response.ok) throw new Error(result.message || `Unable to load ${name}`);
                    return result;
                }));
                if (active) {
                    setData(Object.fromEntries(names.map((name, index) => [name, values[index]])));
                    setError("");
                }
            } catch (err) {
                if (active) setError(`${err.message}. Check the server and database connection.`);
            }
        }
        load();
        return () => { active = false; };
    }, []);

    const stats = [
        { label: "Registered Pets", value: data.pet.length, icon: "🐾", color: "blue", to: "/pets" },
        { label: "Customers", value: data.customer.length, icon: "👥", color: "green", to: "/customers" },
        { label: "Veterinarians", value: data.veterinarian.length, icon: "🩺", color: "purple", to: "/veterinarians" },
        { label: "Appointments", value: data.appointment.length, icon: "📅", color: "orange", to: "/appointments" }
    ];

    return (
        <>
            <div className="dashboard-welcome">
                <div>
                    <div className="eyebrow">OVERVIEW</div>
                    <h1>Good day! Welcome to PetCare</h1>
                    <p>Here’s what’s happening at your pet care station.</p>
                </div>
                <Button as={Link} to="/appointments" className="add-button">＋ New Appointment</Button>
            </div>
            {error && <Alert variant="danger">{error}</Alert>}
            <Row className="g-3 mb-4">
                {stats.map((stat) => (
                    <Col xs={12} sm={6} xl={3} key={stat.label}>
                        <Card as={Link} to={stat.to} className={`stat-card stat-${stat.color} text-decoration-none`}>
                            <Card.Body>
                                <div className="stat-top"><span>{stat.label}</span><span className="stat-icon">{stat.icon}</span></div>
                                <div className="stat-value">{stat.value}</div>
                                <small>View records →</small>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            <Row className="g-3">
                <Col lg={8}>
                    <Card className="content-card h-100">
                        <Card.Body>
                            <div className="section-heading"><div><h2>Recent Appointments</h2><p>Latest scheduled visits</p></div><Button as={Link} to="/appointments" variant="outline-primary" size="sm">View all</Button></div>
                            <Table responsive hover className="data-table mb-0">
                                <thead><tr><th>Date</th><th>Customer</th><th>Pet</th><th>Status</th></tr></thead>
                                <tbody>
                                    {data.appointment.slice(0, 5).map((item) => (
                                        <tr key={item.id}>
                                            <td>{item.appointmentDate ? new Date(item.appointmentDate).toLocaleDateString() : "—"}</td>
                                            <td>{item.Customer?.name || `Customer #${item.CustomerId || "—"}`}</td>
                                            <td>{item.Pet?.name || `Pet #${item.PetId || "—"}`}</td>
                                            <td><span className="status-pill">{item.status}</span></td>
                                        </tr>
                                    ))}
                                    {data.appointment.length === 0 && <tr><td colSpan="4" className="empty-cell">No appointments yet.</td></tr>}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg={4}>
                    <Card className="content-card h-100">
                        <Card.Body>
                            <h2>Quick Actions</h2>
                            <p className="muted-small mb-3">Quickly access common tasks.</p>
                            <div className="quick-actions">
                                <Link to="/pets">🐾 <span><strong>Register a Pet</strong><small>Add a pet profile</small></span> <b>→</b></Link>
                                <Link to="/customers">👤 <span><strong>Add Customer</strong><small>Register a pet owner</small></span> <b>→</b></Link>
                                <Link to="/veterinarians">🩺 <span><strong>Add Veterinarian</strong><small>Manage your team</small></span> <b>→</b></Link>
                                <Link to="/treatments">💊 <span><strong>Manage Treatments</strong><small>View treatment records</small></span> <b>→</b></Link>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
}
