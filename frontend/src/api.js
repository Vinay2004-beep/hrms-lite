const BASE = "https://hrms-lite-backend-i1s3.onrender.com";

export const getEmployees = async () => {
  const res = await fetch(`${BASE}/employees`);
  return res.json();
};

export const addEmployee = async (data) => {
  return fetch(`${BASE}/employees`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
};

export const deleteEmployee = async (id) => {
  return fetch(`${BASE}/employees/${id}`, { method: "DELETE" });
};

export const markAttendance = async (empId, data) => {
  return fetch(`${BASE}/attendance/${empId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
};

export const getAttendance = async (empId) => {
  const res = await fetch(`${BASE}/attendance/${empId}`);
  return res.json();
};
