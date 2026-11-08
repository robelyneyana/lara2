import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import TopNav from "./components/TopNav";
import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import Pets from "./pages/Pets";
import Veterinarians from "./pages/Veterinarians";
import Appointments from "./pages/Appointments";
import Treatments from "./pages/Treatments";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
    return (
        <BrowserRouter>
            <TopNav />
            <main className="app-main container-fluid">
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/customers" element={<Customers />} />
                    <Route path="/veterinarians" element={<Veterinarians />} />
                    <Route path="/treatments" element={<Treatments />} />
                    <Route path="/pets" element={<Pets />} />
                    <Route path="/appointments" element={<Appointments />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </main>
            <footer className="app-footer">© {new Date().getFullYear()} PetCare Management System</footer>
        </BrowserRouter>
    );
}
