import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import { Link, useHistory } from 'react-router-dom'
import { auth } from '../../config/firebase'

export const Navbar = () => {
    const history = useHistory();

    const Logout = () => {
        auth.signOut()
        .then(() => history.push('/login'))
        .catch(error => console.log(error));
    }

    const navigation = [
        { name: 'Dashboard', href: '/'},
        { name: 'Tickets', href: '/tickets'},
        { name: 'Projects', href: '/projects'},
    ];

    return (
        <>
        <Disclosure as="nav" className="bg-gray-800">
            {({ open }) => (
        <>
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">

                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                </Disclosure.Button>
                </div>

                <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                    <img
                    className="block lg:hidden h-8 w-auto"
                    src="https://www.svgrepo.com/show/216571/bug.svg"
                    alt="bug"
                    />

                    <img
                    className="hidden lg:block h-8 w-auto"
                    src="https://www.svgrepo.com/show/216571/bug.svg"

                    alt="bug"
                    />
                    <p className="text-xl text-yellow-200 font-semibold pl-2">
                    Bug Tracker
                    </p>
                </div>

                <div className="hidden sm:block sm:ml-6">
                    <div className="flex space-x-4">
                    {navigation.map((item) => (
                    <a
                        key={item.name}
                        href={item.href}
                        className="px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-gray-700"
                        >
                        {item.name}
                    </a>
                    ))}
                    </div>
                </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                
                <Menu as="div" className="ml-3 relative">
                    {({ open }) => (
                    <>
                        <div>
                        <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                            <span className="sr-only">Open user menu</span>
                            <img
                            className="h-8 w-8 rounded-full"
                            src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                            alt=""
                            />
                        </Menu.Button>
                        </div>
                        <Transition
                        show={open}
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                        >
                        <Menu.Items
                            static
                            className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                        >
                        <Menu.Item>
                            <a
                                href="/"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                            >
                                Your Profile
                            </a>
                        </Menu.Item>

                        <Menu.Item>
                            <Link to="/change">
                                <p className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200">
                                Change Password
                                </p>
                            </Link>
                        </Menu.Item>

                        <Menu.Item>
                            <Link to="/change">
                                <p
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 relative"
                                    onClick={() => Logout()}
                                >
                                Sign out
                                </p>
                            </Link>
                        </Menu.Item>
                        </Menu.Items>
                    </Transition>
                    </>
                )}
                </Menu>
            </div>
            </div>
            </div>
            <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
                {navigation.map((item) => (
                <a
                key={item.name}
                href={item.href}
                className="block px-3 py-2 rounded-md text-base font-medium text-white"
                >
                    {item.name}
                </a>
                ))}
            </div>
            </Disclosure.Panel>
        </>
        )}
    </Disclosure>

    </>
    );
}
