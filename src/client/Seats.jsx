import React, { useEffect, useState } from "react";
import Steering from "../assets/steering.png"; // Importing the steering wheel image
import "../style/Seats.css"; // Importing the CSS styles for the Seats component

const Seats = (props) => {
  const [seats, setSeats] = useState(props.seatInfo); // Initializing state for seats using props

  useEffect(() => {
    // Updating seats state when props change
    setSeats(props.seatInfo);
  }, [props.seatInfo]);

  const renderSeats = () => {
    const seatElements = [];
    
    for (let i = 0; i <= 39; i++) { // Looping through seats
        if(i===0){ // Check if it's the driver's seat
            seatElements.push(
                <div
                  key={i}
                  className="seat"
                  id={"D"} // Assigning the id "D" for driver's seat
                >
                  D
                </div>
              );
        }
        else{ // For passenger seats
          seatElements.push(
              <div
                key={i}
                className="seat"
                id={i} // Assigning seat number as id
                onClick={() => props.selectSeat(i)} // Handling click event to select seat
              >
                {i} {/* Displaying seat number */}
              </div>
            );
        }
    }
    return seatElements; // Returning array of seat elements
  };

  return (
    <div className="bus-origin">
      <div className="driver">
        <img src={Steering} alt="driver" /> {/* Displaying driver image */}
      </div>
      <div className="passenger">
        <div className="left-rows">
          <div className="row">{renderSeats().slice(0, 10)}</div> {/* Rendering first 10 seats */}
          <div className="row">{renderSeats().slice(10, 20)}</div> {/* Rendering next 10 seats */}
        </div>
        <div className="right-rows">
          <div className="row">{renderSeats().slice(20, 30)}</div> {/* Rendering next 10 seats */}
          <div className="row">{renderSeats().slice(30)}</div> {/* Rendering remaining seats */}
        </div>
      </div>
    </div>
  );
};

export default Seats; // Exporting Seats component
