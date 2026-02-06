from sqlalchemy.orm import Session
from . import models, schemas

# -------- EMPLOYEE --------

def get_employees(db: Session):
    return db.query(models.Employee).all()

def create_employee(db: Session, emp: schemas.EmployeeCreate):
    employee = models.Employee(**emp.dict())
    db.add(employee)
    db.commit()
    db.refresh(employee)
    return employee

def delete_employee(db: Session, emp_id: int):
    emp = db.query(models.Employee).get(emp_id)
    if emp:
        db.delete(emp)
        db.commit()

# -------- ATTENDANCE --------

def add_attendance(db: Session, emp_id: int, att: schemas.AttendanceCreate):
    record = models.Attendance(
        emp_id=emp_id,
        date=att.date,
        status=att.status
    )
    db.add(record)
    db.commit()
    db.refresh(record)
    return record

def get_attendance(db: Session, emp_id: int):
    return db.query(models.Attendance).filter_by(emp_id=emp_id).all()

def add_attendance(db: Session, emp_id: int, att: schemas.AttendanceCreate):
    record = models.Attendance(
        emp_id=emp_id,
        date=att.date,
        status=att.status
    )
    db.add(record)
    db.commit()
    db.refresh(record)
    return record


def get_attendance(db: Session, emp_id: int):
    return db.query(models.Attendance).filter_by(emp_id=emp_id).all()
