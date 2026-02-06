import { useState } from "react";
import Employees from "./pages/Employees";
import Attendance from "./pages/Attendance";

export default function App() {
  const [page, setPage] = useState("employees");

  return (
    <div className="page container">
      <h1>HRMS Lite</h1>

      <div style={{ marginBottom: "20px" }}>
        <button onClick={() => setPage("employees")}>
          Employees
        </button>
        &nbsp;
        <button onClick={() => setPage("attendance")}>
          Attendance
        </button>
      </div>

      <div className="card">
        {page === "employees" && <Employees />}
        {page === "attendance" && <Attendance />}
      </div>
    </div>
  );
}
