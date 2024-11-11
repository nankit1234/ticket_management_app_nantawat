// import React, { useState } from 'react';
// import { createTicket } from '../api';

// const TicketForm = ({ onTicketCreated }) => {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [contactInfo, setContactInfo] = useState('');
//   const [status, setStatus] = useState('pending');
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     const ticketData = { title, description, contact_info: contactInfo, status };

//     try {
//       const newTicket = await createTicket(ticketData); // ฟังก์ชันที่ถูกเรียกเพื่อสร้าง ticket
//       onTicketCreated(newTicket); // ส่งข้อมูล ticket ไปยัง KanbanBoard.js
//       setTitle('');
//       setDescription('');
//       setContactInfo('');
//       setStatus('pending');
//     } catch (error) {
//       console.error("Error creating ticket", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h2>Create New Ticket</h2>
//       <input
//         className="input-field"
//         type="text"
//         placeholder="Title"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         required
//       />
//       <textarea
//         className="input-field"
//         placeholder="Description"
//         value={description}
//         onChange={(e) => setDescription(e.target.value)}
//         required
//       ></textarea>
//       <input
//         className="input-field"
//         type="text"
//         placeholder="Contact Info"
//         value={contactInfo}
//         onChange={(e) => setContactInfo(e.target.value)}
//         required
//       />
//       <select
//         className="input-field"
//         value={status}
//         onChange={(e) => setStatus(e.target.value)}
//       >
//         <option value="pending">Pending</option>
//         <option value="accepted">Accepted</option>
//         <option value="resolved">Resolved</option>
//         <option value="rejected">Rejected</option>
//       </select>
//       <button type="submit" disabled={loading}>
//         {loading ? 'Creating...' : 'Create Ticket'}
//       </button>
//     </form>
//   );
// };

// export default TicketForm;

import React, { useState } from 'react';
import { createTicket } from '../api';
import { Form, Button, Spinner } from 'react-bootstrap';

const TicketForm = ({ onTicketCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [status, setStatus] = useState('pending');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const ticketData = { title, description, contact_info: contactInfo, status };

    try {
      const newTicket = await createTicket(ticketData); // ฟังก์ชันที่ถูกเรียกเพื่อสร้าง ticket
      onTicketCreated(newTicket); // ส่งข้อมูล ticket ไปยัง KanbanBoard.js
      setTitle('');
      setDescription('');
      setContactInfo('');
      setStatus('pending');
    } catch (error) {
      console.error("Error creating ticket", error);
    } finally {
      setLoading(false);
    }
  };

  // ฟังก์ชันเพื่อกำหนดสีของปุ่มตาม status
  const getButtonVariant = (status) => {
    switch (status) {
      case 'pending':
        return 'warning'; // สีเหลือง
      case 'accepted':
        return 'success'; // สีเขียว
      case 'resolved':
        return 'primary'; // สีน้ำเงิน
      case 'rejected':
        return 'danger'; // สีแดง
      default:
        return 'secondary'; // สีเทา
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2>Create New Ticket</h2>
      <Form.Group controlId="title">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="description">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Enter description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="contactInfo">
        <Form.Label>Contact Info</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter contact info"
          value={contactInfo}
          onChange={(e) => setContactInfo(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="status">
        <Form.Label>Status</Form.Label>
        <Form.Control
          as="select"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="pending">Pending</option>
          <option value="accepted">Accepted</option>
          <option value="resolved">Resolved</option>
          <option value="rejected">Rejected</option>
        </Form.Control>
      </Form.Group>

      <Button 
        variant={getButtonVariant(status)} // ใช้ฟังก์ชันเพื่อเปลี่ยนสีของปุ่มตามสถานะ
        type="submit" 
        disabled={loading}
      >
        {loading ? (
          <Spinner animation="border" size="sm" role="status" aria-hidden="true" />
        ) : (
          'Create Ticket'
        )}
      </Button>
    </Form>
  );
};

export default TicketForm;


