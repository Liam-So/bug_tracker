import { RouteComponentProps, withRouter } from 'react-router'
import { Navbar } from '../components/Navbar/Navbar'
import ProjectsTable from '../components/ProjectsTable/ProjectsTable'
import * as React from 'react'
import { getProjectById, getProjectList } from '../services/projectServices'
import Project from '../interfaces/Project'
import { auth } from '../config/firebase'
import ProjectView from '../components/ProjectsTable/ProjectView'

const Projects = (props: RouteComponentProps<any>) => {
    
    const [uniqueProject, setUniqueProject] = React.useState<Project>();
    const [listOfProjects, setListOfProjects] = React.useState<Project[]>([]);
    
    React.useEffect(() => {
        let id = props.match.params.id;
        let userId = auth.currentUser?.uid;

        if (id) {

            const getProjectDetails = async () => {
                const res = await getProjectById(id);
                setUniqueProject(res);
            }

            getProjectDetails();
            console.log(uniqueProject)
        }
        else {

            const getAllProjects = async () => {
                const res = await getProjectList(String(userId));

                setListOfProjects(res);
            };

            getAllProjects();
            console.log(listOfProjects)
        }
        // eslint-disable-next-line
    }, []);

    return (
        <div>
            <Navbar />
            {listOfProjects.length > 0 ? (
                <ProjectsTable />
            ) : (
                <>
                <ProjectView project={uniqueProject}/>
                </>
            )}
        </div>
    )
}

export default withRouter(Projects)
