import { RouteComponentProps, withRouter } from "react-router";
import * as React from "react";
import { Navbar } from "../components/Navbar/Navbar";
import Ticket from "../interfaces/Ticket";
import { auth } from "../config/firebase";
import { getTicketById, getTicketListForUser } from "../services/ticketServices";
import TicketView from "../components/TicketsTable/TicketView";
import AssignedTable from "../components/AssignedTable/AssignedTable";

const TicketPage = (props: RouteComponentProps<any>) => {
  const [ticket, setTicket] = React.useState<Ticket>();
  const [tickets, setTickets] = React.useState<Ticket[] | null>(null);

  let id = props.match.params.id;
  let userId = auth.currentUser?.uid;

  React.useEffect(() => {
    if (id) {
      const getTicket = async() => {
        const res = await getTicketById(String(id));
        setTicket(res.data);
      }

      getTicket();
    } else {

      const arrayOfTickets = async() => {
        const res = await getTicketListForUser(String(userId));
        setTickets(res.data);
      } 

      arrayOfTickets();
    }
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
      {tickets !== null ? (
        <div className="bg-green-200">
          <AssignedTable tickets={tickets} />
      </div>
      ): (
          <TicketView ticket={ticket} />
      )}
    </div>
  );
};

export default withRouter(TicketPage);
