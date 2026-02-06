from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from .database import SessionLocal, engine
from . import models, schemas, crud

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# -------- EMPLOYEE APIs --------

@app.get("/employees")
def list_employees(db: Session = Depends(get_db)):
    return crud.get_employees(db)

@app.post("/employees")
def add_employee(emp: schemas.EmployeeCreate, db: Session = Depends(get_db)):
    return crud.create_employee(db, emp)

@app.delete("/employees/{emp_id}")
def remove_employee(emp_id: int, db: Session = Depends(get_db)):
    crud.delete_employee(db, emp_id)
    return {"ok": True}

# -------- ATTENDANCE APIs --------

@app.post("/attendance/{emp_id}")
def mark_attendance(
    emp_id: int,
    att: schemas.AttendanceCreate,
    db: Session = Depends(get_db)
):
    return crud.add_attendance(db, emp_id, att)

@app.get("/attendance/{emp_id}")
def list_attendance(emp_id: int, db: Session = Depends(get_db)):
    return crud.get_attendance(db, emp_id)

@app.post("/attendance/{emp_id}")
def mark_attendance(
    emp_id: int,
    att: schemas.AttendanceCreate,
    db: Session = Depends(get_db)
):
    return crud.add_attendance(db, emp_id, att)


@app.get("/attendance/{emp_id}")
def list_attendance(emp_id: int, db: Session = Depends(get_db)):
    return crud.get_attendance(db, emp_id)
