import CrudPage from "../components/CrudPage";
const fields = [
    { name: "name", label: "Pet Name" },
    { name: "species", label: "Species" },
    { name: "breed", label: "Breed" },
    { name: "age", label: "Age" },
    { name: "gender", label: "Gender" },
    { name: "CustomerId", label: "Pet Owner", optionsEndpoint: "customer" }
];
export default function Pets() {
    return <CrudPage title="Pet Management" endpoint="pet" fields={fields}
        columns={[
            { key: "name", label: "Pet Name" }, { key: "species", label: "Species" },
            { key: "breed", label: "Breed" }, { key: "age", label: "Age" },
            { key: "gender", label: "Gender" },
            { label: "Owner", value: (row) => row.Customer?.name || `Customer #${row.CustomerId || "—"}` }
        ]} />;
}
