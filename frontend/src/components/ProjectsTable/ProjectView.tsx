import Project from "../../interfaces/Project";
import * as React from "react";
import { getTicketsForProject } from "../../services/ticketServices";
import Ticket from "../../interfaces/Ticket";
import User from "../../interfaces/User";
import { getUserList } from "../../services/userServices";
import Select from "react-select";
import { status_codes, getDefaultStatusCode } from "../../interfaces/constants";
import { updateProject, deleteProject } from "../../services/projectServices";
import { getUserIdsFromArray } from "../../services";
import DeleteModal from "../DeleteModal/DeleteModal";

const ProjectView = ({ project }: { project: Project | undefined }) => {
  const [tickets, setTickets] = React.useState<Ticket[]>([]);
  const [userList, setUserList] = React.useState<User[]>([]);
  const [statusModal, setStatusModal] = React.useState(false);
  const [projectName, setProjectName] = React.useState(project?.name);
  const [listOfUsers, setListOfUsers] = React.useState<any>([]);
  const [description, setDescription] = React.useState(project?.description);
  const [status, setStatus] = React.useState<any>(project?.status);

  const [finalProject, setFinalProject] = React.useState<Project | undefined>();

  React.useEffect(() => {
    const getTickets = async () => {
      const res = await getTicketsForProject(String(project?.id));
      console.log(res.data);
      setTickets(res.data);
    };

    const getListOfUsers = async () => {
      const res = await getUserList();

      const filteredArrayOfUsers = [];
      for (let item of res) {
        if (project?.team.includes(item.userId)) {
          filteredArrayOfUsers.push(item);
        }
      }

      setUserList(res);
      setListOfUsers(filteredArrayOfUsers);
    };

    // In the event that project changes, we rerun everything
    getTickets();
    getListOfUsers();
    setProjectName(project?.name);
    setDescription(project?.description);
    setStatus(project?.status);
    setFinalProject(project);
    // eslint-disable-next-line
  }, [project?.id, project]);

  const getStatus = () => {
    if (project && project.status === "in_progress") {
      return (
        <span className="bg-purple-200 text-purple-600 py-1 px-3 rounded-full text-xs">
          Active
        </span>
      );
    } else if (project && project.status === "completed") {
      return (
        <span className="bg-green-200 text-green-600 py-1 px-3 rounded-full text-xs">
          Completed
        </span>
      );
    } else if (project && project.status === "pending") {
      return (
        <span className="bg-yellow-200 text-yellow-600 py-2 px-4 rounded-full text-s">
          Pending
        </span>
      );
    }
  };

  const projectObject: Project = {
    description: String(description),
    id: String(finalProject?.id),
    num_bugs: [], // put an empty array because we won't be updating that here
    status: status,
    team: getUserIdsFromArray(listOfUsers),
    name: String(projectName),
    value: String(projectName),
    label: String(projectName),
  };

  return (
    <div>
      <section className=" text-gray-200">
        <div className="max-w-6xl mx-auto px-5 py-24 ">
          <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">
            <h1 className=" title-font mb-5 text-3xl font-extrabold leading-10 tracking-tight text-left sm:text-5xl sm:leading-none md:text-6xl text-gray-600">
              {" "}
              {project?.name}
            </h1>
            {getStatus()}
            <p className="lg:w-1/2 w-full leading-relaxed text-base text-xl text-gray-600 pb-4 mt-2">
              {project?.description}
            </p>

            <div className="flex">
              <div className="flex justify-center md:justify-start pt-2 2xl:px-12 pl-8 pt-4">
                <button
                  className="py-2 px-3 bg-gray-200 rounded-md hover:bg-gray-400 font-semibold text-gray-600"
                  onClick={() => setStatusModal(true)}
                >
                  Edit Project
                </button>
              </div>
              <div>
                <DeleteModal deleteProps={() => deleteProject(String(project?.id))} />
              </div>
            </div>

            <div className="lg:w-1/2 w-full leading-relaxed text-base text-xl text-gray-600 pb-4">
              {statusModal === true ? (
                <div className="justify-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                  <div className="h-full flex flex-col justify-center sm:py-12">
                    <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                      <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
                        <div className="max-w-md mx-auto">
                          <div className="flex items-center space-x-5">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-14 w-14"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"
                              />
                            </svg>
                            <div className="block pl-2 font-semibold text-xl self-start text-gray-700 text-left">
                              <h2 className="leading-relaxed">
                                Update your Project
                              </h2>
                              <p className="text-sm text-gray-500 font-normal leading-relaxed">
                                Provide details of the Project you want to
                                update.
                              </p>
                            </div>
                          </div>
                          <div className="divide-y divide-gray-200">
                            <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7 text-left">
                              <div className="flex flex-col">
                                <label className="leading-loose">
                                  Project Name
                                </label>
                                <input
                                  type="text"
                                  className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600 h-8"
                                  placeholder="Project Name"
                                  value={projectName}
                                  onChange={(e) =>
                                    setProjectName(e.target.value)
                                  }
                                />
                              </div>

                              <Select
                                closeMenuOnSelect={false}
                                options={status_codes}
                                placeholder="Update Project Status"
                                defaultValue={
                                  status_codes[getDefaultStatusCode(status)]
                                }
                                onChange={(e) => {
                                  if (e !== null) {
                                    setStatus(e.value);
                                  }
                                }}
                              />

                              <Select
                                closeMenuOnSelect={false}
                                isMulti
                                options={userList}
                                placeholder="Add Team Members"
                                defaultValue={listOfUsers}
                                onChange={(e) => {
                                  setListOfUsers(e);
                                }}
                              />

                              <label className="block">
                                <span className="text-gray-700">
                                  Description
                                </span>
                                <textarea
                                  className="form-textarea mt-1 block w-full border focus:ring-gray-500 focus:border-gray-900 w-full border-gray-300 rounded-md focus:outline-none text-gray-600 text-sm p-2"
                                  placeholder=" Write a description for the Project."
                                  rows={5}
                                  onChange={(e) =>
                                    setDescription(e.target.value)
                                  }
                                  defaultValue={description}
                                />
                              </label>
                            </div>
                            <div className="pt-4 flex items-center space-x-4">
                              <button
                                className="flex justify-center items-center w-full text-gray-900 px-4 py-3 rounded-md focus:outline-none"
                                onClick={() => setStatusModal(false)}
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
                                  setStatusModal(false);
                                  updateProject(projectObject);
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
            </div>
          </div>

          <div className="flex flex-wrap -m-4">
            {/* STARTS HERE */}
            <div className="p-10 md:w-2/3 md:mb-0 mb-6 flex flex-col w-full">
              <div className="pattern-dots-md gray-light">
                <div className="rounded bg-gray-100 p-4 min-h-full max-h-screen overflow-auto">
                  <div className="flex-grow text-gray-800">
                    <h2 className=" text-xl title-font font-medium mb-3">
                      Number of Tickets
                    </h2>
                    <p className="leading-relaxed text-sm text-justify">
                      You have{" "}
                      <span className="text-green-500">
                        {project?.num_bugs.length}
                      </span>{" "}
                      for this project.
                    </p>

                    <div className="w-full h-full overflow-auto shadow bg-white mt-4"></div>
                    <table className="w-full border rounded-medium">
                      <tbody>
                        {tickets.map((ticket, index) => {
                          return (
                            <tr
                              key={index}
                              className="relative transform scale-100
                                        py-1 border-b-2 border-indigo-100 cursor-default text-base h-12"
                            >
                              <td className="pl-5 pr-3 whitespace-no-wrap">
                                <div className="text-gray-400">
                                  {ticket.type}
                                </div>
                                <div>{ticket.title}</div>
                              </td>
                              <td className="px-2 py-2 whitespace-no-wrap">
                                <div className="leading-5 text-gray-900">
                                  {ticket.description}
                                  <a
                                    className="text-blue-500 hover:underline"
                                    href={`/tickets/${ticket.id}`}
                                  >
                                    {" "}
                                    {ticket.id}
                                  </a>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-10 md:w-1/3 md:mb-0 mb-6 flex flex-col w-full">
              <div className="pattern-dots-md gray-light">
                <div className="rounded bg-gray-100 p-4">
                  <div className="flex-grow text-gray-800">
                    <h2 className=" text-xl title-font font-medium">
                      Team Members
                    </h2>
                    <ul className="pt-4">
                      {listOfUsers.map((item: any, index: number) => {
                        return (
                          <li className="flex flex-col pb-2" key={index}>
                            <span className="text-lg font-semibold">
                              {item.name}
                            </span>{" "}
                            <span className="text-green-400 text-base">
                              {item.email}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectView;
