# Ticket Management System

A full-stack ticket management system built with **React** for the frontend and **FastAPI** for the backend. This system allows users to create, manage, and track tickets in a Kanban-style board with various statuses.

## Features

- Create new tickets with title, description, and contact information.
- Manage ticket statuses: Pending, Accepted, Resolved, Rejected.
- Drag and drop functionality for managing ticket statuses in the Kanban board.
- Responsive design built with **React Bootstrap**.
- Backend implemented with **FastAPI**.

## Tech Stack

- **Frontend**: React, React Bootstrap, React-DnD
- **Backend**: FastAPI, Python
- **Database**: SQLite or PostgreSQL (depending on the environment)

## Installation

### Prerequisites

1. **Node.js** and **npm** for the frontend
2. **Python 3.8+** for the backend
3. **PostgreSQL** (optional, if you prefer PostgreSQL over SQLite)

### 1. Clone the repository

```bash
git clone https://github.com/your-username/ticket-management-system.git
cd ticket-management-system


///////////////////////////////////////////////////////////////////////////////////

1.Install frontend dependencies

cd ticket-management-frontend
npm install

///////////////////////////////////////////////////////////////////////////////////

2.Install backend dependencies

cd ticket_management_app
pip install -r requirements.txt

///////////////////////////////////////////////////////////////////////////////////

3.Set up environment variables

Make sure to create a .env file in the backend directory with the necessary environment variables (e.g., database URL, secret key, etc.).

///////////////////////////////////////////////////////////////////////////////////

4.Run frontend (React)

cd ticket-management-frontend
npm start

///////////////////////////////////////////////////////////////////////////////////

5.Run backend (FastAPI)

cd ticket_management_app
.\venv\Scripts\activate
uvicorn main:app --reload

stop FastAPI
.\venv\Scripts\deactivate

///////////////////////////////////////////////////////////////////////////////////

Now the application should be running at:

     Frontend: http://localhost:3000
     Backend: http://localhost:8000

Usage:
      Open the app in your browser.
      Create new tickets by clicking the "Create Ticket" button.
      Drag and drop tickets between different statuses (Pending, Accepted, Resolved, Rejected).
      You can view the ticket details and update their status.

///////////////////////////////////////////////////////////////////////////////////


API Endpoints
 
Create a new ticket
   Endpoint: POST /tickets
   Request body:
json

{
  "title": "Ticket Title",
  "description": "Ticket description",
  "contact_info": "contact@example.com",
  "status": "pending"
}
///////////////////////////////////////////////////////////////////////////////////


Get all tickets
   Endpoint: GET /tickets

///////////////////////////////////////////////////////////////////////////////////

Update a ticket's status
  Endpoint: PUT /tickets/{ticket_id}
  Request body:
json

{
  "status": "resolved"
}

///////////////////////////////////////////////////////////////////////////////////

Delete a ticket
  Endpoint: DELETE /tickets/{ticket_id}

///////////////////////////////////////////////////////////////////////////////////

Running Tests
 For backend (FastAPI): pytest
 For frontend (React): npm test
