import { Link } from "react-router-dom"

// Defines a component called Customer that displays the name and email of a customer. 
// It also includes a link to a detailed view of that customer's information. 
export const Customer = ({ id, fullName, email }) => {
    return <section className="customer">
        <div>
            <Link to={`/customers/${id}`}>Name: {fullName}</Link>
                        </div>
        <div>Email: {email}</div>
    </section>
}

// The Customer component takes in three props: id, fullName, and email. The id prop is 
// used to create the URL path for the detailed view of the customer's information. The 
// fullName prop is displayed as a clickable link, and the email prop is displayed as 
// plain text.