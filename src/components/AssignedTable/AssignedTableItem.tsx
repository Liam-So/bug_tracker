
const AssignedTableItem = () => {
    return (
        <li>
            <a className="block hover:bg-gray-50">
                <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                    <p className="text-sm font-thin text-gray-700 truncate">
                    Increase sales by 10% year over year
                    </p>
                    <div className="ml-2 flex-shrink-0 flex">
                    <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        On-Track
                    </p>
                    </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                    <p className="flex items-center text-sm font-light text-gray-500">
                        <time dateTime="2020-01-07">January 7, 2020</time>
                    </p>
                    </div>
                </div>
                </div>
            </a>
        </li>
    )
}

export default AssignedTableItem
