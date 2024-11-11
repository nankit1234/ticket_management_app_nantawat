// import React, { useState, useEffect,  } from "react";
// // import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

// import Modal from "react-modal";
// import { FaPlus } from "react-icons/fa";
// import TicketItem from "./TicketItem";
// import TicketForm from "./TicketForm";
// import { fetchTickets, updateTicket} from "../api";
// import { Card, Container, Row, Col } from "react-bootstrap";

// Modal.setAppElement("#root");

// const statuses = ["pending", "accepted", "resolved", "rejected"];

// const KanbanBoard = () => {
//   const [tickets, setTickets] = useState([]);
//   const [statusTickets, setStatusTickets] = useState({
//     pending: [],
//     accepted: [],
//     resolved: [],
//     rejected: [],
//   });
//   const [isModalOpen, setIsModalOpen] = useState(false);
  
// //   useEffect(() => {
// //   console.log("Fetching tickets...");
// //   const getTickets = async () => {
// //     try {
// //       const ticketsData = await fetchTickets();
// //       console.log("Tickets data fetched:", ticketsData);
// //       const organizedTickets = {
// //         pending: [],
// //         accepted: [],
// //         resolved: [],
// //         rejected: [],
// //       };
// //       ticketsData.forEach((ticket) => {
// //         organizedTickets[ticket.status].push(ticket);
// //       });
// //       setStatusTickets(organizedTickets);
// //       setTickets(ticketsData);
// //     } catch (error) {
// //       console.error("Error fetching tickets", error);
// //     }
// //   };

// //   getTickets();
// // }, []); 
// useEffect(() => {
//   console.log("Fetching tickets...");
//   const getTickets = async () => {
//     try {
//       const ticketsData = await fetchTickets();
//       console.log("Tickets data fetched:", ticketsData);
//       const organizedTickets = {
//         pending: [],
//         accepted: [],
//         resolved: [],
//         rejected: [],
//       };

//       // จัดกลุ่มตั๋วตามสถานะและเรียงตาม updated_at
//       ticketsData.forEach((ticket) => {
//         organizedTickets[ticket.status].push(ticket);
//       });

//       // เรียงลำดับแต่ละกลุ่มสถานะโดยใช้ updated_at โดยให้เรียงลำดับจากมากไปน้อย (ใหม่ล่าสุดก่อน)
//       Object.keys(organizedTickets).forEach((status) => {
//         organizedTickets[status].sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
//       });

//       setStatusTickets(organizedTickets);
//       setTickets(ticketsData);
//     } catch (error) {
//       console.error("Error fetching tickets", error);
//     }
//   };

//   getTickets();
// }, []); // เรียกครั้งเดียวเมื่อ component โหลดครั้งแรก



// const handleOnDragEnd = async (result) => {
//   const { destination, source } = result;

//   // ถ้าไม่มีปลายทางให้ return ออกไป
//   if (!destination) return;

//   const sourceColumn = source.droppableId;
//   const destinationColumn = destination.droppableId;


//   if (sourceColumn === destinationColumn) return;

//   const ticketToMove = statusTickets[sourceColumn][source.index];
//   const ticketId = ticketToMove.id;  // ดึง id ของ ticket ที่ลาก
//   console.log("tickets:", tickets);
//   console.log("Ticket ID:", ticketId);  // ตรวจสอบ id ของ ticket ที่กำลังจะถูกอัปเดต
//   console.log("Moving ticket from", sourceColumn, "to", destinationColumn);

//   const updatedTicket = { ...ticketToMove, status: destinationColumn };

//   try {
//     // อัปเดต ticket ใน backend
//     await updateTicket(ticketId, updatedTicket);
//     // const updatedTicketFromResponse = await updateTicket(ticketId, updatedTicket);;
//     // // อัปเดตสถานะใน frontend
//     const sourceColumnTickets = Array.from(statusTickets[sourceColumn]);
//     const destinationColumnTickets = Array.from(statusTickets[destinationColumn]);

//     // const refreshedTickets = tickets.map((ticket) =>
//     //   ticket.id === updatedTicketFromResponse.id ? updatedTicketFromResponse : ticket
//     // );
//     // setTickets(refreshedTickets);

//     // ลบ ticket จากคอลัมน์ต้นทาง และเพิ่มไปที่คอลัมน์ปลายทาง
//     sourceColumnTickets.splice(source.index, 1);
//     destinationColumnTickets.splice(destination.index, 0, ticketToMove);

//     setStatusTickets({
//       ...statusTickets,
//       [sourceColumn]: sourceColumnTickets,
//       [destinationColumn]: destinationColumnTickets,
//     });
//     //fetchTickets();

//      window.location.reload();
//   } catch (error) {
//     console.error("Error updating ticket status", error);
//   }
  
// };


//   const openModal = () => setIsModalOpen(true);

//   const closeModal = () => setIsModalOpen(false);
  
//   const handleTicketCreated = (newTicket) => {
//     setTickets((prevTickets) => [...prevTickets, newTicket]);
//     setStatusTickets((prevStatusTickets) => {
//       const updatedTickets = { ...prevStatusTickets };
//       updatedTickets[newTicket.status].push(newTicket);
//       return updatedTickets;
      
//     });
//     closeModal();
//   };
  
  
  

//   return (
//     <Container  className="kanban-board-container">
//       <button className="add-ticket-btn" onClick={openModal}>
//         <FaPlus />
//       </button>

//       <Modal
//         isOpen={isModalOpen}
//         onRequestClose={closeModal}
//         contentLabel="Create New Ticket"
//         style={{
//           content: {
//             width: "600px",
//             height: "600px",
//             maxWidth: "600px",
//             maxHeight: "600px",
//             margin: "auto",
//             padding: "50px",
//           },
//         }}
//       >
//         {/* <button className="close-btn" onClick={closeModal}>
//           <FaTimes />
//         </button> */}
//         <TicketForm onTicketCreated={handleTicketCreated} />
//       </Modal>

