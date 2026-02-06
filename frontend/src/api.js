const BASE_URL = "http://127.0.0.1:8000";

export const getEmployees = async () => {
  const res = await fetch(`${BASE_URL}/employees`);
  return res.json();
};

export const addEmployee = async (data) => {
  return fetch(`${BASE_URL}/employees`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
};

export const deleteEmployee = async (id) => {
  return fetch(`${BASE_URL}/employees/${id}`, {
    method: "DELETE",
  });
};

export const markAttendance = async (empId, data) => {
  return fetch(`http://127.0.0.1:8000/attendance/${empId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
};

export const getAttendance = async (empId) => {
  const res = await fetch(`http://127.0.0.1:8000/attendance/${empId}`);
  return res.json();
};
