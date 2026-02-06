from pydantic import BaseModel

class EmployeeCreate(BaseModel):
    employee_id: str
    name: str
    email: str
    department: str


class AttendanceCreate(BaseModel):
    date: str
    status: str
