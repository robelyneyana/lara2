import CrudPage from "../components/CrudPage";
const fields = [
    { name: "name", label: "Customer Name" },
    { name: "address", label: "Address" },
    { name: "contactNo", label: "Contact Number", type: "tel" }
];
export default function Customers() {
    return <CrudPage title="Customer Management" endpoint="customer" fields={fields}
        columns={[{ key: "name", label: "Customer" }, { key: "address", label: "Address" }, { key: "contactNo", label: "Contact Number" }]} />;
}
