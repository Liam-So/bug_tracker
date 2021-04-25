import HomeItem from "../../interfaces/HomeItem"

const HomeTableItem = ({ item }: { item:HomeItem }) => {
    return (
        <tr className="relative transform scale-100 text-xs py-1 border-b-2 border-blue-100 cursor-default">
            <td className="pl-5 pr-3 whitespace-no-wrap">
            <div className="text-gray-400">{item.date}</div>
            <div>{item.time}</div>
            </td>

            <td className="px-2 py-2 whitespace-no-wrap">
            <div className="leading-5 text-gray-500 font-medium">
                {item.name}
            </div>
            <div className="leading-5 text-gray-900">
                {item.description}
                <a className="text-blue-500 hover:underline" href="#">
                {item.link}
                </a>
            </div>
            <div className="leading-5 text-gray-800">Hello message</div>
            </td>
        </tr>
    )
}

export default HomeTableItem