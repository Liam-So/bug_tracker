import { RouteComponentProps, withRouter } from "react-router";
import * as React from "react";
import { Navbar } from "../components/Navbar/Navbar";
import Ticket from "../interfaces/Ticket";
import Firebase, { auth } from "../config/firebase";
import {
  getTicketById,
} from "../services/ticketServices";
import TicketView from "../components/TicketsTable/TicketView";
import AssignedTable from "../components/AssignedTable/AssignedTable";
import CreateTicket from "../components/CreateItems/CreateTicket";

const TicketPage = (props: RouteComponentProps<any>) => {
  const [ticket, setTicket] = React.useState<Ticket>();
  const ticketRef = Firebase.firestore().collection("tickets");
  const [userTickets, setUserTickets] = React.useState<Ticket[] | null>(null);

  const [searchTerm, setSearchTerm] = React.useState("");

  let id = props.match.params.id;

  React.useEffect(() => {
    if (id) {
      const getTicket = async () => {
        const res = await getTicketById(String(id));
        setTicket(res.data);
      };

      getTicket();
    } else {
      console.log("yo");
      // Use real time data for changes
      const getUserTickets = () => {
        ticketRef.where("user", "==", auth.currentUser?.uid).onSnapshot((e) => {
          const items: Ticket[] = [];

          e.forEach((item) => {
            items.push({
              description: item.data().description,
              title: item.data().title,
              user: item.data().user,
              type: item.data().type,
              id: item.data().id,
              severity: item.data().severity,
              project: item.data().project,
              comments: item.data().comments,
              value: item.data().value,
              label: item.data().label,
              status: item.data().status,
            });
          });

          console.log(items);

          setUserTickets(items);
        });
      };
      getUserTickets();
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <Navbar />
      {userTickets ? (
        <div className="flex justify-center">
          <div className="w-10/12 flex flex-col justify-center">
            <div className="px-6">
            <CreateTicket />

            </div>
            {/* <div className="w-full flex justify-start px-2 mt-8 px-12">
                <div className="w-full sm:w-64 inline-block relative ">
                  <input
                    type=""
                    name=""
                    className="leading-snug border border-gray-300 block w-full appearance-none bg-gray-100 text-sm text-gray-600 py-1 px-4 pl-8 rounded-lg"
                    placeholder="Search by Project Name"
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />

                  <div className="pointer-events-none absolute pl-3 inset-y-0 left-0 flex items-center px-2 text-gray-300">
                    <svg
                      className="fill-current h-3 w-3"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 511.999 511.999"
                    >
                      <path d="M508.874 478.708L360.142 329.976c28.21-34.827 45.191-79.103 45.191-127.309C405.333 90.917 314.416 0 202.666 0S0 90.917 0 202.667s90.917 202.667 202.667 202.667c48.206 0 92.482-16.982 127.309-45.191l148.732 148.732c4.167 4.165 10.919 4.165 15.086 0l15.081-15.082c4.165-4.166 4.165-10.92-.001-15.085zM202.667 362.667c-88.229 0-160-71.771-160-160s71.771-160 160-160 160 71.771 160 160-71.771 160-160 160z" />
                    </svg>
                  </div>
                </div>
              </div> */}

              
            <AssignedTable tickets={userTickets} searchBar={true} />
          </div>
        </div>
      ) : (
        <TicketView ticket={ticket} />
      )}
    </div>
  );
};

export default withRouter(TicketPage);
