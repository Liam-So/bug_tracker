import { Link, useHistory } from 'react-router-dom'
import { auth } from '../config/firebase';

const Home = () => {

    const history = useHistory();

    const Logout = () => {
        auth.signOut()
        .then(() => history.push('/login'))
        .catch(error => console.log(error));
    }

    return (
        <div>
            <div>
                Welcome to the home page
            </div>
            <button className="py-2 px-2 rounded-full bg-red-200 font-sans">
                <Link to='/change'>
                    Change your password
                </Link>
            </button>
            <button className="py-2 px-2 rounded-full bg-indigo-200 font sans" onClick={() => Logout()}>
                Log out
            </button>
        </div>
    )
}

export default Home
