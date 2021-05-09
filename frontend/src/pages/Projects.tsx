import { RouteComponentProps, withRouter } from "react-router";
import { Navbar } from "../components/Navbar/Navbar";
import * as React from "react";
import { getProjectById } from "../services/projectServices";
import Project from "../interfaces/Project";
import Firebase, { auth } from "../config/firebase";
import ProjectView from "../components/ProjectsTable/ProjectView";
import HomeTable from "../components/HomeTable/HomeTable";
import CreateProject from "../components/CreateItems/CreateProject";

const Projects = (props: RouteComponentProps<any>) => {
  const [uniqueProject, setUniqueProject] = React.useState<Project>();
  const [userProjects, setUserProjects] = React.useState<Project[] | null>(
    null
  );

  const projectRef = Firebase.firestore().collection("projects");

  let id = props.match.params.id;

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

  return (
    <div>
      <Navbar />
      {userProjects ? (
        <div className="flex justify-center">
          <div className="w-10/12 flex flex-col justify-center">
          <CreateProject /> 
            <HomeTable projects={userProjects} />
          </div>
        </div>
      ) : (
        <ProjectView project={uniqueProject} />
      )}
    </div>
  );
};

export default withRouter(Projects);
