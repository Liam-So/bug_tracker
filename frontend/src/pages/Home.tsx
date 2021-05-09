import * as React from 'react';
import AssignedTable from '../components/AssignedTable/AssignedTable';
import HomeTable from '../components/HomeTable/HomeTable';
import { Navbar } from '../components/Navbar/Navbar';
import { auth } from '../config/firebase';
import Project from '../interfaces/Project';
import Ticket from '../interfaces/Ticket';
import { getProjectList } from '../services/projectServices';
import { getTicketListForUser } from '../services/ticketServices';

const Home = () => {    
    const [userProjects, setUserProjects] = React.useState<Project[]>();
    const [userTickets, setUserTickets] = React.useState<Ticket[]>();


    React.useEffect(() => {
        let userId = auth.currentUser?.uid;
        const getUserProjects = async() => {
            const res = await getProjectList(String(userId));
            setUserProjects(res);
        }

        const getUserTickets = async() => {
            const res = await getTicketListForUser(String(userId));
            setUserTickets(res.data);
        }

        getUserProjects();
        getUserTickets();
    }, [])

    return (
        <div>
            <Navbar/>
            <div className="flex flex-col md:flex-row items-start px-8 md:px-20 2xl:px-60">
                <AssignedTable tickets={userTickets} />
                <HomeTable projects={userProjects} />
            </div>
        </div>
    )
}

export default Home
