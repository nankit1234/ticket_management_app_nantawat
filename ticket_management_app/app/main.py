from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session
from sqlalchemy.exc import SQLAlchemyError
from app import models, schemas, database
from typing import List


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)


SQLALCHEMY_DATABASE_URL = "mysql+mysqlconnector://root:@localhost:3306/test"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"charset": "utf8mb4"})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/tickets", response_model=List[schemas.TicketResponse])
def get_tickets(db: Session = Depends(get_db)):
    try:
        tickets = db.query(models.Ticket).all()
        return tickets
    except SQLAlchemyError as e:
        raise HTTPException(status_code=500, detail="Error fetching tickets")


@app.post("/tickets", response_model=schemas.TicketResponse)
def create_ticket(ticket: schemas.TicketCreate, db: Session = Depends(get_db)):
    try:
        db_ticket = models.Ticket(
            title=ticket.title,
            description=ticket.description,
            contact_info=ticket.contact_info,
            status=ticket.status
        )
        db.add(db_ticket)
        db.commit()
        db.refresh(db_ticket)
        return db_ticket
    except SQLAlchemyError as e:
        raise HTTPException(status_code=500, detail="Error creating ticket")


@app.put("/tickets/{ticket_id}", response_model=schemas.TicketResponse)
def update_ticket_status(ticket_id: int, ticket: schemas.TicketUpdate, db: Session = Depends(get_db)):
    try:
        ticket_to_update = db.query(models.Ticket).filter(models.Ticket.id == ticket_id).first()
        if not ticket_to_update:
            raise HTTPException(status_code=404, detail="Ticket not found")
        
        
        ticket_to_update.status = ticket.status
        db.commit()
        db.refresh(ticket_to_update)
        return ticket_to_update
    except SQLAlchemyError as e:
        raise HTTPException(status_code=500, detail="Error updating ticket status")



@app.delete("/tickets/{ticket_id}", response_model=schemas.TicketResponse)
def delete_ticket(ticket_id: int, db: Session = Depends(get_db)):
    try:
        ticket = db.query(models.Ticket).filter(models.Ticket.id == ticket_id).first()
        if ticket is None:
            raise HTTPException(status_code=404, detail="Ticket not found")
        db.delete(ticket)
        db.commit()
        return ticket
    except SQLAlchemyError as e:
        raise HTTPException(status_code=500, detail="Error deleting ticket")


# @app.get("/tickets/status/{status}", response_model=List[schemas.TicketResponse])
# def get_tickets_by_status(status: schemas.TicketStatus, db: Session = Depends(get_db)):
#     try:
#         tickets = db.query(models.Ticket).filter(models.Ticket.status == status).all()
#         return tickets
#     except SQLAlchemyError as e:
#         raise HTTPException(status_code=500, detail="Error fetching tickets by status")


# @app.get("/statuses", response_model=List[schemas.StatusResponse])
# def get_statuses(db: Session = Depends(get_db)):
#     try:
#         statuses = db.query(models.Status).all()
#         return statuses
#     except SQLAlchemyError as e:
#         raise HTTPException(status_code=500, detail="Error fetching statuses")


# @app.post("/statuses", response_model=schemas.StatusResponse)
# def create_status(status: schemas.StatusCreate, db: Session = Depends(get_db)):
#     try:
#         db_status = models.Status(name=status.name)
#         db.add(db_status)
#         db.commit()
#         db.refresh(db_status)
#         return db_status
#     except SQLAlchemyError as e:
#         raise HTTPException(status_code=500, detail="Error creating status")


# @app.delete("/statuses/{status_id}", response_model=schemas.StatusResponse)
# def delete_status(status_id: int, db: Session = Depends(get_db)):
#     try:
#         status = db.query(models.Status).filter(models.Status.id == status_id).first()
#         if status is None:
#             raise HTTPException(status_code=404, detail="Status not found")
#         db.delete(status)
#         db.commit()
#         return status
#     except SQLAlchemyError as e:
#         raise HTTPException(status_code=500, detail="Error deleting status")


@app.get("/")
def read_root():
    return {"message": "Welcome to the Ticket Management API!"}
