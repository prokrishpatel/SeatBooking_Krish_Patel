import React, { useState, useEffect } from "react";
import '../style/App.css'; // Importing CSS styles for the Allocate component

const Allocate = (props) => {
    const seats = props.seats; // Extracting seats from props
    const [selectedSeats, setSelectedSeats] = useState([]); // State for selected seats
    const [selectedCategory, setSelectedCategory] = useState("Select Seats For"); // State for selected category

    useEffect(() => {
        // Filter selected seats from the seats object and update selectedSeats state
        const selected = Object.keys(seats).filter(seat => seats[seat] === "Selected");
        setSelectedSeats(selected);
    }, [seats]);

    // Function to handle final allocation
    const handleAllocateFinal = (category, selectedList) => {
        if (category === "Select Seats For") {
            // Alert if no category selected
            alert("Please select a category for the seats.");
        } else {
            // Call result function to allocate seats and close the Allocate component
            props.result(category, selectedList);
            props.onclose();
        }
    }

    return (
        <div className="allocate-container">
            <div className="allocate-form">
                <div className="upper-part">
                    Allocate Seat
                </div>
                <div className="mid-part">
                    {/* Display selected seats */}
                    <div className="selected-seats">
                        Selected Seats: {selectedSeats.join(", ")}
                    </div>
                    {/* Dropdown to select category */}
                    <div className="options">
                        <select onChange={(e) => setSelectedCategory(e.target.value)}>
                            <option>Select Seats For</option>
                            <option>Male</option>
                            <option>Female</option>
                            <option>Special</option>
                            <option>Block</option>
                        </select>
                    </div>
                </div>
                <div className="lower-part">
                    {/* Button to go back */}
                    <button className="reset" onClick={props.onclose}>Go Back</button>
                    {/* Button to allocate selected seats */}
                    <button className="allocate" onClick={() => handleAllocateFinal(selectedCategory, selectedSeats)}>Allocate</button>
                </div>
            </div>
        </div>
    );
}

export default Allocate;
