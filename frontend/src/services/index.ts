import User from "../interfaces/User"
import Project from "../interfaces/Project"

// Generate Ticket Id
export function getTicketId(): string {
  return Math.random().toString(20).substr(2, 6);
}

export const getUserIdsFromArray = (arrayOfUsers: any | null) => {
  const res: string[] = [];
  if (arrayOfUsers) {
    arrayOfUsers.forEach((item: any) => {
      res.push(item.userId);
    });
  }

  return res;
}

export const getAssignedUser = (id: string, arrayOfUsers: User[]) => {

  let returnUser: User = {
    value: "",
    label: "",
    user: "",
    email: "",
    name: "",
    title: "",
    userDesc: "",
    userId: "",
  };

  arrayOfUsers.forEach(user => {
    if (user.userId === id) {
      returnUser = user;
    }
  });
  return returnUser;
}


export const getAssignedProject = (id: string, projects: Project[]) => {
  let returnProject: Project = {
    description: "",
    id: "",
    num_bugs: [],
    status: "",
    team: [],
    name: "",
    value: "",
    label: "",
  };
  projects.forEach(project => {
    if (project.id === id) {
      returnProject = project;
    }
  });
  return returnProject;
}

