import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

export default function TopNav() {
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    function handleSearch(event) {
        event.preventDefault();
        const term = search.trim();
        if (!term) return;
        navigate(`/pets?search=${encodeURIComponent(term)}`);
    }

    return (
        <Navbar expand="lg" className="petcare-navbar" variant="dark">
            <Container fluid="lg">
                <Navbar.Brand as={Link} to="/" className="brand">
                    <span className="brand-mark">🐾</span> PetCare
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="petcare-navigation" />
                <Navbar.Collapse id="petcare-navigation">
                    <Nav className="me-auto">
                        <Nav.Link as={NavLink} to="/">Dashboard</Nav.Link>
                        <Nav.Link as={NavLink} to="/customers">Customers</Nav.Link>
                        <Nav.Link as={NavLink} to="/veterinarians">Veterinarian</Nav.Link>
                        <Nav.Link as={NavLink} to="/treatments">Treatment</Nav.Link>
                        <Nav.Link as={NavLink} to="/pets">Pets</Nav.Link>
                        <NavDropdown title="Appointment" id="appointment-menu">
                            <NavDropdown.Item as={Link} to="/appointments">Manage Appointments</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Form className="d-flex nav-search" onSubmit={handleSearch}>
                        <Form.Control
                            type="search"
                            placeholder="Search pets..."
                            aria-label="Search pets"
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                        />
                        <Button type="submit" variant="light">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
