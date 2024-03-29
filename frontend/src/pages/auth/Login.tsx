import { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { auth, Providers } from '../../config/firebase'
import ErrorText from '../../components/ErrorText'
import { SignInWithSocialMedia } from "./modules"
import firebase from 'firebase'

const Login = () => {
    const [authenticating, setAuthenticating] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const history = useHistory();

    const signInWithEmailAndPassword = async() => {
        if (error !== '') {
            setError('');
            return;
        }

        setAuthenticating(true);

        await auth.signInWithEmailAndPassword(email, password)
        .then(result => {
            console.log(result);
            history.push('/');
        })
        .catch(error => {
            console.log(error.message);
            setError(error.message);
        })
    }

    // const signInWithSocialMedia = (provider: firebase.auth.AuthProvider) => {
    //     if (error !== '') setError('');

    //     setAuthenticating(true);

    //     SignInWithSocialMedia(provider)
    //     .then(result => {
    //         console.log(result);
    //         history.push('/');
    //     })
    //     .catch(error => {
    //         console.log(error);
    //         setAuthenticating(false);
    //         setError(error.message);
    //     });
    // }

    return (
        <section className="flex flex-col md:flex-row h-screen items-center">
            <div className="bg-indigo-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
                <img
                src="https://source.unsplash.com/random"
                alt=""
                className="w-full h-full object-cover"
                />
            </div>

            <div
                className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
                        flex items-center justify-center"
            >
                <div className="w-full h-100">
                <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12">
                    Log in to your account
                </h1>

                <form className="mt-6">
                    <div>
                    <label className="block text-gray-700">Email Address</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Enter Email Address"
                        className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                        autoFocus
                        required
                        autoComplete="new-password"
                        onChange={event => setEmail(event.target.value)}
                    />
                    </div>

                    <div className="mt-4">
                    <label className="block text-gray-700">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Enter Password"
                        className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
                                focus:bg-white focus:outline-none"
                        required
                        autoComplete="new-password"
                        onChange={event => setPassword(event.target.value)}
                    />
                    </div>

                    <div className="text-right mt-2">
                    <Link to="/forgot">
                        <p className="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700">
                        Forgot Password?
                        </p>
                    </Link>
                    </div>

                    <button
                        className="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg
                        px-4 py-3 mt-6"
                        type="button"
                        onClick={() => signInWithEmailAndPassword()}
                    >
                        Login
                    </button>
                </form>

                <hr className="my-6 border-gray-300 w-full" />

                <h1 className="mt-8 flex items-center justify-center flex-col">
                    Need an account?{" "}
                    <Link to="/register">
                    <p className="text-blue-500 hover:text-blue-700 font-semibold">
                        Create an account
                    </p>
                    </Link>
                </h1>

                <ErrorText error={error} />
                </div>
            </div>
        </section>
    )
}

export default Login
