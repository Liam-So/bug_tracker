import * as React from "react";
import Ticket from "../../interfaces/Ticket";

const TicketView = ({ ticket }: { ticket: Ticket | undefined }) => {
  console.log(ticket);
  return (
    <div className="flex flex-wrap">
      {/* STARTS HERE */}
      <div className="p-10 md:w-2/3 md:mb-0 mb-6 flex flex-col w-full">
        <div className="pattern-dots-md gray-light">
          <div className="rounded bg-gray-100 p-4 min-h-full max-h-screen overflow-auto">
            <div className="flex-grow text-gray-800">
              <h2 className=" text-3xl title-font font-medium mb-3">
                {ticket?.title}
              </h2>
              <ul>
                <li className="leading-relaxed text-xl font-semibold text-justify">
                  Ticket Id:
                </li>
                <li className="leading-relaxed text-lg text-justify">
                  {ticket?.id}
                </li>
                <li className="leading-relaxed text-xl font-semibold text-justify">
                  Priority:
                </li>
                <li className="leading-relaxed text-lg text-justify">
                  {ticket?.severity}
                </li>
                <li className="leading-relaxed text-xl font-semibold text-justify">
                  Type
                </li>
                <li className="leading-relaxed text-lg text-justify">
                  {ticket?.type}
                </li>
                <li className="leading-relaxed text-xl font-semibold text-justify">
                  Description:
                </li>
                <li className="leading-relaxed text-lg text-justify">
                  {ticket?.description}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="p-10 md:w-1/3 md:mb-0 mb-6 flex flex-col w-full">
        <div className="pattern-dots-md gray-light">
          <div className="rounded bg-gray-100 p-4">
            <div className="flex-grow text-gray-800">
              <h2 className=" text-xl title-font font-medium">Comments:</h2>
              <div className="antialiased mx-auto max-w-screen-sm">
                <div className="space-y-4">

                  <div className="flex">
                    <div className="flex-1 border rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
                      <strong>Sarah</strong>{" "}
                      <span className="text-xs text-gray-400">3:34 PM</span>
                      <p className="text-sm">
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                        sed diam nonumy eirmod tempor invidunt ut labore et
                        dolore magna aliquyam erat, sed diam voluptua.
                      </p>
                    </div>
                  </div>

                  <div className="flex">
                    <div className="flex-1 border rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
                      <strong>Sarah</strong>{" "}
                      <span className="text-xs text-gray-400">3:34 PM</span>
                      <p className="text-sm">
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                        sed diam nonumy eirmod tempor invidunt ut labore et
                        dolore magna aliquyam erat, sed diam voluptua.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col">
                      <h2 className="px-1 pt-3 pb-2 text-gray-800 text-lg">Add a new comment</h2>

                      <div className="flex flex-col">
                        <textarea className="flex-1 border rounded-lg py-2 sm:px-6 sm:py-4 leading-relaxed" placeholder='Type Your Comment' required></textarea>
                        <div className="flex justify-end pt-2">
                            <button className="flex justify-end py-2 px-2 border rounded-md pr-2 hover:bg-white">Post comment</button>
                        </div>
                      </div>
                  </div>

                                    
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketView;
