import axios from "axios";

// URL ของ FastAPI Backend
const API_URL = "http://localhost:8000";

// ฟังก์ชันเพื่อดึงข้อมูลสถานะทั้งหมด

// ฟังก์ชันเพื่อดึงข้อมูลตั๋วทั้งหมด
export const fetchTickets = async () => {
  try {
    const response = await axios.get(`${API_URL}/tickets`);
    return response.data;
  } catch (error) {
    console.error("Error fetching tickets:", error);
    throw error;
  }
};




// ฟังก์ชันเพื่อลบตั๋ว
export const deleteTicket = async (ticketId) => {
  try {
    await axios.delete(`${API_URL}/tickets/${ticketId}`);
  } catch (error) {
    console.error("Error deleting ticket:", error);
    throw error;
  }
};

// ฟังก์ชันสำหรับสร้างตั๋วใหม่
export const createTicket = async (ticketData) => {
  try {
    const response = await axios.post(`${API_URL}/tickets`, ticketData);
    return response.data;
  } catch (error) {
    console.error("Error creating ticket:", error);
    throw error;
  }
};

export const updateTicket = async (ticketId, updatedData) => {
  try {
    const response = await axios.put(`${API_URL}/tickets/${ticketId}`, updatedData);
    console.log('Ticket updated successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating ticket:", error);
    throw error;
  }
};




