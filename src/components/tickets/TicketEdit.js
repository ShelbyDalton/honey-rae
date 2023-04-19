import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

// The component defines a state variable called ticket using the useState hook. The 
// ticket object has two properties: description and emergency. The assignTicket function 
// is used to update the state of ticket.
export const TicketEdit = () => {
    const [ticket, assignTicket] = useState({
        description: "",
        emergency: false
    })
    // The component retrieves the ticketId parameter from the URL using the useParams hook.
    const { ticketId } = useParams()
    const navigate = useNavigate()

    // The component uses the useEffect hook to fetch the service ticket data from the server 
    // when the component first mounts. It does this by sending a GET request to the server at 
    // the URL http://localhost:8088/serviceTickets/${ticketId}. Once the data is retrieved, 
    // it updates the ticket state using the assignTicket function.
    useEffect(() => {
        fetch(`http://localhost:8088/serviceTickets/${ticketId}`)
            .then(response => response.json())
            .then((data) => {
                assignTicket(data)
            })
    }, [ticketId])

    // The component defines a function called handleSaveButtonClick that is called when the 
    // user clicks the "Save Edits" button. This function sends a PUT request to the server 
    // at the URL http://localhost:8088/serviceTickets/${ticket.id} with the updated ticket 
    // data. Once the request is complete, the function navigates the user back to the list 
    // of service tickets using the navigate function.
    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        return fetch(`http://localhost:8088/serviceTickets/${ticket.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(ticket)
        })
            .then(response => response.json())
            .then(() => {
                navigate("/tickets")
            })
    }


    // The component renders a form with two fields: a text area for the description property 
    // of the ticket object, and a checkbox for the emergency property of the ticket object. 
    // The values of these fields are set to the current state of the ticket object. The component 
    // also renders a "Save Edits" button that calls the handleSaveButtonClick function when clicked. 
    // When the user types in the text area or checks/unchecks the checkbox, the state of ticket 
    // is updated using the assignTicket function.
    return <form className="ticketForm">
        <h2 className="ticketForm__title">Service Ticket</h2>
        <fieldset>
            <div className="form-group">
                <label htmlFor="description">Description:</label>
                <textarea
                    required autoFocus
                    type="text"
                    style={{
                        height: "10rem"
                    }}
                    className="form-control"
                    value={ticket.description}
                    onChange={
                        (evt) => {
                            const copy = { ...ticket }
                            copy.description = evt.target.value
                            assignTicket(copy)
                        }
                    }>{ticket.description}</textarea>
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="name">Emergency:</label>
                <input type="checkbox"
                    checked={ticket.emergency}
                    onChange={
                        (evt) => {
                            const copy = { ...ticket }
                            copy.emergency = evt.target.checked
                            assignTicket(copy)
                        }
                    } />
            </div>
        </fieldset>
        <button
            onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
            className="btn btn-primary">
            Save Edits
        </button>
    </form>
}