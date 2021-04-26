import { useState } from 'react'
import ErrorText from '../../components/ErrorText'
import { Link, useHistory, Redirect } from 'react-router-dom'
import { auth } from '../../config/firebase'

const Change = () => {
    // eslint-disable-next-line
    const [changing, setChanging] = useState<boolean>(false);
    const [password, setPassword] = useState<string>('');
    const [confirm, setConfirm] = useState<string>('');
    const [error, setError] = useState<string>('');

    const history = useHistory();

    const passwordChangeRequest = async() => {
        if (password !== confirm)
        {
            setError('Please make sure that your passwords match.');
            return;
        }

        if (error !== '') setError('');

        setChanging(true);

        await auth.currentUser?.updatePassword(password)
        .then(() => {
            console.log('Password change succesful.');
            history.push('/');
        })
        .catch(error => {
            console.log(error);
            setChanging(false);
            setError(error.message);
        })
    }

    // verify social media provider
    if (auth.currentUser?.providerData[0]?.providerId !== 'password')
        return <Redirect to="/"/>

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
                    Reset your password
                </h1>

                <form className="mt-6">
                    <div>
                    <label className="block text-gray-700">New Password</label>
                    <input
                        type="password"
                        name="newPassword"
                        id="newPassword"
                        placeholder="Enter New Password"
                        className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                        autoFocus
                        required
                        autoComplete="new-password"
                        onChange={event => setPassword(event.target.value)}
                        value={password}
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
                        onChange={event => setConfirm(event.target.value)}
                        value={confirm}
                    />
                    </div>

                    <button
                        className="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg
                        px-4 py-3 mt-6"
                        type="button"
                        onClick={() => passwordChangeRequest()}
                    >
                        Change Password
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

export default Change
