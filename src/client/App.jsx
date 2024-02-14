import React, { useState, useEffect } from "react";
import Seats from './Seats'; // Importing seat grid component
import Allocate from "./Allocate"; // Importing allocate component
import Modify from "./Modify"; // Importing modify component
import SeatData from '../Data/seatData.json'; // Importing data set from JSON structure
import '../style/App.css'; // Importing CSS styles for the App component
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
    const [seats, setSeats] = useState(null); // State for seats data
    const [allocateBox, setAllocateBox] = useState(false); // State for showing allocate component
    const [modifBox, setModifyBox] = useState(false); // State for showing modify component
    const [countSelected, setCountSelected] = useState(0); // State for total number of selected seats
    const [deleteSet, setDeleteSet] = useState(new Set()); // State for seats selected for deletion
    const [male, setMale] = useState(new Set()); // State for male seats
    const [female, setFemale] = useState(new Set()); // State for female seats
    const [special, setSpecial] = useState(new Set()); // State for special seats
    const [blocked, setBlocked] = useState(new Set()); // State for blocked seats

    // Fetch all data from JSON file
    useEffect(() => {
        setTimeout(() => {
            setSeats(SeatData.seats);
        }, 300); 
        toast.info('Please select seats to assign or change seat nature')
    }, []);

    // Maintain visibility of delete button based on deleteSet state
    useEffect(() => {
        const deleteElement = document.getElementById('delete');
        if (deleteSet.size === 0) { 
            deleteElement.style.display = 'none';
        } else {
            deleteElement.style.display = 'block';
        }
    }, [deleteSet]);
     
    

    // Maintain modification arrays changes
    useEffect(() => {
        if (male.size === 0 && female.size === 0 && blocked.size === 0 && special.size === 0) {
            document.getElementById('modify').disabled = true;
        } else {
            document.getElementById('modify').disabled = false;
        }
    }, [male, female, special, blocked]);
    
    // Update selected counts
    useEffect(() => {
        if (countSelected === 0) {
            document.getElementById("allocate-btn").disabled = true;
        } else {
            document.getElementById("allocate-btn").disabled = false;
        }
    }, [countSelected]);

    // Update category of all seats
    useEffect(() => {
        setCountSelected(0);
        const maleSet = new Set()
        const femaleSet = new Set()
        const specialSet = new Set()
        const blockedSet = new Set()
        for (const seat in seats) {
            const seatElement = document.getElementById(`${seat}`);
            if (seatElement) {
                const status = seats[seat];
                switch (status) {
                    case "Selected":
                        seatElement.style.background = "#3dae2b";
                        seatElement.style.borderColor = "white";
                        setCountSelected(prevCount => prevCount + 1);
                        break;
                    case "Block":
                        seatElement.style.background = "gray";
                        seatElement.style.borderColor = "white";
                        if (seat !== 'D') {
                            blockedSet.add(seat);
                        }
                        break;
                    case "Special":
                        seatElement.style.background = "purple";
                        seatElement.style.borderColor = "white";
                        specialSet.add(seat);
                        break;
                    case "Male":
                        seatElement.style.background = "#1835abde";
                        seatElement.style.borderColor = "white";
                        maleSet.add(seat);
                        break;
                    case "Female":
                        seatElement.style.background = "pink";
                        seatElement.style.borderColor = "white";
                        femaleSet.add(seat);
                        break;
                    default:
                        seatElement.style.borderColor = "#3dae2b";
                        seatElement.style.background = "white";
                        break;
                }
            }
        }
        setBlocked(blockedSet);
        setMale(maleSet);
        setFemale(femaleSet);
        setSpecial(specialSet);
    }, [seats]);
    // Update visual representation of seats selected for deletion
    useEffect(() => {
        deleteSet.forEach(seat => {
            const seatElement = document.getElementById(seat);
            if (seatElement) {
                seatElement.style.background = "white";
                seatElement.style.borderColor = "red";
            }
        });
    }, [deleteSet]);
    // Function to handle any seat click/select
    const handleSelectSeat = (seat) => {
        const updatedSeats = { ...seats };
        if (updatedSeats[seat] === "Selected") {
            updatedSeats[seat] = "Open";
        } else if (updatedSeats[seat] === "Open") {
            updatedSeats[seat] = "Selected";
        } else if (seat !== 'D') {
            setDeleteSet(prevDeleteSet => {
                const newDeleteSet = new Set(prevDeleteSet);
                if (newDeleteSet.has(seat)) {
                    newDeleteSet.delete(seat); 
                } else if (seat !== 'D') {
                    newDeleteSet.add(seat); 
                }
                return newDeleteSet;
            });
        }
        setSeats(updatedSeats);
    }

    // Function to reset complete seat allocation
    const reset = () => {
        Swal.fire({
            title: "Do you want to Reset layout?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Reset it!"
            }).then((result) => {
            if (result.isConfirmed) {
                setSeats(SeatData.seats);
                Swal.fire({
                title: "Layout Reset Successful",
                text: "Ready for a Fresh Start!",
                icon: "success"
                });
            }
        });
    }
    
    // Handle allocation button click
    const handleAllocate = () => {
        document.querySelector('.main-frame').style.pointerEvents = 'none';
        setAllocateBox(true);
    }

    // Handle modify button click
    const handleModify = () => {
        document.querySelector('.main-frame').style.pointerEvents = 'none';
        setModifyBox(true);
    }

    // Handle Go back button
    const onClose = () => {
        document.querySelector('.main-frame').style.pointerEvents = 'auto';
        setAllocateBox(false);
        setModifyBox(false);
    }

    // Handle allocate submit button 
    const allocateAns = (category, selectedList) => {
        const updatedSeats = { ...seats };
        selectedList.forEach(seat => {
            updatedSeats[seat] = category;
        });
        setSeats(updatedSeats);
        if(category=="Block"){
            toast.success(`Seats ${category}ed`);
        }
        else{
            toast.success(`Seats Allocated for ${category}s`);
        }
        
    }

    // Handle modify submit button
    const modifyAns = (male, female, special, block) => {
        const updatedSeats = { ...seats };
        male.forEach(seat => {
            if (seat !== 'D') updatedSeats[seat] = "Male";
        })
        female.forEach(seat => {
            if (seat !== 'D') updatedSeats[seat] = "Female";
        })
        special.forEach(seat => {
            if (seat !== 'D') updatedSeats[seat] = "Special";
        })
        block.forEach(seat => {
            if (seat !== 'D') updatedSeats[seat] = "Block";
        })
        setSeats(updatedSeats);
        toast.success('Seats Modified Sucessfully');
    }
    const DeleteConfirm = ()=>{
        const updatedSeats = { ...seats };
        deleteSet.forEach(seat => {
            updatedSeats[seat] = "Open";
        });
        setDeleteSet(new Set()); 
        setSeats(updatedSeats);
    }
    // Handle delete request
    const handleDelete = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
                DeleteConfirm();
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });
            }
            else{
                setDeleteSet(new Set());
            }
          });
    }
    
    return (
        <React.Fragment>
            <div className="main-frame">
                <header>SEAT BOOKING</header>

                {seats === null ? (
                    <div>Loading...</div>
                ) : (
                    <Seats seats={seats} selectSeat={handleSelectSeat}/>
                )}

                <footer>
                    <div className="left">
                       * Please select seats to assign or change seat nature
                    </div>
                    
                    <div className="right">
                        <button className="reset" onClick={reset}>Reset Layout</button>

                        <button className="reset" id="delete" onClick={handleDelete}>Delete Allocation</button>

                        <button className="allocate" id="allocate-btn" onClick={handleAllocate}>Allocate Seat</button>

                        <button className="allocate" id="modify" onClick={handleModify}>Modify Seats</button>

                    </div>
                </footer>
                
            </div>
            {/* Conditional Rendering of Allocate and Modify */}
            {allocateBox && <Allocate onclose={onClose} seats={seats} result={allocateAns}/>}
            {modifBox && <Modify onclose={onClose} male={Array.from(male)} female={Array.from(female)} special={Array.from(special)} block={Array.from(blocked)} result={modifyAns}/>}
            <ToastContainer />
        </React.Fragment>
    );
}

export default App;
