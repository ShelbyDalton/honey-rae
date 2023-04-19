import { Link } from "react-router-dom"

// Defines a component called Employee that displays the name and email of an employee. 
// It also includes a link to a detailed view of that employee's information. 
export const Employee = ({ id, fullName, email }) => {
    return <section className="employee">
        <div>
            <Link to={`/employees/${id}`}>Name: {fullName}</Link>
                        </div>
        <div>Email: {email}</div>
    </section>
}

// The Employee component takes in three props: id, fullName, and email. The id prop is 
// used to create the URL path for the detailed view of the customer's information. The 
// fullName prop is displayed as a clickable link, and the email prop is displayed as 
// plain text.