import { Link } from 'react-router-dom';
import Ticket from "../../interfaces/Ticket";
import AssignedTableItem from "./AssignedTableItem";

const AssignedTable = ({ tickets }: { tickets: Ticket[] | undefined }) => {
  return (
        <div className="flex justify-center pt-8">
            <div className="flex flex-col justify-center" style={{width: '73.5%'}}>
                <div className="bg-indigo-500 px-4 py-3 border-b rounded-t sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-white">
                    Assigned to me
                </h3>
                </div>
                <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200">

                    {tickets ? tickets.map((e, index) => {
                        return (
                            <AssignedTableItem item={e} key={index}/>
                        )
                    }): (<></>)}

                </ul>
                <button
                    type="button"
                    className="inline-flex items-center m-4 px-4 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-indigo-500 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    <Link to="/my_tickets">
                    View All
                    </Link>
                </button>
                </div>
            </div>
        </div>
  );
};

export default AssignedTable;
