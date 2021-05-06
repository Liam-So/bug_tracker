import HomeTableItem from "./HomeTableItem";
import Project from "../../interfaces/Project";

const HomeTable = ({ projects } : { projects: Project[] | undefined })  => {
    return (
    <div className="rounded-md w-full md:w-6/12 flex justify-center">

    <div className="overflow-x-auto p-8 w-full">

      <table className="table-auto border-collapse w-full">
        <thead>
          <tr className="rounded-lg text-sm font-medium text-gray-700 text-left" style={{fontSize: '0.9674rem'}}>
            <th className="px-4 py-2 bg-gray-200 " style={{backgroundColor: '#f8f8f8'}}>Projects</th>
            <th className="px-4 py-2 " style={{backgroundColor: '#f8f8f8'}}>Tickets</th>
            <th className="px-4 py-2 " style={{backgroundColor: '#f8f8f8'}}>Status</th>
          </tr>
        </thead>
        <tbody className="text-sm font-normal text-gray-700">
                {projects ? projects.map((e, index) => {
                    return (
                        <HomeTableItem key={index} item={e}/>
                    )
                }) : (
                    <></>
                )}
        </tbody>
      </table>
    </div>
    </div>

);
};

export default HomeTable
