import React, { useEffect, useState } from 'react';
import { fetchTickets } from '../api';
import TicketItem from './TicketItem';

const TicketList = ({ status }) => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getTickets = async () => {
      setLoading(true);
      try {
        const data = await fetchTickets(status);
        setTickets(data);
      } catch (error) {
        console.error("Error fetching tickets", error);
      } finally {
        setLoading(false);
      }
    };

    getTickets();
  }, [status]);

  const handleTicketCreated = (newTicket) => {
    setTickets([...tickets, newTicket]); // อัปเดตรายการตั๋วด้วยตั๋วใหม่ที่ถูกสร้าง
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <TicketForm onTicketCreated={handleTicketCreated} />
      <h2>Tickets</h2>
      <ul>
        {tickets.length === 0 ? (
          <li>No tickets found.</li>
        ) : (
          tickets.map(ticket => (
            <TicketItem key={ticket.id} ticket={ticket} />
          ))
        )}
      </ul>
    </div>
  );
};

export default TicketList;
