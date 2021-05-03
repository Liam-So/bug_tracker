import { useEffect, useState } from 'react';
import AssignedTable from '../components/AssignedTable/AssignedTable';
import CreateItems from '../components/CreateItems/CreateItems';
import HomeTable from '../components/HomeTable/HomeTable';
import { Navbar } from '../components/Navbar/Navbar';
import Firebase, { auth } from '../config/firebase';
import Project from '../interfaces/Project';
import Ticket from '../interfaces/Ticket';

const Home = () => {

    if (auth.currentUser?.uid) {
        console.log(auth.currentUser.uid)
    }

    const [userProjects, setUserProjects] = useState<Project[]>();
    const [userTickets, setUserTickets] = useState<Ticket[]>();

    const projectRef = Firebase.firestore().collection('projects');
    const ticketRef = Firebase.firestore().collection('tickets');

    function getUserProjects() {
        projectRef.where('team', 'array-contains', auth.currentUser?.uid).onSnapshot(e => {
            
            const items: Project[] = [];

            e.forEach(item => {
                items.push({
                    description: item.data().description,
                    id: item.data().id,
                    num_bugs: item.data().num_bugs,
                    status: item.data().status,
                    team: item.data().team,
                    name: item.data().name
                })
            })

            setUserProjects(items);
        })
    }
    
    useEffect(() => {
        getUserProjects();
        // eslint-disable-next-line
    }, [])


    function getUserTickets() {
        ticketRef.where('user', '==', auth.currentUser?.uid).onSnapshot(e => {

            const items: Ticket[] = [];

            e.forEach(item => {
                items.push({
                    description: item.data().description,
                    title: item.data().title,
                    user: item.data().user,
                    type: item.data().type,
                    id: item.data().id,
                    severity: item.data().severity,
                    project: item.data().project
                });
            });

            setUserTickets(items);
        })
    }

    useEffect(() => {
        getUserTickets();
        // eslint-disable-next-line
    }, [])


    return (
        <div>
            <Navbar/>
            <div className="flex justify-center items-center pt-4">
                <div className="w-full md:w-9/12 xl:w-10/12 2xl:w-9/12">
                    <CreateItems />
                </div>
            </div> 
            <div className="flex flex-col md:flex-row items-start px-8 md:px-20 2xl:px-60">
                <AssignedTable tickets={userTickets} />
                <HomeTable projects={userProjects} />
            </div>
        </div>
    )
}

export default Home
