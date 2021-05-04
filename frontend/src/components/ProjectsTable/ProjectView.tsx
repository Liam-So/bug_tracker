import Project from "../../interfaces/Project";
import * as React from "react"
import { getTicketsForProject } from "../../services/ticketServices";
import Ticket from "../../interfaces/Ticket";
type projectViewProp = {
    project: Project | undefined;
}

const ProjectView = (props: projectViewProp) => {
    const [tickets, setTickets] = React.useState<Ticket[]>([]);
    const projectId = props.project?.id;

    React.useEffect(() => {
        const getTickets = async () => {
            const res = await getTicketsForProject(String(projectId));
            console.log(res.data)
            setTickets(res.data);
        }

        getTickets();
        console.log(tickets)

    }, [tickets, projectId]);

  return (
    <div>
      <section className=" text-gray-200">
        <div className="max-w-6xl mx-auto px-5 py-24 ">
          <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">
            <h1 className=" title-font mb-2 text-3xl font-extrabold leading-10 tracking-tight text-left sm:text-5xl sm:leading-none md:text-6xl text-gray-600">
              {" "}
              {props.project?.name}
            </h1>
            <p className="lg:w-1/2 w-full leading-relaxed text-base text-xl text-gray-600">
              {props.project?.description}
            </p>
            <div className="flex mt-6 justify-center">
              <div className="w-16 h-1 rounded-full bg-indigo-500 inline-flex"></div>
            </div>
          </div>

          <div className="flex flex-wrap -m-4">
            {/* STARTS HERE */}
            <div className="p-10 md:w-2/3 md:mb-0 mb-6 flex flex-col w-full">
              <div className="pattern-dots-md gray-light">
                <div className="rounded bg-gray-100 p-4 min-h-full max-h-screen overflow-auto">
                  <div className="flex-grow text-gray-800">
                    <h2 className=" text-xl title-font font-medium mb-3">
                      Number of Tickets
                    </h2>
                    <p className="leading-relaxed text-sm text-justify">
                      You have <span className="text-green-500">{props.project?.num_bugs.length}</span> for this project.
                    </p>

                    <div className="w-full h-full overflow-auto shadow bg-white mt-4"></div>
                    <table className="w-full border rounded-medium">
                        <tbody>
                            {tickets.map((ticket, index) => {
                                return (
                                    <tr key={index} className="relative transform scale-100
                                        py-1 border-b-2 border-indigo-100 cursor-default text-base h-12">
                                        <td className="pl-5 pr-3 whitespace-no-wrap">
                                            <div className="text-gray-400">{ticket.type}</div>
                                            <div>{ticket.title}</div>
                                        </td>
                                        <td className="px-2 py-2 whitespace-no-wrap">
                                            <div className="leading-5 text-gray-900">{ticket.description}
                                            <a className="text-blue-500 hover:underline" href="/"> {ticket.id}</a>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}                            
                        </tbody>
                        </table>

                  </div>
                </div>
              </div>
            </div>

            <div className="p-10 md:w-1/3 md:mb-0 mb-6 flex flex-col w-full">
              <div className="pattern-dots-md gray-light">
                <div className="rounded bg-gray-100 p-4">
                  <div className="flex-grow text-gray-800">
                    <h2 className=" text-xl title-font font-medium mb-3">
                      Team Members
                    </h2>
                    <p className="leading-relaxed text-sm text-justify">
                      Click <span className="text-red-400">here</span> to change the status.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectView;
