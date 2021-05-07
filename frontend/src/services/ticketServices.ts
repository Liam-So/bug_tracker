import axios from 'axios';
import { API_URL } from '../interfaces/constants';
import Ticket from "../interfaces/Ticket"

const TICKET_URL = `${API_URL}/tickets`;

export const getTicketListForUser = async (userId: string) => {
    return await axios.get(`${TICKET_URL}/forUser/${userId}`);
}

export const getTicketById = async (ticketId: string) => {
    return await axios.get(`${TICKET_URL}/${ticketId}`);
}

export const getTicketsForProject = async (projectId: string) => {
    return await axios.get(`${TICKET_URL}/forProject/${projectId}`);
}

export const sendTicket = async (ticket: Ticket) => {
    return await axios.post(TICKET_URL, ticket);
} 