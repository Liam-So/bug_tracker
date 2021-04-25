import React, { useState } from 'react'
import ErrorText from '../../components/ErrorText'
import { Link } from 'react-router-dom'
import { auth } from '../../config/firebase';

const Forgot = () => {
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    async function resetPasswordRequest() {
        if (error !== "") setError("");

        setSending(true);

        await auth.sendPasswordResetEmail(email)
        .then(() => {
            console.log("Password reset has been sent!");
            setSent(true);
            setSending(false);
        })
        .catch(error => {
            console.log(error.message);
            setError(error.message);
        })
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
                    Reset your password
                </h1>
                <p className="pt-2 text-gray-500">
                    An email will be sent to you to reset your password.
                </p>

                <form className="mt-6">
                    <div>
                    <label className="block text-gray-700">Email Address</label>
                    <input
                        type="email"
                        name=""
                        id=""
                        placeholder="Enter Email Address"
                        className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                        autoFocus
                        required
                        onChange={event => setEmail(event.target.value)}
                        value={email}
                    />
                    </div>

                
                    <button
                        className="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg
                        px-4 py-3 mt-6"
                        type="button"
                        onClick={() => resetPasswordRequest()}
                    >
                        Login
                    </button>
                </form>

                <hr className="my-6 border-gray-300 w-full" />
                <h1 className="mt-2 flex items-center justify-center flex-col mb-3">
                    <Link to="/login">
                    <p className="text-blue-500 hover:text-blue-700 font-semibold">
                        Go back to Login
                    </p>
                    </Link>
                </h1>
                <ErrorText error={error} />

                {sent ? (
                    <div className="relative flex flex-col sm:flex-row sm:items-center bg-white shadow rounded-md py-5 pl-6 pr-8 sm:pr-6">
                        <div className="flex flex-row items-center border-b sm:border-b-0 w-full sm:w-auto pb-4 sm:pb-0">
                            <div className="text-green-500">
                                <svg className="w-6 sm:w-5 h-6 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            </div>
                        </div>
                        <div className="text-sm tracking-wide text-gray-500 mt-4 sm:mt-0 sm:ml-4">The Email has successfully been sent.</div>
                        <div className="absolute sm:relative sm:top-auto sm:right-auto ml-auto right-4 top-4 text-gray-400 hover:text-gray-800 cursor-pointer">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                        </div>
				    </div>
                ): <div></div>}
                </div>
            </div>
        </section>
    )
}

export default Forgot
