// This component takes in a single prop called setterFunction.
export const TicketSearch = ({setterFunction}) => {
    // The TicketSearch component returns a div element with a class of 
    // TicketSearch and an input element with a class of SearchField. 
    // The input element is a search field that allows the user to enter 
    // search terms.
    return (
        <div class="TicketSearch">
        <input class="SearchField"
        // The onChange event listener is attached to the input element, and 
        // whenever the value of the search field changes, the function defined 
        // in the setterFunction prop is called with the new value of the search 
        // field as an argument.
        onChange={
            (changeEvent) => {
                setterFunction(changeEvent.target.value)
            }
        }
        // This allows the parent component to update its own state with the 
        // new search term whenever the user types into the search field. The 
        // type attribute of the input element is set to "text" and the placeholder 
        // attribute is set to "Enter search terms.." to provide a hint to the 
        // user on what to enter in the search field.
        type="text" placeholder="Enter search terms.." />
        </div>
    )
}