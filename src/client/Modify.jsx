import React, { useState, useEffect } from "react";
import '../style/App.css'; // Importing CSS styles for the Modify component

const Modify = (props) => {
    // State variables to store input values for different seat categories
    const [maleInput, setMaleInput] = useState(props.male.join(', '));
    const [femaleInput, setFemaleInput] = useState(props.female.join(', '));
    const [specialInput, setSpecialInput] = useState(props.special.join(', '));
    const [blockInput, setBlockInput] = useState(props.block.join(', '));

    // Function to handle input changes
    const handleInputChange = (event, setter) => {
        setter(event.target.value);
    };

    // Function to handle form submission
    const handleSubmit = () => {
        // Splitting input values and trimming spaces to create arrays
        const maleArray = maleInput.split(',').map(item => item.trim());
        const femaleArray = femaleInput.split(',').map(item => item.trim());
        const specialArray = specialInput.split(',').map(item => item.trim());
        const blockArray = blockInput.split(',').map(item => item.trim());
        // Calling the result function passed as props to update seat categories
        props.result(maleArray, femaleArray, specialArray, blockArray);
        // Closing the Modify component
        props.onclose();
    };

    return (
        <div className="allocate-container">
            <div className="allocate-form">
                <div className="upper-part">
                    Modify Seat
                </div>
                <div className="mid-part modify-in">
                    {/* Input fields for different seat categories */}
                    <div>
                        <span>Male:</span>
                        <input type="text" id="male" value={maleInput} onChange={(e) => handleInputChange(e, setMaleInput)} />
                    </div>
                    <div>
                        <span>Female:</span>
                        <input type="text" id="female" value={femaleInput} onChange={(e) => handleInputChange(e, setFemaleInput)} />
                    </div>
                    <div>
                        <span>Special:</span>
                        <input type="text" id="special" value={specialInput} onChange={(e) => handleInputChange(e, setSpecialInput)} />
                    </div>
                    <div>
                        <span>Blocked:</span>
                        <input type="text" id="block" value={blockInput} onChange={(e) => handleInputChange(e, setBlockInput)} />
                    </div>
                </div>
                <div className="lower-part">
                    {/* Button to go back */}
                    <button className="reset" onClick={props.onclose}>Go Back</button>
                    {/* Button to submit modifications */}
                    <button className="allocate" onClick={handleSubmit}>Modify</button>
                </div>
            </div>
        </div>
    );
};

export default Modify;
