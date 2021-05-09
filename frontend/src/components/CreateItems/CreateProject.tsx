import * as React from 'react';
import { auth } from "../../config/firebase";
import Project from "../../interfaces/Project";
import User from "../../interfaces/User";
import Select from "react-select";
import { getTicketId, getUserIdsFromArray } from "../../services";
import { getProjectList, sendProject } from "../../services/projectServices"
import { getUserList } from "../../services/userServices"

const CreateProject = () => {
  // Project
  const [modalProject, setModalProject] = React.useState(false);
  const [projectName, setProjectName] = React.useState("");
  const [projectDescription, setProjectDescription] = React.useState("");
  const [assignedUsers, setAssignedUsers] = React.useState<any | null>();
  // used by both project and ticket
  const [users, setUsers] = React.useState<User[]>([]); 

  // Object creation to send to the DB
  const projectObject: Project = {
    description: projectDescription,
    id: getTicketId(),
    num_bugs: [],
    status: "pending",
    team: getUserIdsFromArray(assignedUsers),
    name: projectName,
    value: projectName,
    label: projectName
  };

  // Call the API's and set the values
  React.useEffect(() => {
    const getUsers = async () => {
      const res = await getUserList();
      setUsers(res);
    };

    getUsers();
  }, []);

  return (
    <>
      {/* Buttons */}
      <div className="flex justify-center md:justify-start pt-2 2xl:px-12 pl-8 pt-4">
        <button
          className="py-2 px-3 bg-gray-200 rounded-md hover:bg-gray-400 font-semibold text-gray-700"
          onClick={() => setModalProject(true)}
        >
          Create New Project
        </button>
      </div>

      {/* Modal for creating Project */}
      {modalProject === true ? (
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
                      d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"
                    />
                  </svg>
                  <div className="block pl-2 font-semibold text-xl self-start text-gray-700">
                    <h2 className="leading-relaxed">Create a new Project</h2>
                    <p className="text-sm text-gray-500 font-normal leading-relaxed">
                      Provide more details of the Project you want to create.
                    </p>
                  </div>
                </div>
                <div className="divide-y divide-gray-200">
                  <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                    <div className="flex flex-col">
                      <label className="leading-loose">Project Name</label>
                      <input
                        type="text"
                        className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                        placeholder="Project Name"
                        onChange={(e) => setProjectName(e.target.value)}
                      />
                    </div>

                    <Select
                      closeMenuOnSelect={false}
                      isMulti
                      options={users}
                      placeholder="Add Team Members"
                      onChange={(e) => {
                        setAssignedUsers(e);
                      }}
                    />

                    <label className="block">
                      <span className="text-gray-700">Description</span>
                      <textarea
                        className="form-textarea mt-1 block w-full border focus:ring-gray-500 focus:border-gray-900 w-full border-gray-300 rounded-md focus:outline-none text-gray-600 text-sm p-2"
                        placeholder=" Write a description for the Project."
                        onChange={(e) => setProjectDescription(e.target.value)}
                      />
                    </label>
                  </div>
                  <div className="pt-4 flex items-center space-x-4">
                    <button
                      className="flex justify-center items-center w-full text-gray-900 px-4 py-3 rounded-md focus:outline-none"
                      onClick={() => setModalProject(false)}
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
                        sendProject(projectObject);
                        setModalProject(false);
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

export default CreateProject;
