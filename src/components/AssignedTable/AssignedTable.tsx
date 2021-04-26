import React from "react";
import AssignedTableItem from "./AssignedTableItem";

const AssignedTable = () => {
  return (
        <div className="flex justify-center">
            <div className="flex flex-col justify-center w-9/12">
                <div className="bg-indigo-700 px-4 py-5 border-b rounded-t sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-white">
                    Assigned to me
                </h3>
                </div>
                <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200">
                    <AssignedTableItem/>
                    <AssignedTableItem/>
                </ul>
                <button
                    type="button"
                    className="inline-flex items-center m-4 px-4 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    View All
                </button>
                </div>
            </div>
        </div>
  );
};

export default AssignedTable;
