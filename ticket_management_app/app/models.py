from sqlalchemy import Column, Integer, String, Text, DateTime, Enum
from sqlalchemy.sql import func
from sqlalchemy.ext.declarative import declarative_base
import enum

Base = declarative_base()

class TicketStatus(enum.Enum):
    pending = 'pending'
    accepted = 'accepted'
    resolved = 'resolved'
    rejected = 'rejected'

class Ticket(Base):
    __tablename__ = 'tickets'
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(Text)
    contact_info = Column(String)
    status = Column(Enum(TicketStatus), default=TicketStatus.pending)
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())
