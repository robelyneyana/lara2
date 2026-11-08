import CrudPage from "../components/CrudPage";
const fields = [
    { name: "name", label: "Veterinarian Name" },
    { name: "specialization", label: "Specialization" },
    { name: "contactNo", label: "Contact Number", type: "tel" }
];
export default function Veterinarians() {
    return <CrudPage title="Veterinarian Management" endpoint="veterinarian" fields={fields}
        columns={[{ key: "name", label: "Veterinarian" }, { key: "specialization", label: "Specialization" }, { key: "contactNo", label: "Contact Number" }]} />;
}
