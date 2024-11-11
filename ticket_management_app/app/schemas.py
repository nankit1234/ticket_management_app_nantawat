from pydantic import BaseModel
from datetime import datetime
from enum import Enum


class TicketStatus(str, Enum):
    pending = 'pending'
    accepted = 'accepted'
    resolved = 'resolved'
    rejected = 'rejected'


class TicketBase(BaseModel):
    title: str
    description: str
    contact_info: str
    status: TicketStatus = TicketStatus.pending

    class Config:
        orm_mode = True  

class TicketCreate(TicketBase):
    pass


class TicketUpdate(BaseModel):
    status: str  


class TicketResponse(TicketBase):
    id: int
    created_at: datetime
    updated_at: datetime

# class TicketResponse(BaseModel):
#     id: int
#     title: str
#     description: str
#     contact_info: str
#     status: TicketStatus
#     created_at: str
#     updated_at: str

#     class Config:
#         orm_mode = True


class StatusResponse(BaseModel):
    id: int
    #name: str
    
    title: str
    description: str
    contact_info: str
    status: TicketStatus
    created_at: str
    updated_at: str

    class Config:
        orm_mode = True
        
class StatusCreate(BaseModel):
    name: str
