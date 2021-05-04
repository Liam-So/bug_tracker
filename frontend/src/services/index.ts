import Firebase from "../config/firebase";
import Project from "../interfaces/Project";
import Ticket from "../interfaces/Ticket";
import User from "../interfaces/User";

// refs
const ticketRef = Firebase.firestore().collection("tickets");
const userRef = Firebase.firestore().collection("users");
const projectRef = Firebase.firestore().collection("projects");

// Generate Ticket Id
export function getTicketId(): string {
  return Math.random().toString(20).substr(2, 6);
}

// Sending Tickets to DB
export const sendTicketToDB = async (ticket: Ticket) => {

  // send ticket to db
  ticketRef.doc(ticket.id).set({
    description: ticket.description,
    id: ticket.id,
    title: ticket.title,
    type: ticket.type,
    user: ticket.user,
    severity: ticket.severity,
    project: ticket.project,
    comments: ticket.comments
  });

};

// Sending Project to DB
export const sendProjectToDB = (project: Project) => {
  projectRef.doc(project.id).set({
    description: project.description,
    id: project.id,
    num_bugs: [],
    status: project.status,
    team: project.team,
    name: project.name
  });
};

export type ProjectItem = {
  projectId: string;
  name: string;
  label: string;
  value: string;
};

export const getProjectList = async (userId: string | null) => {
  const res = await projectRef.where("team", "array-contains", userId).get();

  const listOfProjects: ProjectItem[] = [];

  res.forEach((project) => {
    listOfProjects.push({
      projectId: project.data().id,
      name: project.data().name,
      label: project.data().name,
      value: project.data().name,
    });
  });

  return listOfProjects;
};

// Users
export type UserItem = {
  value: string;
  label: string;
  userId: string;
};

export const getUserList = async () => {
  const res = await userRef.get();

  const listOfUsers: User[] = [];

  res.forEach((item) => {
    listOfUsers.push({
      value: item.data().name,
      label: item.data().name,
      user: item.data().name,
      email: item.data().email,
      name: item.data().name,
      title: item.data().title,
      userDesc: item.data().userDesc,
      userId: item.data().userId,
    });
  });

  return listOfUsers;
};
