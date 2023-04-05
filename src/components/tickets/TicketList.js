import { useEffect, useState } from "react"
import "./Tickets.css"
import { useNavigate } from "react-router-dom"

export const TicketList = () => {
    const [tickets, setTickets] = useState([])
    const [filteredTickets, setFiltered] = useState([])
    const [emergency, setEmergency] = useState(false)
    const [openOnly, updateOpenOnly] = useState(false)
    const navigate = useNavigate()

    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)

    useEffect(
        () => {
            if (emergency) {
                const emergencyTickets = tickets.filter(ticket => ticket.emergency === true)
                setFiltered(emergencyTickets)
            } else {
                setFiltered(tickets)
            }
        },
        [emergency]
    )

    useEffect(
        () => {
            fetch('http://localhost:8088/serviceTickets')
                .then(response => response.json())
                .then((ticketArray) => {
                    setTickets(ticketArray)
                })
            console.log("Initial state of tickets", tickets) // View the initial state of tickets
        },
        [] // When this array is empty, you are observing initial component state
    )

    useEffect(
        () => {
            if (honeyUserObject.staff) {
                setFiltered(tickets)
            } else {
                const myTickets = tickets.filter(ticket => ticket.userId === honeyUserObject.id)
                setFiltered(myTickets)
            }
            // console.log(tickets)
        },
        [tickets]
    )

    useEffect(
        () => {
            if (openOnly) {
                const openTicketArray = tickets.filter(ticket => {
                    return ticket.userId === honeyUserObject.id && ticket.dateCompleted === ""
                })
                setFiltered(openTicketArray)
            } else {
                const myTickets = tickets.filter(ticket => ticket.userId === honeyUserObject.id)
                setFiltered(myTickets)
            }

        },
        [openOnly]
    )


    return <>
        {
            honeyUserObject.staff
                ? <>
                    <button class="emergencyButton" onClick={() => { setEmergency(true) }}>Emergency Tickets Only</button>
                    <button class="showAllButton" onClick={() => { setEmergency(false) }}>Show All Tickets</button>
                </>
                : <>
                    <button class="createTicket" onClick={() => navigate("/ticket/create")}>Create Ticket</button>
                    <button class="createTicket" onClick={() => updateOpenOnly(true)}>Open Tickets</button>
                    <button class="createTicket" onClick={() => updateOpenOnly(false)}>All My Tickets</button>
                </>
        }

        <h2>List of Tickets</h2>
        <article className="tickets">
            {
                filteredTickets.map(
                    (ticket) => {
                        return <section className="ticket">
                            <header>{ticket.description}</header>
                            <footer>Emergency: {ticket.emergency ? "🧨" : "No"}</footer>
                        </section>
                    }
                )
            }
        </article>
    </>
}