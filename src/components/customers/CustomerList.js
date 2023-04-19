import { useEffect, useState } from "react"
import "./Customers.css"
import { Customer } from "./Customer"

// Defines a React component called CustomerList that fetches customer data from an 
// API endpoint and displays it using the Customer component.
export const CustomerList = () => {
    const [customers, setCustomers] = useState([])

    // The component uses the useState hook to define a state variable called 'customers', 
    // which is initially an empty array. The useEffect hook is used to fetch customer data 
    // from a web API endpoint using the fetch function.
    useEffect(
        () => {
            fetch("http://localhost:8088/users?isStaff=false")
            .then(response => response.json())
            .then((customerArray) => {
                setCustomers(customerArray)
            })
            // When the component is mounted, the useEffect hook is triggered, and the fetch 
            // function is called to retrieve data from the API endpoint. The response is then 
            // parsed as JSON, and the resulting array is used to update the state variable 
            // 'customers' using the 'setCustomers' function.
        },
        []
    )

    // Finally, the component renders the list of customers using the 'customers' state variable. 
    // The rendered data is displayed in an article with the class name 'customers'. For each customer 
    // in the 'customers' array, the component renders a Customer component with the customer's ID, 
    // full name, and email as props. The key prop is used to uniquely identify each customer in the list.
    return <article className="customers">
        {
            customers.map(customer => <Customer key={`customer--${customer.id}`}
                id={customer.id} 
                fullName={customer.fullName} 
                email={customer.email} />)
        }
    </article>
}