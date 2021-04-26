import { useEffect, useState } from 'react';
import HomeTable from '../components/HomeTable/HomeTable';
import { Navbar } from '../components/Navbar';
import Firebase from '../config/firebase';

const Home = () => {

    const [user, setUser] = useState([]);

    const ref = Firebase.firestore().collection('users');

    console.log(ref.doc('VWtHHhdkbiYsNWAWkfOl2SieicJ3').get())

    function getSchools() {
        ref.onSnapshot((querySnapshot) => {
            const items:any = [];

            querySnapshot.forEach(doc => {
                items.push(doc.data());
            })

            setUser(items);
        })
    }

    useEffect(() => {
        getSchools();
    }, [])

    return (
        <div>
            <Navbar/>
            <HomeTable/>
            {console.log(user)}
        </div>
    )
}

export default Home
