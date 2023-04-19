import { Link } from "react-router-dom"
import { getAllTickets } from "./TicketList.js"

// Code defines a React component called Ticket that renders a single service ticket. It 
// takes several props as input, including ticketObject (an object representing the ticket), 
// currentUser (an object representing the currently logged-in user), employees (an array of 
// all employees), and getAllTickets (a function to fetch all tickets).
export const Ticket = ({ ticketObject, currentUser, employees, getAllTickets }) => {

    let assignedEmployee = null
    // The component first checks to see if the ticket has been assigned to an employee, and 
    // if so, it finds the corresponding employee object in the employees array. It also finds 
    // the employee object that corresponds to the current user.
    if (ticketObject.employeeTickets.length > 0) {
        const ticketEmployeeRelationship = ticketObject.employeeTickets[0]
        assignedEmployee = employees.find(employee => employee.id === ticketEmployeeRelationship.employeeId)
    }

    const userEmployee = employees.find(employee => employee.userId === currentUser.id)

    // The canClose function returns a "Finish" button if the ticket is assigned to the current 
    // user and has not yet been completed. When the button is clicked, the function sends a 
    // PUT request to update the ticket's dateCompleted property to the current time and then 
    // fetches all tickets again to update the UI.
    const canClose = () => {
        if (userEmployee?.id === assignedEmployee?.id && ticketObject.dateCompleted === "") {
            return <button onClick={closeTicket} className="ticket__finish">Finish</button>
        } else {
            return ""
        }
    }

    // Code defines a function called closeTicket, which updates a specific ticket in the database to mark 
    // it as completed.
    const closeTicket = () => {
        // First, a new object called 'copy' is created, which includes the same userId, description, 
        // and emergency properties as the original ticketObject, but with a new dateCompleted property 
        // set to the current date and time.
        const copy = {
            userId: ticketObject.userId,
            description: ticketObject.description,
            emergency: ticketObject.emergency,
            dateCompleted: new Date()
        }

        // Then, a PUT request is sent to the server to update the ticket data in the database. The 
        // URL of the request is http://localhost:8088/serviceTickets/${ticketObject.id}, where ${ticketObject.id} 
        // is the ID of the ticket that is being updated. The request body contains the JSON representation of 
        // the copy object, which is the data that will be updated in the database.
        return fetch(`http://localhost:8088/serviceTickets/${ticketObject.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(copy)
        })
        .then(response => response.json())
        // After the PUT request is completed successfully, the response.json() method is called 
        // to extract the JSON data from the response. Then, the getAllTickets function is called, 
        // which is a callback function that is passed in as a prop to the Ticket component. This 
        // function is responsible for fetching and updating the list of all tickets displayed on 
        // the page.
        .then(getAllTickets)
    }

    // The deleteButton function returns a "Delete" button if the current user is not a staff member. 
    // When the button is clicked, the function sends a DELETE request to delete the ticket and fetches 
    // all tickets again to update the UI.
    const deleteButton = () => {
        if (!currentUser.staff) {
            return <button onClick={() => {
                fetch(`http://localhost:8088/serviceTickets/${ticketObject.id}`, {
                    method: "DELETE"
                })
                    .then(() => {
                        getAllTickets()
                    })
            }} className="ticket__delete">Delete</button>
        } else {
            return ""
        }
    }

    // The buttonOrNoButton function returns a "Claim" button if the current user is a staff member and 
    // the ticket has not yet been assigned to an employee. When the button is clicked, the function sends 
    // a POST request to create a new employeeTicket object linking the current user to the ticket and 
    // fetches all tickets again to update the UI.
    const buttonOrNoButton = () => {
        if (currentUser.staff) {
            return <button
            onClick = {() => {
                fetch('http://localhost:8088/employeeTickets', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        employeeId: userEmployee.id,
                        serviceTicketId: ticketObject.id
                    })
                })
                .then(response => response.json())
                .then(() => {
                    getAllTickets()
                })
            }}
            >Claim</button>
        } else {
            return ""
        }
    }

    // The component then renders the ticket's description, emergency status, and any relevant 
    // buttons. If the current user is a staff member, it displays the ticket's ID; otherwise, 
    // it displays a link to edit the ticket.
    return <div className="wholeTicket">
        <header>
            {
                currentUser.staff
                    ? `Ticket ${ticketObject.id}`
                    : <Link to={`/tickets/${ticketObject.id}/edit`}>Ticket {ticketObject.id}</Link>
            }
        </header>
        <section>{ticketObject.description}</section>
        <section>Emergency: {ticketObject.emergency ? "🧨" : "No"}</section>
        <footer className="footer">
            {
                ticketObject.employeeTickets.length
                ? `Currently being worked on by ${assignedEmployee !== null ? assignedEmployee?.user?.fullName : ""}`
                : buttonOrNoButton()
            }
            {
                canClose()
            }
            {
                deleteButton()
            }
        </footer>
    </div>
}