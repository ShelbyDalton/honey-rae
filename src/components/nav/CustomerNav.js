import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

// JavaScript function component that creates a navigation bar for a customer in a React 
// application. It uses the react-router-dom library to define the links and the useNavigate 
// hook to navigate to different routes.
export const CustomerNav = () => {
    const navigate = useNavigate()

    // The navigation bar consists of an unordered list (<ul>) with three list items (<li>) 
    // that represent links to different pages. Two of them are always visible: "Tickets" and 
    // "Profile". The third list item with text "Logout" is visible only if there is a honey_user 
    // item stored in the local storage.
    return (
        // The first two list items are simple links that use the Link component from 
        // react-router-dom to navigate to the corresponding routes.

        // The third list item is conditionally rendered using a ternary operator that checks 
        // if there is a honey_user item in the local storage. If the item exists, it renders 
        // a "Logout" link. When this link is clicked, it removes the honey_user item from local 
        // storage and navigates to the home page ("/") using the useNavigate hook.
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/tickets">Tickets</Link>
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

