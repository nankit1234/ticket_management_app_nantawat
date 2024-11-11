// import React from "react";

// const TicketItem = ({ ticket }) => {
//   return (
//     <div className="ticket-item">
//       <h4>{ticket.title}</h4>
//       <p>{ticket.description}</p>
//       <p>Status: {ticket.status}</p>
//     </div>
//   );
// };

// export default TicketItem;
import React from 'react';
const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleString(); // แปลง timestamp เป็นวันที่ในรูปแบบที่อ่านได้
};

const TicketItem = ({ ticket }) => {
  return (
    <li>
      <h3>{ticket.title}</h3>
      <p>{ticket.description}</p>
      <p><strong>Status:</strong> {ticket.status}</p>
      <p><strong>Contact:</strong> {ticket.contact_info}</p>
      <p><strong>Last Updated:</strong> {formatDate(ticket.updated_at)}</p>
    </li>
  );
};

export default TicketItem;
