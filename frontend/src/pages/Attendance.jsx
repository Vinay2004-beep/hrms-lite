import { useEffect, useState } from "react";
import { getEmployees, markAttendance, getAttendance } from "../api";

export default function Attendance() {
  const [employees, setEmployees] = useState([]);
  const [empId, setEmpId] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("Present");
  const [records, setRecords] = useState([]);

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    setEmployees(await getEmployees());
  };

  const loadAttendance = async (id) => {
    setRecords(await getAttendance(id));
  };

  const mark = async () => {
    if (!empId || !date) {
      alert("Select employee and date");
      return;
    }

    await markAttendance(empId, { date, status });
    setDate("");
    loadAttendance(empId);
  };

  return (
    <>
      <h2>Attendance</h2>

      <div className="attendance-row">
        <select value={empId} onChange={e => {
          setEmpId(e.target.value);
          loadAttendance(e.target.value);
        }}>
          <option value="">Select Employee</option>
          {employees.map(emp => (
            <option key={emp.id} value={emp.id}>
              {emp.name}
            </option>
          ))}
        </select>

        <input type="date" value={date}
          onChange={e => setDate(e.target.value)} />

        <select value={status}
          onChange={e => setStatus(e.target.value)}>
          <option>Present</option>
          <option>Absent</option>
        </select>

        <button onClick={mark}>Mark</button>
      </div>

      <ul style={{ marginTop: "15px" }}>
        {records.map(r => (
          <li key={r.id}>{r.date} – {r.status}</li>
        ))}
      </ul>
    </>
  );
}
