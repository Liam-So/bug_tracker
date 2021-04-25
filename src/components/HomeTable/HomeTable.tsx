import HomeTableItem from "./HomeTableItem";
import HomeItem from "../../interfaces/HomeItem"

const arrayOfItems: HomeItem[] = [
    {
        id: '432kjfnk23',
        date: 'Dec 20',
        time: '21:47',
        name: 'Liam',
        description: 'This should be working',
        link: '#12345'
    },
    {
        id: '432kjfnk23',
        date: 'Dec 20',
        time: '21:47',
        name: 'Liam',
        description: 'This should be working',
        link: '#12345'
    },
    {
        id: '432kjfnk23',
        date: 'Dec 20',
        time: '21:47',
        name: 'Liam',
        description: 'This should be working',
        link: '#12345'
    }
]


const HomeTable = () => {
    return (
    <div className="flex flex-col md:flex-row pt-3">
        <div className="container py-10 flex h-full w-full justify-center">
            <div className="w-4/5 px-3 pl-4  h-full flex flex-col">
            <div className="bg-white text-sm text-gray-500 font-bold px-5 py-2 shadow border-b border-gray-300">
                Project Activity
            </div>

        <div
            className="w-full h-full overflow-auto shadow bg-white"
            id="journal-scroll"
        >
            <table className="w-full">

                <tbody>
                {arrayOfItems.map(e => {
                    return (
                        <HomeTableItem item={e}/>
                    )
                })}

                </tbody>

            </table>
            </div>
            </div>
        </div>

        <div className="container mx-auto py-10 flex h-full justify-center">
            <div className="w-4/5 px-3 pl-4 h-full flex flex-col justify-center">
            <div className="bg-white text-sm text-gray-500 font-bold px-5 py-2 shadow border-b border-gray-300">
                Assigned to me
            </div>

        <div
            className="w-full h-full overflow-auto shadow bg-white"
            id="journal-scroll"
        >
            <table className="w-full">
                <tbody>
                    {arrayOfItems.map(e => {
                        return (
                        <HomeTableItem item={e}/>
                        )
                    })}
                </tbody>
            </table>
            </div>
            </div>
        </div>
    </div>

);
};

export default HomeTable
