import { useEffect, useState } from "react"
import "./Employees.css"
import { Employee } from "./Employee"

// Defines a React component called EmployeeList that fetches employee data from an 
// API endpoint and displays it as a list of employees in the form of the Employee component.
export const EmployeeList = () => {
    const [employees, setEmployees] = useState([])

    // The component uses the useState hook to define a state variable called 'employees', 
    // which is initially an empty array. The useEffect hook is used to fetch employee data 
    // from a web API endpoint.
    useEffect(
        () => {
            fetch("http://localhost:8088/users?isStaff=true")
            .then(response => response.json())
            .then((employeeArray) => {
                setEmployees(employeeArray)
            })
            // When the component mounts, the useEffect hook is triggered, and the fetch 
            // function is called to retrieve employee data from the API. The response is 
            // then parsed as JSON, and the resulting array is used to update the state 
            // variable 'employees' using the 'setEmployees' function.
        },
        []
    )

    // Finally, the component renders the list of employees using the 'employees' state 
    // variable. The rendered data is displayed in an article with the class name 'employees' 
    // and is presented as a list of Employee components with the properties of each employee, 
    // such as their full name and email address.
    return <article className="employees">
        {
            employees.map(employee => <Employee key={`employee--${employee.id}`}
                id={employee.id} 
                fullName={employee.fullName} 
                email={employee.email} />)
        }
    </article>
}