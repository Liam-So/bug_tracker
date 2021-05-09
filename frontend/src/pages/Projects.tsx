import { RouteComponentProps, withRouter } from "react-router";
import { Navbar } from "../components/Navbar/Navbar";
import * as React from "react";
import { getProjectById } from "../services/projectServices";
import Project from "../interfaces/Project";
import Firebase, { auth } from "../config/firebase";
import ProjectView from "../components/ProjectsTable/ProjectView";
import CreateProject from "../components/CreateItems/CreateProject";
import { useHistory } from "react-router-dom";

const Projects = (props: RouteComponentProps<any>) => {
  const [uniqueProject, setUniqueProject] = React.useState<Project>();
  const [userProjects, setUserProjects] = React.useState<Project[] | null>(
    null
  );

  const [searchTerm, setSearchTerm] = React.useState("");

  const projectRef = Firebase.firestore().collection("projects");

  let id = props.match.params.id;

  const history = useHistory();

  React.useEffect(() => {
    if (id) {
      const getProjectDetails = async () => {
        console.log(id);
        const res = await getProjectById(id);
        setUniqueProject(res);
      };

      getProjectDetails();
      console.log(uniqueProject);
    } else {
      // Use real time data for changes
      const getUserProjects = () => {
        projectRef
          .where("team", "array-contains", auth.currentUser?.uid)
          .onSnapshot((e) => {
            const items: Project[] = [];

            e.forEach((item) => {
              console.log(item.data());
              items.push({
                description: item.data().description,
                id: item.data().id,
                num_bugs: item.data().num_bugs,
                status: item.data().status,
                team: item.data().team,
                name: item.data().name,
                value: item.data().value,
                label: item.data().label,
              });
            });

            setUserProjects(items);
          });
      };

      getUserProjects();
    }
    console.log(uniqueProject);
    // eslint-disable-next-line
  }, []);

  const getStatus = (status: string) => {
    if (status === 'in_progress') {
        return <span className="bg-purple-200 text-purple-600 py-1 px-3 rounded-full text-xs">Active</span>
    } else if (status === 'completed') {
        return <span className="bg-green-200 text-green-600 py-1 px-3 rounded-full text-xs">Completed</span>
    } else if (status === 'pending') {
        return <span className="bg-yellow-200 text-yellow-600 py-1 px-3 rounded-full text-xs">Pending</span>
    }
};

  return (
    <div>
      <Navbar />
      {userProjects ? (
        <div className="flex justify-center">
          <div className="w-10/12 flex flex-col justify-center">
            <CreateProject />
            <div className="bg-white pb-4 px-4 rounded-md w-full">
              <div className="w-full flex justify-start px-2 mt-8">
                <div className="w-full sm:w-64 inline-block relative ">
                  <input
                    type=""
                    name=""
                    className="leading-snug border border-gray-300 block w-full appearance-none bg-gray-100 text-sm text-gray-600 py-1 px-4 pl-8 rounded-lg"
                    placeholder="Search by Project Name"
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />

                  <div className="pointer-events-none absolute pl-3 inset-y-0 left-0 flex items-center px-2 text-gray-300">
                    <svg
                      className="fill-current h-3 w-3"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 511.999 511.999"
                    >
                      <path d="M508.874 478.708L360.142 329.976c28.21-34.827 45.191-79.103 45.191-127.309C405.333 90.917 314.416 0 202.666 0S0 90.917 0 202.667s90.917 202.667 202.667 202.667c48.206 0 92.482-16.982 127.309-45.191l148.732 148.732c4.167 4.165 10.919 4.165 15.086 0l15.081-15.082c4.165-4.166 4.165-10.92-.001-15.085zM202.667 362.667c-88.229 0-160-71.771-160-160s71.771-160 160-160 160 71.771 160 160-71.771 160-160 160z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="overflow-x-auto mt-6">
                <table className="table-auto border-collapse w-full">
                  <thead>
                    <tr
                      className="rounded-lg text-sm font-medium text-gray-700 text-left"
                      style={{ fontSize: "0.9674rem" }}
                    >
                      <th
                        className="px-4 py-2 bg-gray-200 "
                        style={{ backgroundColor: "#f8f8f8" }}
                      >
                        Title
                      </th>
                      <th
                        className="px-4 py-2 "
                        style={{ backgroundColor: "#f8f8f8" }}
                      >
                        Tickets
                      </th>
                      <th
                        className="px-4 py-2 "
                        style={{ backgroundColor: "#f8f8f8" }}
                      >
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-sm font-normal text-gray-700">
                    {userProjects &&

                      userProjects.filter(project => {
                        if (searchTerm === "") {
                          return project;
                        } else if (project.name.toLowerCase().includes(searchTerm.toLowerCase())){
                          return project;
                        } else {
                          return false;
                        }
                      }).map((project, index) => {
                        return (
                          <tr key={index} className="hover:bg-gray-100 border-b border-gray-200 py-10" onClick={() => history.push(`/projects/${project.id}`)}>
                            <td className="px-4 py-4">{project.name}</td>
                            <td className="px-4 py-4">
                              {project.num_bugs.length}
                            </td>
                            <td className="px-4 py-4">{getStatus(project.status)}</td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <ProjectView project={uniqueProject} />
      )}
    </div>
  );
};

export default withRouter(Projects);
