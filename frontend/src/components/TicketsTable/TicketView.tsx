import * as React from "react";
import { auth } from "../../config/firebase";
import Ticket from "../../interfaces/Ticket";
import {
  getTicketById,
  updateComments,
  updateTicket,
} from "../../services/ticketServices";
import Comment from "../../interfaces/Comment";
import User from "../../interfaces/User";
import { getUserList } from "../../services/userServices";
import { getProjectList } from "../../services/projectServices";
import Project from "../../interfaces/Project";
import Select from "react-select";
import {
  ticketTypeArray,
  ticketSeverityArray,
  getDefaultTicketType,
  getDefaultTicketSeverity,
} from "../../interfaces/constants";

const TicketView = ({ ticket }: { ticket: Ticket | undefined }) => {
  // general view states
  const [comment, setComment] = React.useState<string>("");
  const [isSendingComment, setisSendingComment] = React.useState(false);
  const [finalTicket, setFinalTicket] = React.useState<Ticket | undefined>(
    ticket
  );
  const [users, setUsers] = React.useState<User[]>([]);
  const [projects, setProjects] = React.useState<Project[]>([]);

  // Modal and form states
  const [showModal, setShowModal] = React.useState(false);
  const [ticketName, setTicketName] = React.useState(ticket?.title);
  const [assignedProject, setAssignedProject] = React.useState<any>(
    ticket?.project
  );
  const [assignedDev, setAssignedDev] = React.useState<any>(ticket?.user);
  const [assignedType, setAssignedType] = React.useState<any>(ticket?.type);
  const [assignedSeverity, setAssignedSeverity] = React.useState<any>(
    ticket?.severity
  );
  const [updatedDescription, setUpdatedDescription] = React.useState(
    ticket?.description
  );

  React.useEffect(() => {
    const getTicketDetails = async () => {
      console.log("Im in the hook");

      // fetch comments again and send it
      console.log(ticket?.id);
      const res = await getTicketById(String(ticket?.id));
      console.log(res);
      setFinalTicket(res.data);
    };

    const getListOfUsers = async () => {
      const res = await getUserList();
      console.log(res);
      setUsers(res);
    };

    const getListOfProjects = async () => {
      const res = await getProjectList(String(auth.currentUser?.uid));
      setProjects(res);
    };

    getTicketDetails();
    getListOfUsers();
    getListOfProjects();

    setTicketName(ticket?.title);
    setAssignedProject(ticket?.project);
    setAssignedDev(ticket?.user);
    setAssignedType(ticket?.type);
    setAssignedSeverity(ticket?.severity);
    setUpdatedDescription(ticket?.description);

    console.log(finalTicket);
    console.log(users);
  }, [ticket?.id, ticket, isSendingComment]);

  const sendComment = async () => {
    const commentToSend: Comment = {
      ticketId: String(finalTicket?.id),
      userId: String(finalTicket?.user),
      time: Date.now().toString(),
      message: comment,
    };

    const res = await updateComments(commentToSend);
    console.log(res.status);
  };

  const getAssignedUser = (id: string) => {
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

    users.forEach((user) => {
      if (user.userId === id) {
        returnUser = user;
      }
    });
    return returnUser;
  };

  const getAssignedProject = (id: string) => {
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
    projects.forEach((project) => {
      if (project.id === id) {
        returnProject = project;
      }
    });
    return returnProject;
  };

  const ticketToSend: Ticket = {
    description: String(updatedDescription),
    id: String(finalTicket?.id),
    title: String(ticketName),
    type: assignedType,
    user: assignedDev,
    severity: assignedSeverity ? assignedSeverity.value : "",
    project: assignedProject,
    comments: [],
    value: String(ticketName),
    label: String(ticketName),
  };

  const handleClick = async () => {
    console.log(ticketToSend);
    const res = await updateTicket(ticketToSend);
    console.log(res);
  };

  return (
    <div>
      <div className="pl-10 pt-10 md:mb-0 mb-6">
        <button
          className="py-2 px-3 bg-gray-200 rounded-md hover:bg-green-200"
          onClick={() => setShowModal(true)}
        >
          Edit the ticket
        </button>
      </div>

      {showModal === true ? (
        <div className="justify-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
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
                      <h2 className="leading-relaxed">Update the Ticket</h2>
                      <p className="text-sm text-gray-500 font-normal leading-relaxed">
                        Provide more details of the ticket you want to update.
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
                          value={ticketName}
                          onChange={(value) =>
                            setTicketName(value.target.value)
                          }
                        />
                      </div>

                      <Select
                        closeMenuOnSelect={true}
                        options={projects}
                        placeholder="Assign to Project"
                        defaultValue={getAssignedProject(
                          String(finalTicket?.project)
                        )}
                        onChange={(value) => {
                          console.log(value);
                          if (value) {
                            setAssignedProject(value.id);
                          }
                        }}
                      />

                      <Select
                        closeMenuOnSelect={true}
                        options={users}
                        placeholder="Assign User"
                        defaultValue={getAssignedUser(
                          String(finalTicket?.user)
                        )}
                        onChange={(value) => {
                          if (value) {
                            console.log(value.userId);
                            setAssignedDev(value.userId);
                          }
                        }}
                      />

                      <Select
                        closeMenuOnSelect={true}
                        options={ticketTypeArray}
                        className="font-sans"
                        placeholder="Ticket Type"
                        defaultValue={
                          ticketTypeArray[
                            getDefaultTicketType(String(finalTicket?.type))
                          ]
                        }
                        onChange={(value) => {
                          setAssignedType(value?.value);
                        }}
                      />

                      <Select
                        closeMenuOnSelect={true}
                        options={ticketSeverityArray}
                        className="font-sans"
                        placeholder="Ticket Severity"
                        defaultValue={
                          ticketSeverityArray[
                            getDefaultTicketSeverity(
                              String(finalTicket?.severity)
                            )
                          ]
                        }
                        onChange={(e) => setAssignedSeverity(e)}
                      />

                      <label className="block">
                        <span className="text-gray-700">Description</span>
                        <textarea
                          className="form-textarea mt-1 block w-full border focus:ring-gray-500 focus:border-gray-900 w-full border-gray-300 rounded-md focus:outline-none text-gray-600 text-sm p-2"
                          placeholder="Write a description for the ticket."
                          rows={5}
                          defaultValue={finalTicket?.description}
                          onChange={(e) =>
                            setUpdatedDescription(e.target.value)
                          }
                        ></textarea>
                      </label>
                    </div>
                    <div className="pt-4 flex items-center space-x-4">
                      <button
                        className="flex justify-center items-center w-full text-gray-900 px-4 py-3 rounded-md focus:outline-none"
                        onClick={() => setShowModal(false)}
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
                          handleClick();
                          setShowModal(false);
                        }}
                      >
                        Update
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}

      <div className="flex flex-wrap">
        {/* STARTS HERE */}
        <div className="p-10 md:w-2/3 md:mb-0 mb-6 flex flex-col w-full">
          <div className="pattern-dots-md gray-light">
            <div className="rounded bg-gray-100 p-4 min-h-full max-h-screen overflow-auto">
              <div className="flex-grow text-gray-800">
                <h2 className=" text-3xl title-font font-medium mb-3">
                  {finalTicket?.title}
                </h2>
                <ul>
                  <li className="leading-relaxed text-xl font-semibold text-justify">
                    Ticket Id:
                  </li>
                  <li className="leading-relaxed text-lg text-justify">
                    {finalTicket?.id}
                  </li>
                  <li className="leading-relaxed text-xl font-semibold text-justify">
                    Priority:
                  </li>
                  <li className="leading-relaxed text-lg text-justify">
                    {finalTicket?.severity}
                  </li>
                  <li className="leading-relaxed text-xl font-semibold text-justify">
                    Type
                  </li>
                  <li className="leading-relaxed text-lg text-justify">
                    {finalTicket?.type}
                  </li>
                  <li className="leading-relaxed text-xl font-semibold text-justify">
                    Assignee
                  </li>
                  <li className="leading-relaxed text-lg text-justify">
                    {getAssignedUser(String(finalTicket?.user)).name}
                  </li>
                  <li className="leading-relaxed text-xl font-semibold text-justify">
                    Project
                  </li>
                  <li className="leading-relaxed text-lg text-justify">
                    {getAssignedProject(String(finalTicket?.project)).name}
                  </li>
                  <li className="leading-relaxed text-xl font-semibold text-justify">
                    Description:
                  </li>
                  <li className="leading-relaxed text-lg text-justify">
                    {finalTicket?.description}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="p-10 md:w-1/3 md:mb-0 mb-6 flex flex-col w-full">
          <div className="pattern-dots-md gray-light">
            <div className="rounded bg-gray-100 p-4">
              <div className="flex-grow text-gray-800">
                <h2 className=" text-xl title-font font-medium">Comments:</h2>
                <div className="antialiased mx-auto max-w-screen-sm">
                  <div className="space-y-4">
                    {finalTicket ? (
                      finalTicket.comments.map((item: any, index: number) => {
                        return (
                          <div className="flex" key={index}>
                            <div className="flex-1 border rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
                              <strong>
                                {getAssignedUser(item.userId).name}
                              </strong>{" "}
                              <span className="text-xs text-gray-400">
                                {item.time}
                              </span>
                              <p className="text-sm">{item.message}</p>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <></>
                    )}

                    <div className="flex flex-col">
                      <h2 className="px-1 pt-3 pb-2 text-gray-800 text-lg">
                        Add a new comment
                      </h2>

                      <form className="flex flex-col">
                        <textarea
                          className="flex-1 border rounded-lg py-2 sm:px-6 sm:py-4 leading-relaxed"
                          placeholder="Type Your Comment"
                          required
                          onChange={(e) => setComment(e.target.value)}
                        />
                        <div className="flex justify-end pt-2">
                          <button
                            type="button"
                            className="flex justify-end py-2 px-2 border rounded-md pr-2 hover:bg-white"
                            onClick={() => {
                              sendComment()
                                .then(() => {
                                  setisSendingComment(!isSendingComment);
                                })
                                .catch((err) => {
                                  console.log(err.message);
                                });
                            }}
                          >
                            Post comment
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketView;
