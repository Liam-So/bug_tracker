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
            <CreateTicket />
            <AssignedTable tickets={userTickets} />
          </div>
        </div>
      ) : (
        <TicketView ticket={ticket} />
      )}
    </div>
  );
};

export default withRouter(TicketPage);
