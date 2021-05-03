import Firebase from "../config/firebase";
import Project from "../interfaces/Project";
import Ticket from "../interfaces/Ticket";
import User from "../interfaces/User";

// Generate Ticket Id
export function getTicketId(): string {
  return Math.random().toString(20).substr(2, 6);
}

// Sending Tickets to DB
const ticketRef = Firebase.firestore().collection("tickets");

export const sendTicketToDB = (ticket: Ticket) => {
  ticketRef
    .add(ticket)
    .then((value) => console.log(value))
    .catch((error) => console.log(error.message));
};

// Sending Project to DB
const projectRef = Firebase.firestore().collection("projects");

export const sendProjectToDB = (project: Project) => {
  projectRef
    .add(project)
    .then(() => console.log(project))
    .catch((error) => console.log(error.message));
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

export type UserItem = {
  value: string;
  label: string;
  userId: string;
};

const userRef = Firebase.firestore().collection("users");

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
