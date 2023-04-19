import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

// Defines a React component called CustomerDetails that renders customer 
// details based on a customer ID obtained from the URL parameters using the useParams hook.
export const CustomerDetails = () => {
    const { customerId } = useParams()
    const [customer, updateCustomer] = useState({})

// The component uses the useState hook to define a state variable called 'customer', which 
// is initially an empty object. The useEffect hook is used to fetch customer data from a web 
// API endpoint based on the customerId parameter.
    useEffect(
        () => {
            fetch(`http://localhost:8088/customers?_expand=user&_embed=customerTickets&userId=${customerId}`)
                .then(response => response.json())
                .then((data) => {
                    const singleCustomer = data[0]
                    updateCustomer(singleCustomer)
                    // When the customerId parameter changes, the useEffect hook is triggered, and 
                    // the fetch function is called to retrieve customer data from the API. The 
                    // response is then parsed as JSON, and the first element of the resulting array 
                    // is used to update the state variable 'customer' using the 'updateCustomer' function.
                })
        },
        [customerId]
    )

    // Finally, the component renders the customer details, such as the full name, email, address, 
    // and phone number, using the 'customer' state variable. The rendered data is displayed in a 
    // section with the class name 'customer'.
    return <section className="customer">

        <header className="customer_header">{customer?.user?.fullName}</header>
        <div>Email: {customer?.user?.email}</div>
        <div>Address: {customer.address}</div>
        <div>Phone Number: {customer.phoneNumber}</div>
    </section>
}