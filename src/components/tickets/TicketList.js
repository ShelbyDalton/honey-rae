import { useEffect, useState } from "react"
import "./Tickets.css"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { Ticket } from "./Ticket"

// This is a React functional component called TicketList that is responsible for displaying a 
// list of tickets. The component imports useEffect and useState hooks from the React library, 
// as well as other components and functions from other files. The component takes a single prop 
// called searchTermState.
export const TicketList = ({ searchTermState }) => {
    // Inside the component, several states are initialized using the useState hook. tickets 
    // state holds an array of all the tickets fetched from the API, employees state holds an 
    // array of all the employees fetched from the API, filteredTickets state holds an array 
    // of tickets that have been filtered based on different criteria such as searchTermState, 
    // emergency, and openOnly. emergency and openOnly states hold boolean values indicating 
    // whether to filter the tickets by emergency or by open tickets only.
    const [tickets, setTickets] = useState([])
    const [employees, setEmployees] = useState([])
    const [filteredTickets, setFiltered] = useState([])
    const [emergency, setEmergency] = useState(false)
    const [openOnly, updateOpenOnly] = useState(false)
    // The component uses the useNavigate hook from the "react-router-dom" library to 
    // navigate to different pages when the user clicks on a button.
    const navigate = useNavigate()

    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)

    // The first useEffect hook filters the tickets array based on the searchTermState 
    // prop and updates the filteredTickets state accordingly.
    useEffect(
        () => {
            const searchedTickets = tickets.filter(ticket => {
                return ticket.description.toLowerCase().startsWith(searchTermState.toLowerCase())
            })
            setFiltered(searchedTickets)
        },
        [searchTermState]
    )
    
    // The second useEffect hook filters the tickets array based on the emergency state and 
    // updates the filteredTickets state accordingly.
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

    // The third useEffect hook fetches all the tickets and employees from the API when the 
    // component is mounted and initializes the tickets and employees states accordingly.
    useEffect(
        () => {
            getAllTickets()

            fetch('http://localhost:8088/employees?_expand=user')
                .then(response => response.json())
                .then((employeeArray) => {
                    setEmployees(employeeArray)
                })

            console.log("Initial state of tickets", tickets) // View the initial state of tickets
        },
        [] // When this array is empty, you are observing initial component state
    )

    // The fourth useEffect hook filters the tickets array based on the honeyUserObject state 
    // and updates the filteredTickets state accordingly.
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

    // The fifth useEffect hook filters the tickets array based on the openOnly state and 
    // updates the filteredTickets state accordingly.
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

    // This code block defines a function named getAllTickets which uses the fetch method to make a 
    // GET request to a REST API endpoint located at http://localhost:8088/serviceTickets?_embed=employeeTickets.
    // This API endpoint returns a list of service tickets, each of which may have one or more 
    // employees associated with it. The _embed=employeeTickets query parameter tells the API to 
    // include the related employee information along with each ticket in the response.
    // Once the response is received from the server, the .json() method is called on the response 
    // object to parse the response body as JSON. Then, the setTickets function is called with the parsed 
    // ticket data as an argument to update the tickets state variable with the new data.
    // This function is used inside a useEffect hook to fetch the initial data from the API 
    // endpoint when the component mounts or whenever the tickets state variable changes.
    const getAllTickets = () => {
        fetch('http://localhost:8088/serviceTickets?_embed=employeeTickets')
                    .then(response => response.json())
                    .then((ticketArray) => {
                        setTickets(ticketArray)
                    })
    }

    // Finally, the component returns a JSX fragment containing several buttons and an article 
    // that displays the filteredTickets array by mapping over it and passing each ticket to 
    // a Ticket component.
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
                    (ticket) => <Ticket 
                    employees={employees} 
                    getAllTickets={getAllTickets}
                    currentUser={honeyUserObject} 
                    ticketObject={ticket} />
                )
            }
        </article>
    </>
}