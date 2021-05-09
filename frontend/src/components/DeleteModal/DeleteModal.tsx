import * as React from "react";
import { useHistory } from "react-router-dom";

const DeleteModal = ({ deleteProps }: { deleteProps: () => void }) => {
  const history = useHistory();

  const [showModal, setShowModal] = React.useState(false);
  return (
    <div>
      <div className="flex justify-center md:justify-start pt-2 2xl:px-12">
        <button
          className="py-2 px-3 bg-red-400 rounded-md hover:bg-gray-400 font-semibold text-white"
          onClick={() => setShowModal(true)}
        >
          Delete
        </button>
      </div>

      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="max-w-xl w-full bg-white shadow-lg z-50 rounded-lg overflow-hidden">
              <div className="p-4 flex space-x-4 md:flex-row flex-col md:text-left text-center items-center">
                <div className="bg-red-50 p-3 md:self-start rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 fill-current text-red-700"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 5.177l8.631 15.823h-17.262l8.631-15.823zm0-4.177l-12 22h24l-12-22zm-1 9h2v6h-2v-6zm1 9.75c-.689 0-1.25-.56-1.25-1.25s.561-1.25 1.25-1.25 1.25.56 1.25 1.25-.561 1.25-1.25 1.25z" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-xl font-semibold tracking-wide text-red-700">
                    Delete
                  </h1>
                  <p className="text-gray-500">
                    Are you sure you want to delete this document? All of your
                    data will be permanently removed. This action cannot be
                    undone.
                  </p>
                </div>
              </div>

              <div className="p-3 bg-gray-50 text-right md:space-x-4 md:block flex flex-col-reverse">
                <button
                  className="px-4 md:py-1.5 py-2 bg-white border-2 rounded-lg focus:ring-offset-2 focus:outline-none focus:ring-2 focus:ring-blue-800 hover:bg-gray-50 text-gray-500"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="mb-2 md:mb-0 px-4 md:py-1.5 py-2 bg-red-700 text-white rounded-lg focus:ring-offset-2 focus:outline-none focus:ring-2 focus:ring-red-800 hover:bg-red-800"
                  onClick={() => {
                    setShowModal(false);
                    deleteProps();
                    history.push('/deleted');
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default DeleteModal;
