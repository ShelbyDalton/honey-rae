import { Navigate, useLocation } from "react-router-dom"

// This code exports a component called Authorized that takes in children as a 
// prop. The purpose of this component is to ensure that the user is authorized 
// to access a certain page. If the user is authorized, then children are returned. 
// Otherwise, the user is redirected to the login page with the current location 
// being passed as a state object.
export const Authorized = ({ children }) => {
    // The useLocation hook from the react-router-dom package is used to get the 
    // current location. Then, localStorage.getItem("honey_user") is called to 
    // check if the user is logged in by looking for a key called honey_user in 
    // local storage. If the user is logged in, then the children are returned. 
    // Otherwise, the user is redirected to the login page using the Navigate 
    // component from react-router-dom, with the current location passed as a 
    // state object. The replace prop is set to true to replace the current 
    // history stack with the new URL instead of pushing it onto the stack.
    const location = useLocation()

    if (localStorage.getItem("honey_user")) {
        return children
    }
    else {
        return <Navigate
            to={`/login/${location.search}`}
            replace
            state={{ location }} />
    }
}

