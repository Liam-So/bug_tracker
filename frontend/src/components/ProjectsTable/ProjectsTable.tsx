import ProjectsTableItem from './ProjectsTableItem'

const ProjectsTable = () => {
    return (
        <div className="flex justify-center pt-5">
        <table className="border-collapse w-5/6">
            <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal font sans">
                    <th className="py-3 px-6 text-left text-gray-600 hidden lg:table-cell">Project</th>
                    <th className="py-3 px-6 text-center text-gray-600 hidden lg:table-cell">Users</th>
                    <th className="py-3 px-6 text-center text-gray-600 hidden lg:table-cell">Status</th>
                    <th className="py-3 px-6 text-center text-gray-600 hidden lg:table-cell">Actions</th>
                </tr>
            </thead>
            <tbody>
                <ProjectsTableItem/>
                <ProjectsTableItem/>
                <ProjectsTableItem/>
            </tbody>
        </table>
        </div>
    )
}

export default ProjectsTable
