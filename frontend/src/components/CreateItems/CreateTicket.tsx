import * as React from 'react';
import { auth } from "../../config/firebase";
import Project from "../../interfaces/Project";
import Ticket from "../../interfaces/Ticket";
import User from "../../interfaces/User";
import Select from "react-select";
import { ticketTypeArray, ticketSeverityArray } from "./Data";
import { getTicketId } from "../../services";
import { getProjectList } from "../../services/projectServices"
import { getUserList } from "../../services/userServices"
import { sendTicket } from "../../services/ticketServices"

const CreateTicket = () => {

  // Ticket
  const [ticketType, setTicketType] = React.useState<any | null[]>([]);
  const [ticketDescription, setTicketDescription] = React.useState("");
  const [ticketTitle, setTicketTitle] = React.useState("");
  const [modalTicket, setModalTicket] = React.useState(false);
  const [ticketSeverity, setTicketSeverity] = React.useState<any | null>("");
  const [ticketProject, setTicketProject] = React.useState<any | null>("");
  const [assignUser, setAssignUser] = React.useState<any | null>();

  const [users, setUsers] = React.useState<User[]>([]); 
  const [projects, setProjects] = React.useState<Project[]>([]);

  // Object creation to send to the DB
  const ticket: Ticket = {
    description: ticketDescription,
    id: getTicketId(),
    type: ticketType.value,
    title: ticketTitle,
    user: assignUser,
    severity: ticketSeverity.value,
    project: ticketProject.id,
    comments: [],
    value: ticketTitle,
    label: ticketTitle,
    status: 'pending'
  };

  // Call the API's and set the values
  React.useEffect(() => {
    const getUsers = async () => {
      const res = await getUserList();
      setUsers(res);
    };

    const getProjects = async () => {
        const res = await getProjectList(String(auth.currentUser?.uid));
        setProjects(res);
    }

    getUsers();
    getProjects();
  }, []);

  return (
    <>
      {/* Buttons */}
      <div className="flex justify-center md:justify-start pt-2 2xl:px-12 pl-6 pt-5">
        <button
          className="py-2 px-3 bg-green-200 rounded-md hover:bg-gray-400 font-semibold text-gray-700"
          onClick={() => setModalTicket(true)}
        >
          New Ticket
        </button>
      </div>

      {/* Modal for Creating a Ticket */}
      {modalTicket === true ? (
        <div className="h-full flex flex-col justify-center sm:py-12">
          <div className="relative py-3 sm:max-w-xl sm:mx-auto">
            <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
              <div className="max-w-md mx-auto">
                <div className="flex items-center space-x-5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-14 w-14 rounded-full flex flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                    />
                  </svg>
                  <div className="block pl-2 font-semibold text-xl self-start text-gray-700">
                    <h2 className="leading-relaxed">Create a Ticket</h2>
                    <p className="text-sm text-gray-500 font-normal leading-relaxed">
                      Provide more details of the ticket you want to create.
                    </p>
                  </div>
                </div>
                <div className="divide-y divide-gray-200">
                  <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                    <div className="flex flex-col">
                      <label className="leading-loose">Ticket Name</label>
                      <input
                        type="text"
                        className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                        placeholder="Ticket Name"
                        onChange={(value) => setTicketTitle(value.target.value)}
                      />
                    </div>

                    <Select
                      closeMenuOnSelect={true}
                      options={projects}
                      placeholder="Assign to Project"
                      onChange={(value) => setTicketProject(value)}
                    />

                    <Select
                      closeMenuOnSelect={true}
                      options={users}
                      placeholder="Assign User"
                      onChange={value => {
                          if (value) {
                            console.log(value.userId);
                            setAssignUser(value.userId);
                        };
                      }}
                    />

                    <Select
                      closeMenuOnSelect={true}
                      options={ticketTypeArray}
                      className="font-sans"
                      placeholder="Ticket Type"
                      onChange={(value) => {
                        setTicketType(value);
                      }}
                    />

                    <Select
                      closeMenuOnSelect={true}
                      options={ticketSeverityArray}
                      className="font-sans"
                      placeholder="Ticket Severity"
                      onChange={(e) => setTicketSeverity(e)}
                    />

                    <label className="block">
                      <span className="text-gray-700">Description</span>
                      <textarea
                        className="form-textarea mt-1 block w-full border focus:ring-gray-500 focus:border-gray-900 w-full border-gray-300 rounded-md focus:outline-none text-gray-600 text-sm p-2"
                        placeholder="Write a description for the ticket."
                        onChange={(e) => setTicketDescription(e.target.value)}
                      ></textarea>
                    </label>
                  </div>
                  <div className="pt-4 flex items-center space-x-4">
                    <button
                      className="flex justify-center items-center w-full text-gray-900 px-4 py-3 rounded-md focus:outline-none"
                      onClick={() => setModalTicket(false)}
                    >
                      <svg
                        className="w-6 h-6 mr-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        ></path>
                      </svg>{" "}
                      Cancel
                    </button>
                    <button
                      className="bg-blue-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none"
                      onClick={() => {
                        sendTicket(ticket);
                        setModalTicket(false);
                      }}
                    >
                      Create
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default CreateTicket;
