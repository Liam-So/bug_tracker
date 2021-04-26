import { useEffect, useState } from 'react';
import HomeTable from '../components/HomeTable/HomeTable';
import { Navbar } from '../components/Navbar';
import Firebase, { auth } from '../config/firebase';

const Home = () => {

    // Get all projects assigned to the user
    interface Project {
        description: string;
        id: string;
        num_bugs: number;
        status: string;
        team: string[];
    }

    const [userProjects, setUserProjects] = useState<Project[]>();

    const ref = Firebase.firestore().collection('projects');

    function getUserProjects() {
        ref.where('team', 'array-contains', auth.currentUser?.uid).onSnapshot(e => {
            
            const items: Project[] = [];

            e.forEach(item => {
                items.push({
                    description: item.data().description,
                    id: item.data().id,
                    num_bugs: item.data().num_bugs,
                    status: item.data().status,
                    team: item.data().team
                })
            })

            setUserProjects(items);
        })
    }
    
    useEffect(() => {
        getUserProjects();
    }, [])

    console.log(userProjects)

    return (
        <div>
            <Navbar/>
            <HomeTable />
        </div>
    )
}

export default Home
