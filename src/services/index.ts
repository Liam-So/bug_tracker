import Firebase from "../config/firebase";
import Project from "../interfaces/Project";
import Ticket from "../interfaces/Ticket";

// Generate Ticket Id
export function getTicketId(): string {
    return Math.random().toString(20).substr(2,6) ;
}

// Sending Tickets to DB
const ticketRef = Firebase.firestore().collection('tickets');

export const sendTicketToDB = (ticket:Ticket) => {
    
    ticketRef.add(ticket)
        .then(value => console.log(value))
        .catch(error => console.log(error.message));
}

// Sending Project to DB
const projectRef = Firebase.firestore().collection('projects');

export const sendProjectToDB = (project: Project) => {
    projectRef.add(project)
        .then(() => console.log(project))
        .catch(error => console.log(error.message));
}