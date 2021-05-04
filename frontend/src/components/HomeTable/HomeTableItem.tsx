import Project from "../../interfaces/Project"
import { useHistory } from 'react-router-dom'

const HomeTableItem = ({ item }: { item:Project }) => {

    const history = useHistory();

    const handleClick = () => {
        history.push(`/projects/${item.id}`);
    }

    const getStatus = () => {
        if (item.status === 'in_progress') {
            return <span className="bg-purple-200 text-purple-600 py-1 px-3 rounded-full text-xs">Active</span>
        } else if (item.status === 'completed') {
            return <span className="bg-green-200 text-green-600 py-1 px-3 rounded-full text-xs">Completed</span>
        } else if (item.status === 'pending') {
            return <span className="bg-yellow-200 text-yellow-600 py-1 px-3 rounded-full text-xs">Pending</span>
        }
    };

    return (
        <tr className="hover:bg-gray-100 border-b border-gray-200 py-10 cursor-pointer" onClick={() => handleClick()}>
            <td className="px-4 py-4">{item.name}</td>
            <td className="px-4 py-4">{item.num_bugs.length}</td>
            <td className="px-4 py-4">
                {getStatus()}
            </td>
        </tr>
    )
}

export default HomeTableItem