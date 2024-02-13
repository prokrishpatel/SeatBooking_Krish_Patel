import React, {useEffect,useState} from "react";
import Steering from '../assets/steering.png';
import '../style/Seats.css';

const Seats = (props)=>{
    const [seats,setSeats] = useState(props.seatInfo);
    useEffect(()=>{
        setSeats(props.seatInfo);
    },[props.seatInfo])
    return(
        <div className="bus-origin">
            <div className="driver">
                <img src={Steering} alt="driver" />
            </div>
            <div className="passenger">
                <div className="left-rows">
                    <div className="row">
                        <div className="seat" id="D">D</div>
                        <div className="seat" id="1">1</div>
                        <div className="seat" id="2">2</div>
                        <div className="seat" id="3">3</div>
                        <div className="seat" id="4">4</div>
                        <div className="seat" id="5">5</div>
                        <div className="seat" id="6">6</div>
                        <div className="seat" id="7">7</div>
                        <div className="seat" id="8">8</div>
                        <div className="seat" id="9">9</div>
                    </div>
                    <div className="row">
                        <div className="seat" id="10">10</div>
                        <div className="seat" id="11">11</div>
                        <div className="seat" id="12">12</div>
                        <div className="seat" id="13">13</div>
                        <div className="seat" id="14">14</div>
                        <div className="seat" id="15">15</div>
                        <div className="seat" id="16">16</div>
                        <div className="seat" id="17">17</div>
                        <div className="seat" id="18">18</div>
                        <div className="seat" id="19">19</div>
                    </div>
                </div>
                <div className="right-rows">
                    <div className="row">
                        <div className="seat" id="20">20</div>
                        <div className="seat" id="21">21</div>
                        <div className="seat" id="22">22</div>
                        <div className="seat" id="23">23</div>
                        <div className="seat" id="24">24</div>
                        <div className="seat" id="25">25</div>
                        <div className="seat" id="26">26</div>
                        <div className="seat" id="27">27</div>
                        <div className="seat" id="28">28</div>
                        <div className="seat" id="29">29</div>
                    </div>
                    <div className="row">
                        <div className="seat" id="30">30</div>
                        <div className="seat" id="31">31</div>
                        <div className="seat" id="32">32</div>
                        <div className="seat" id="33">33</div>
                        <div className="seat" id="34">34</div>
                        <div className="seat" id="35">35</div>
                        <div className="seat" id="36">36</div>
                        <div className="seat" id="37">37</div>
                        <div className="seat" id="38">38</div>
                        <div className="seat" id="39">39</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Seats;