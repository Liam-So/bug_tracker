import { Link } from 'react-router-dom';
import Ticket from "../../interfaces/Ticket";
import AssignedTableItem from "./AssignedTableItem";

const AssignedTable = ({ tickets }: { tickets: Ticket[] | undefined }) => {
  return (
        <div className="w-full md:w-6/12 items-center p-8">
                <div className="mb-4 mx-0 sm:ml-4 xl:mr-4">
                    <div className="shadow-lg rounded-2xl bg-white dark:bg-gray-700 w-full">
                        <p className="font-bold text-md p-4 text-black dark:text-white">
                            My Tasks
                            <span className="text-sm text-gray-500 dark:text-gray-300 dark:text-white ml-2">
                                (05)
                            </span>
                        </p>
                        <ul>
                            {tickets ? tickets.map((e, index) => {
                            return (
                                <AssignedTableItem item={e} key={index}/>
                            )
                            }): (<></>)}
                        </ul>
                    </div>
                </div>
                </div>
  );
};

export default AssignedTable;
