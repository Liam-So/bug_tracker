import { useState } from 'react'

const CreateProject = () => {
    const [modal, setModal] = useState(false);

    const [modalTicket, setModalTicket] = useState(false);

    return (
        <>
        <button 
            className="py-2 px-2 bg-indigo-200 rounded-full text-sm text-gray-800 mr-2 font-semibold transition duration-500 ease-in-out hover:bg-indigo-300 transform hover:-translate-y-1 hover:scale-110"
            onClick={() => {
                setModal(true);
                setModalTicket(false);
            }}
        >
            New Project 📜
        </button>
        <button 
                className="border-0 py-2 px-2 bg-green-100 rounded-full text-sm text-gray-800 font-semibold transition duration-500 ease-in-out hover:bg-green-300 transform hover:-translate-y-1 hover:scale-110"
                onClick={() => {
                    setModal(false);
                    setModalTicket(true)
                }}
            >
                New Ticket 🎟️
            </button>
        {modal === true ? (
            <div className="h-full flex flex-col justify-center sm:py-12">
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
                <div className="max-w-md mx-auto">
                    <div className="flex items-center space-x-5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 rounded-full flex flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                    </svg>
                    <div className="block pl-2 font-semibold text-xl self-start text-gray-700">
                        <h2 className="leading-relaxed">Create a new Project</h2>
                        <p className="text-sm text-gray-500 font-normal leading-relaxed">Provide more details of the Project you want to create.</p>
                    </div>
                    </div>
                    <div className="divide-y divide-gray-200">
                    <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                        <div className="flex flex-col">
                        <label className="leading-loose">Project Name</label>
                        <input type="text" className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" placeholder="Project Name"/>
                        </div>
    
                        <label className="block">
                        <span className="text-gray-700">Description</span>
                        <textarea className="form-textarea mt-1 block w-full border focus:ring-gray-500 focus:border-gray-900 w-full border-gray-300 rounded-md focus:outline-none text-gray-600 text-sm p-2" placeholder=" Write a description for the Project."></textarea>
                        </label>
                    </div>
                    <div className="pt-4 flex items-center space-x-4">
                        <button className="flex justify-center items-center w-full text-gray-900 px-4 py-3 rounded-md focus:outline-none" onClick={() => setModal(false)}>
                            <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg> Cancel
                        </button>
                        <button className="bg-blue-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none">Create</button>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        ): <></>}


        {modalTicket === true ? (
                <div className="h-full flex flex-col justify-center sm:py-12">
                <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                    <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
                    <div className="max-w-md mx-auto">
                        <div className="flex items-center space-x-5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 rounded-full flex flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                        </svg>
                        <div className="block pl-2 font-semibold text-xl self-start text-gray-700">
                            <h2 className="leading-relaxed">Create a Ticket</h2>
                            <p className="text-sm text-gray-500 font-normal leading-relaxed">Provide more details of the ticket you want to create.</p>
                        </div>
                        </div>
                        <div className="divide-y divide-gray-200">
                        <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                            <div className="flex flex-col">
                            <label className="leading-loose">Ticket Name</label>
                            <input type="text" className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" placeholder="Ticket Name"/>
                            </div>
        
                            <label className="block">
                                <span className="text-gray-700">Ticket Type</span>
                                <select className="form-select block w-full mt-1 px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600">
                                    <option>New Feature ✔️</option>
                                    <option>Bug 🐛</option>
                                </select>
                            </label>
        
                            <label className="block">
                                <span className="text-gray-700">Priority</span>
                                <select className="form-select block w-full mt-1 px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600">
                                    <option>Critical 🚑</option>
                                    <option>High 🙀</option>
                                    <option>Medium 😅</option>
                                    <option>Low ☕</option>
                                </select>
                            </label>
        
                            <label className="block">
                            <span className="text-gray-700">Description</span>
                            <textarea className="form-textarea mt-1 block w-full border focus:ring-gray-500 focus:border-gray-900 w-full border-gray-300 rounded-md focus:outline-none text-gray-600 text-sm p-2" placeholder="Write a description for the ticket."></textarea>
                            </label>
                        </div>
                        <div className="pt-4 flex items-center space-x-4">
                            <button className="flex justify-center items-center w-full text-gray-900 px-4 py-3 rounded-md focus:outline-none" onClick={() => setModalTicket(false)}>
                                <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg> Cancel
                            </button>
                            <button className="bg-blue-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none">Create</button>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            ): <></>}
        </>
    )
}

export default CreateProject
