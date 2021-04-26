import { useEffect, useState } from 'react';
import HomeTable from '../components/HomeTable/HomeTable';
import { Navbar } from '../components/Navbar';
import Firebase, { auth } from '../config/firebase';
import Project from '../interfaces/Project';

const Home = () => {

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
                    team: item.data().team,
                    name: item.data().name
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
            <HomeTable projects={userProjects} />

            <body className="flex justify-center">
                <div className="flex flex-col justify-center w-9/12">
                    <div className="bg-indigo-700 px-4 py-5 border-b rounded-t sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-white">
                        Assigned to me
                    </h3>
                    </div>
                    <div className="bg-white shadow overflow-hidden sm:rounded-md">
                    <ul className="divide-y divide-gray-200">
                        <li>
                        <a className="block hover:bg-gray-50">
                            <div className="px-4 py-4 sm:px-6">
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-thin text-gray-700 truncate">
                                Increase sales by 10% year over year
                                </p>
                                <div className="ml-2 flex-shrink-0 flex">
                                <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                    On-Track
                                </p>
                                </div>
                            </div>
                            <div className="mt-2 sm:flex sm:justify-between">
                                <div className="sm:flex">
                                <p className="flex items-center text-sm font-light text-gray-500">
                                    <time dateTime="2020-01-07">January 7, 2020</time>
                                </p>
                                </div>
                            </div>
                            </div>
                        </a>
                        </li>
                    
                <li>
                        <a className="block hover:bg-gray-50">
                            <div className="px-4 py-4 sm:px-6">
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-thin text-gray-700 truncate">
                                Increase newsletter subscribers by 500
                                </p>
                                <div className="ml-2 flex-shrink-0 flex">
                                <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                    At-Risk
                                </p>
                                </div>
                            </div>
                            <div className="mt-2 sm:flex sm:justify-between">
                                <div className="sm:flex">
                                <p className="flex items-center text-sm font-light text-gray-500">
                                    <time dateTime="2020-01-07">January 7, 2020</time>
                                </p>
                                </div>
                            </div>
                            </div>
                        </a>
                        </li>
                    
                <li>
                        <a className="block hover:bg-gray-50">
                            <div className="px-4 py-4 sm:px-6">
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-thin text-gray-700 truncate">
                                Increase customer satisfaction rating by 10 points 
                                </p>
                                <div className="ml-2 flex-shrink-0 flex">
                                <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                    On-Track
                                </p>
                                </div>
                            </div>
                            <div className="mt-2 sm:flex sm:justify-between">
                                <div className="sm:flex">
                                <p className="flex items-center text-sm font-light text-gray-500">
                                    <time dateTime="2020-01-07">January 7, 2020</time>
                                </p>
                                </div>
                            </div>
                            </div>
                        </a>
                        </li>
                    </ul>
                <button type="button" className="inline-flex items-center m-4 px-4 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                View All
                </button>      
                    </div>
                </div>
                
              </body>
        </div>
    )
}

export default Home
