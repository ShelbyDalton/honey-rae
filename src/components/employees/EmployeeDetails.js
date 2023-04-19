import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

// Defines a React component called EmployeeDetails that fetches employee data from an API 
// endpoint and displays it based on the employee ID obtained from the URL parameters using the useParams 
// hook.
export const EmployeeDetails = () => {
    const { employeeId } = useParams()
    const [employee, updateEmployee] = useState({})

    // The component uses the useState hook to define a state variable called 'employee', which is initially 
    // an empty object. The useEffect hook is used to fetch employee data from a web API endpoint based on 
    // the employeeId parameter.
    useEffect(
        () => {
            fetch(`http://localhost:8088/employees?_expand=user&_embed=employeeTickets&userId=${employeeId}`)
                .then(response => response.json())
                .then((data) => {
                    const singleEmployee = data[0]
                    updateEmployee(singleEmployee)
                })
                // When the employeeId parameter changes, the useEffect hook is triggered, and the fetch 
                // function is called to retrieve employee data from the API. The response is then parsed 
                // as JSON, and the first element of the resulting array is used to update the state variable 
                // 'employee' using the 'updateEmployee' function.
        },
        [employeeId]
    )

    // Finally, the component renders the employee details, such as the full name, email, specialty, 
    // rate, and the number of tickets the employee is working on, using the 'employee' state variable. 
    // The rendered data is displayed in a section with the class name 'employee'.
    return <section className="employee">

        <header className="employee_header">{employee?.user?.fullName}</header>
        <div>Email: {employee?.user?.email}</div>
        <div>Specialty: {employee.specialty}</div>
        <div>Rate: {employee.rate}</div>
        <footer className="employee_footer">Currently working on {employee?.employeeTickets?.length} tickets</footer>
    </section>
}