//       <DragDropContext onDragEnd={handleOnDragEnd}>
//        <Row>
//         {statuses.map((status) => (
//           <Col key={status} md={4} lg={3} xl={3}> {/* ปรับขนาดคอลัมน์ */}
//           <Card className="mb-4">
//             <Card.Header className="bg-secondary text-white">
//             {status.charAt(0).toUpperCase() + status.slice(1)}
//             </Card.Header>
//              <Droppable key={status} droppableId={status}>
//               {(provided) => (
//               <div
//                 className="kanban-column"
//                 ref={provided.innerRef}
//                 {...provided.droppableProps}
//               >
//                 {/* <h3>{status.charAt(0).toUpperCase() + status.slice(1)}</h3> */}
//                 {/* <div className="ticket-list"> */}
//                   {statusTickets[status].map((ticket, index) => (
//                     <Draggable
//                       key={`${ticket.id}-${index}`}
//                       draggableId={ticket.id.toString()}
//                       index={index}
//                     >
//                       {(provided) => (
//                         <Card
//                         className="mb-2"
//                         ref={provided.innerRef}
//                         {...provided.draggableProps}
//                         {...provided.dragHandleProps}
//                       >
//                         <Card.Body>
//                           <TicketItem ticket={ticket} />
//                         </Card.Body>
//                       </Card>
//                       )}
//                     </Draggable>
//                   ))}
//                   {provided.placeholder}
//                   </div>
//                   )}
//                 </Droppable>
//                  </Card>
//             </Col>
//           ))}
//         </Row>
//       </DragDropContext>
//     </Container >
//   );
// };

// export default KanbanBoard;

import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import Modal from "react-modal";
import { FaPlus } from "react-icons/fa";
import TicketItem from "./TicketItem";
import TicketForm from "./TicketForm";
import { fetchTickets, updateTicket } from "../api";
import { Card, Container, Row, Col } from "react-bootstrap";

Modal.setAppElement("#root");

const statuses = ["pending", "accepted", "resolved", "rejected"];

const KanbanBoard = () => {
  const [tickets, setTickets] = useState([]);
  const [statusTickets, setStatusTickets] = useState({
    pending: [],
    accepted: [],
    resolved: [],
    rejected: [],
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    console.log("Fetching tickets...");
    const getTickets = async () => {
      try {
        const ticketsData = await fetchTickets();
        console.log("Tickets data fetched:", ticketsData);
        const organizedTickets = {
          pending: [],
          accepted: [],
          resolved: [],
          rejected: [],
        };
        ticketsData.forEach((ticket) => {
          organizedTickets[ticket.status].push(ticket);
        });
        setStatusTickets(organizedTickets);
        setTickets(ticketsData);
      } catch (error) {
        console.error("Error fetching tickets", error);
      }
    };

    getTickets();
  }, []);

  const getColumnHeaderColor = (status) => {
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

  const handleOnDragEnd = async (result) => {
    const { destination, source } = result;

    if (!destination) return;

    const sourceColumn = source.droppableId;
    const destinationColumn = destination.droppableId;

    if (sourceColumn === destinationColumn) return;

    const ticketToMove = statusTickets[sourceColumn][source.index];
    const ticketId = ticketToMove.id;
    const updatedTicket = { ...ticketToMove, status: destinationColumn };

    try {
      await updateTicket(ticketId, updatedTicket);

      const sourceColumnTickets = Array.from(statusTickets[sourceColumn]);
      const destinationColumnTickets = Array.from(statusTickets[destinationColumn]);

      sourceColumnTickets.splice(source.index, 1);
      destinationColumnTickets.splice(destination.index, 0, ticketToMove);

      setStatusTickets({
        ...statusTickets,
        [sourceColumn]: sourceColumnTickets,
        [destinationColumn]: destinationColumnTickets,
      });
    } catch (error) {
      console.error("Error updating ticket status", error);
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleTicketCreated = (newTicket) => {
    setTickets((prevTickets) => [...prevTickets, newTicket]);
    setStatusTickets((prevStatusTickets) => {
      const updatedTickets = { ...prevStatusTickets };
      updatedTickets[newTicket.status].push(newTicket);
      return updatedTickets;
    });
    closeModal();
  };

  return (
    <Container className="kanban-board-container">
      <button className="add-ticket-btn" onClick={openModal}>
        <FaPlus />
      </button>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Create New Ticket"
        style={{
          content: {
            width: "600px",
            height: "600px",
            maxWidth: "600px",
            maxHeight: "600px",
            margin: "auto",
            padding: "50px",
          },
        }}
      >
        <TicketForm onTicketCreated={handleTicketCreated} />
      </Modal>

      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Row>
          {statuses.map((status) => (
            <Col key={status} md={4} lg={3} xl={3}>
              <Card className="mb-4">
                <Card.Header className={`bg-${getColumnHeaderColor(status)} text-white`}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </Card.Header>
                <Droppable droppableId={status}>
                  {(provided) => (
                    <div
                      className="kanban-column"
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      {statusTickets[status].map((ticket, index) => (
                        <Draggable
                          key={`${ticket.id}-${index}`}
                          draggableId={ticket.id.toString()}
                          index={index}
                        >
                          {(provided) => (
                            <Card
                              className="mb-2"
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <Card.Body>
                                <TicketItem ticket={ticket} />
                              </Card.Body>
                            </Card>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </Card>
            </Col>
          ))}
        </Row>
      </DragDropContext>
    </Container>
  );
};

export default KanbanBoard;

