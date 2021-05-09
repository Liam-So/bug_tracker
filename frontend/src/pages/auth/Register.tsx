import { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import ErrorText from '../../components/ErrorText'
import Firebase, { auth } from '../../config/firebase';

const Register = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [registering, setRegistering] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const history = useHistory();

    const ref = Firebase.firestore().collection('users');

    const signUpWithEmailAndPassword = async() => {
        if (password !== confirmPassword) {
            setError("Please make sure your passwords match.");
            return;
        }

        if (error !== "") setError("");

        setRegistering(true);

        await auth.createUserWithEmailAndPassword(email, password)
        .then(cred => {
            console.log(cred.user?.uid)
            /* { Add the user in the 'users' collection } */
            ref.doc(cred.user?.uid).set({
                name: `${firstName} ${lastName}`,
                email: email,
                userDesc: 'replace_me',
                title: 'replace_me',
                userId: cred.user?.uid,
            })

            setRegistering(false);
            history.push('/login');
        })
        .catch(error => {
            console.log(error.message);

            if (error.code.includes("auth/weak-password")) {
                setError("Please enter a stronger password.");
            } else if (error.code.includes("auth/email-already-in-use")) {
                setError("Email already in use.");
            } else {
                setError("Unable to register. Please try again later.");
            }

            setRegistering(false);
        });
    }

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
                    Create an account
                </h1>

                <form className="mt-6">
                    <div className="flex flex-col md:flex-row pb-4 justify-between">
                        <div>
                        <label className="block text-gray-700">First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            id="firstName"
                            placeholder="Enter First Name"
                            className="w-full lg:w-11/12 px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none flex justify-end"
                            autoFocus
                            required
                            onChange={event => setFirstName(event.target.value)}
                        />
                        </div>
                        <div>
                        <label className="block text-gray-700">Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            id="lastName"
                            placeholder="Enter Last Name"
                            className="w-full lg:w-11/12 px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                            autoFocus
                            required
                            autoComplete="new-password"
                            onChange={event => setLastName(event.target.value)}
                        />
                        </div>
                    </div>
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

                    <div className="mt-4">
                    <label className="block text-gray-700">Confirm Password</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        placeholder="Enter Password"
                        className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
                                focus:bg-white focus:outline-none"
                        required
                        autoComplete="new-password"
                        onChange={event => setConfirmPassword(event.target.value)}
                    />
                    </div>


                    <button
                        className="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg
                        px-4 py-3 mt-6"
                        type="button"
                        onClick={() => signUpWithEmailAndPassword()}
                    >
                        Register
                    </button>
                </form>

                <hr className="my-6 border-gray-300 w-full" />

                <h2 className="my-4 flex items-center justify-center flex-col">
                    <Link to="/login">
                        <p className="text-blue-500 hover:text-blue-700 font-semibold">
                            Go back to Login
                        </p>
                    </Link>
                </h2>
                <ErrorText error={error} />
                </div>
            </div>
        </section>
    )
}

export default Register
