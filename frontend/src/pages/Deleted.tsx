import React from 'react'
import { Navbar } from '../components/Navbar/Navbar'
import { Link } from 'react-router-dom'

const Deleted = () => {
    return (
        <div>
            <Navbar/>
            <div className="flex justify-center items-center mt-14">
            <img className="w-80 h-80" src="https://www.svgrepo.com/show/106859/delete.svg" alt="bin" />
            <div className="w-1/4">
            <p className="text-3xl font-semibold text-gray-700">You successfully deleted it. Click <Link className="text-blue-400" to="/">here</Link> to get back home.</p>
            </div>
            </div>
            
        </div>
    )
}

export default Deleted
