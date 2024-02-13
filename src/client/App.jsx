import React, { useState } from "react";

import Seats from './Seats';
import '../style/App.css';

const App = () => {
    const initialSeats = Array.from({ length: 39 }, (_, i) => (i === 0 ? "Driver" : "Open"));

    const [seats, setSeats] = useState(initialSeats);

    return (
        <div className="main-frame">
            <header>SEAT BOOKING</header>
            <Seats seats={seats} />
            <footer>
              
            </footer>
        </div>
    );
}

export default App;
