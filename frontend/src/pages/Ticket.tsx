import { RouteComponentProps, withRouter } from "react-router";
import * as React from "react";
import { Navbar } from "../components/Navbar/Navbar";
import Ticket from "../interfaces/Ticket";

const TicketPage = (props: RouteComponentProps<any>) => {
  const [ticketId, setId] = React.useState("");

  React.useEffect(() => {
    setId(props.match.params.id);
    // eslint-disable-next-line
  }, []);

  const mockTicket: Ticket = {
    description: "This is a test",
    id: "hjkfsdf90",
    title: "Dynamic routes",
    type: "new_feature",
    user: "QU4QeTorrKgqq2OSh91fwBMtp643",
    severity: "string",
    project: "fdsf789",
    comments: [],
    value: "Dynamic routes",
    label: "Dynamic routes",
  };

  return (
    <div>
      <Navbar />
      <div className="h-full bg-indigo-100 pt-8">
        <div className="bg-yellow-200 mx-8 md:mx-28 h-screen">
          <a
            className="text-4xl text-gray-700 font-bold hover:text-gray-600"
            href="#"
          >
            Lorem ipsum dolor sit amet
          </a>

            <div className="w-full bg-red-200 flex">
                Edit
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 cursor-pointer" viewBox="0 0 20 20" fill="currentColor">
                <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
                </svg>
            </div>
          
          <div className="bg-green-100">
              <p className="text-xl">
                  Description
              </p>
            <p className="mt-2 text-gray-600">
                {mockTicket.description}
            </p>
          </div>
            

        <div>

        </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(TicketPage);
