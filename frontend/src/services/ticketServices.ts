import axios from 'axios';
import { API_URL } from '../interfaces/constants';
import Ticket from "../interfaces/Ticket"

const TICKET_URL = `${API_URL}/tickets`;

export const getTicketListForUser = async (userId: string) => {
    return await axios.get(`${TICKET_URL}/${userId}`);
}

export const sendTicket = async (ticket: Ticket) => {
    return await axios.post(TICKET_URL, ticket);
}