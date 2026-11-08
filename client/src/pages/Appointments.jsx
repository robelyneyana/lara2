import CrudPage from "../components/CrudPage";
const fields = [
    { name: "CustomerId", label: "Customer", optionsEndpoint: "customer" },
    { name: "PetId", label: "Pet", optionsEndpoint: "pet", optionLabel: (item) => `${item.name} — ${item.species} (ID: ${item.id})` },
    { name: "VeterinarianId", label: "Veterinarian", optionsEndpoint: "veterinarian", optionLabel: (item) => `${item.name} (ID: ${item.id})` },
    { name: "appointmentDate", label: "Appointment Date and Time", type: "datetime-local" },
    { name: "status", label: "Status", defaultValue: "Pending" },
    { name: "reason", label: "Reason", type: "textarea" }
];
export default function Appointments() {
    return <CrudPage title="Appointment Management" endpoint="appointment" fields={fields}
        columns={[
            { label: "Date", key: "appointmentDate", date: true },
            { label: "Customer", value: (row) => row.Customer?.name || `#${row.CustomerId || "—"}` },
            { label: "Pet", value: (row) => row.Pet?.name || `#${row.PetId || "—"}` },
            { label: "Veterinarian", value: (row) => row.Veterinarian?.name || `#${row.VeterinarianId || "—"}` },
            { key: "status", label: "Status" }, { key: "reason", label: "Reason" }
        ]} />;
}
