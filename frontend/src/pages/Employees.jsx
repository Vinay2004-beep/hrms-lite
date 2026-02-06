import { useEffect, useState } from "react";
import { getEmployees, addEmployee, deleteEmployee } from "../api";

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({
    employee_id: "",
    name: "",
    email: "",
    department: ""
  });

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    setEmployees(await getEmployees());
  };

  const submit = async () => {
    if (!form.employee_id || !form.name || !form.email || !form.department) {
      alert("Fill all fields");
      return;
    }

    await addEmployee(form);
    setForm({ employee_id: "", name: "", email: "", department: "" });
    load();
  };

  return (
    <>
      <h2>Add Employee</h2>

      <div className="form-row">
        <input placeholder="Employee ID"
          value={form.employee_id}
          onChange={e => setForm({ ...form, employee_id: e.target.value })} />

        <input placeholder="Name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })} />

        <input placeholder="Email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })} />

        <input placeholder="Department"
          value={form.department}
          onChange={e => setForm({ ...form, department: e.target.value })} />
      </div>

      <button onClick={submit}>Add Employee</button>

      <h2 style={{ marginTop: "30px" }}>Employees</h2>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {employees.map(emp => (
            <tr key={emp.id}>
              <td>{emp.employee_id}</td>
              <td>{emp.name}</td>
              <td>{emp.email}</td>
              <td>{emp.department}</td>
              <td>
                <button
                  className="delete-btn"
                  onClick={async () => {
                    await deleteEmployee(emp.id);
                    load();
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
