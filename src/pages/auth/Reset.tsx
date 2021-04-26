import { useEffect, useState } from 'react';
import { RouteComponentProps, useHistory, Link } from 'react-router-dom';
import ErrorText from '../../components/ErrorText';
import { auth } from '../../config/firebase';
import queryString from 'querystring';

const ResetPasswordPage = (props: RouteComponentProps) => {
    const [verifying, setVerifying] = useState(true);
    const [verified, setVerified] = useState(false);
    // eslint-disable-next-line
    const [changing, setChanging] = useState(false);
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [oobCode, setOobCode] = useState('');
    const [error, setError] = useState('');

    const history = useHistory();

    useEffect(() => {
        console.log('Extracting code');

        let stringParams = queryString.parse(props.location.search);

        if (stringParams)
        {
            let oobCode = stringParams.oobCode as string;

            if (oobCode)
            {
                console.log('Code found');
                verifyPasswordResetLink(oobCode);
            }
            else
            {
                console.log('Unable to find code');
                setVerified(false);
                setVerifying(false);
            }
        }
        else
        {
            console.log('Unable to find code');
            setVerified(false);
            setVerifying(false);
        }
        // eslint-disable-next-line
    }, []);

    const verifyPasswordResetLink = async(_oobCode: string) => {
        await auth.verifyPasswordResetCode(_oobCode)
        .then(result => {
            console.log(result);
            setOobCode(_oobCode);
            setVerified(true);
            setVerifying(false);
        })
        .catch(error => {
            console.log(error);
            setVerified(false);
            setVerifying(false);
        });
    }

    const passwordResetRequest = async() => {
        if (password !== confirm)
        {
            setError('Make sure your passwords are matching');
            return;
        }

        if (error !== '') setError('');

        setChanging(true);

        await auth.confirmPasswordReset(oobCode, password)
        .then(() => {
            history.push('/login');
        })
        .catch(error => {
            console.log(error);
            setError(error.message);
            setChanging(false);
        })
    }

    return (
        <section className="flex flex-col md:flex-row h-screen items-center">
            {verifying ?
                (
                    <div className="fixed top-0 right-0 h-screen w-screen z-50 flex justify-center items-center">
                        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
                    </div>
                )
            :
                <>
                    {verified ?
                    (
                        <>
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
                                onClick={() => passwordResetRequest()}
                            >
                                Reset Password
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
                    </>
                    )
                    :
                        (
                            <div className="h-screen w-screen bg-gray-100 flex items-center">
                                <div className="container flex flex-col md:flex-row items-center justify-center px-5 text-gray-700">
                                    <div className="max-w-md">
                                        <div className="text-5xl font-dark font-bold">404</div>
                                        <p
                                        className="text-2xl md:text-3xl font-light leading-normal"
                                        >Sorry we couldn't find this page. </p>
                                    <p className="mb-8">Go check out our home page :)</p>
                                    
                                    <Link to='/' className="px-4 inline py-2 text-sm font-medium leading-5 shadow text-white transition-colors duration-150 border border-transparent rounded-lg focus:outline-none focus:shadow-outline-blue bg-blue-600 active:bg-blue-600 hover:bg-blue-700">back to homepage</Link>
                                </div>
                            </div>
                            </div>
                        )
                    }
                </>
            }
        </section>
    );
}

export default ResetPasswordPage;