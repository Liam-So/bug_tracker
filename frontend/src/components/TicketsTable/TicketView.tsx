import * as React from "react";
import { auth } from "../../config/firebase";
import Ticket from "../../interfaces/Ticket";
import { getTicketById, updateComments } from "../../services/ticketServices";
import Comment from "../../interfaces/Comment"

const TicketView = ({ ticket }: { ticket: Ticket | undefined }) => {
  const [comment, setComment] = React.useState<string>('');
  const [isSendingComment, setisSendingComment] = React.useState(false);
  const [finalTicket, setFinalTicket] = React.useState<Ticket | undefined>(ticket);

  console.log(Math.floor(Date.now() / 1000))

  const getCurrentTime = () => {
    var s = Date.now().valueOf()
    console.log(s)
  }

  getCurrentTime();

  /*
    ** Step 1: Create a state for the onClick
    ** Step 2: When that state changes, we make a call to the API endpoint for this ticket
    ** Step 3: set a new state with the resulting changes 
  */
  React.useEffect(() => {
    const getTicketDetails = async() => {
      console.log("Im in the hook")

      // fetch comments again and send it
      const res = await getTicketById(String(ticket?.id));
      console.log(res.data)
      setFinalTicket(res.data);
    }

    getTicketDetails();
    console.log(finalTicket)
  }, [ticket, isSendingComment]);


  const sendComment = async () => {
    const commentToSend: Comment = {
      ticketId: String(finalTicket?.id),
      userId: String(finalTicket?.user),
      time: Date.now().toString(),
      message: comment,
    }

    const res = await updateComments(commentToSend);
    console.log(res.status)
  }


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

                  {finalTicket ? finalTicket.comments.map((item: any, index: number) => {
                    return (
                  <div className="flex" key={index}>
                    <div className="flex-1 border rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
                      <strong>Sabrina</strong>{" "}
                      <span className="text-xs text-gray-400">{item.time}</span>
                      <p className="text-sm">
                        {item.message}
                      </p>
                    </div>
                  </div>
                    )
                  }): (
                    <></>
                  )}

                  <div className="flex flex-col">
                      <h2 className="px-1 pt-3 pb-2 text-gray-800 text-lg">Add a new comment</h2>

                      <form className="flex flex-col">

                        <textarea 
                          className="flex-1 border rounded-lg py-2 sm:px-6 sm:py-4 leading-relaxed" 
                          placeholder='Type Your Comment' 
                          required
                          onChange={e => setComment(e.target.value)}
                        />
                        <div className="flex justify-end pt-2">
                            <button type="button" className="flex justify-end py-2 px-2 border rounded-md pr-2 hover:bg-white" 
                            onClick={() => {
                              sendComment().then(() => {
                                setisSendingComment(!isSendingComment);
                              }).catch(err => {
                                console.log(err.message)
                              });
                            }}
                            >Post comment</button>
                        </div>
                      </form>
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
