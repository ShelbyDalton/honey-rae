import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

// JavaScript function component that creates a navigation bar for an employee 
// in a React application. Similar to the previous code, it uses the react-router-dom 
// library to define the links and the useNavigate hook to navigate to different routes.
export const EmployeeNav = () => {
    const navigate = useNavigate()
// The navigation bar consists of an unordered list (<ul>) with four list items (<li>) 
// that represent links to different pages. The links are for "Tickets", "Employees", 
// "Customers", and "Profile".
    return (
        // The first four list items are simple links that use the Link component from 
        // react-router-dom to navigate to the corresponding routes.

        // The fifth list item with text "Logout" is visible only if there is a honey_user 
        // item stored in the local storage. This is the same code as in the previous example.
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/tickets">Tickets</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/employees">Employees</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/customers">Customers</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/profile">Profile</Link>
            </li>
            {
                localStorage.getItem("honey_user")
                    ? <li className="navbar__item navbar__logout">
                        <Link className="navbar__link" to="" onClick={() => {
                            localStorage.removeItem("honey_user")
                            navigate("/", {replace: true})
                        }}>Logout</Link>
                    </li>
                    : ""
            }
        </ul>
    )
}

