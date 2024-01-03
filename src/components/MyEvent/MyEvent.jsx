import React, { useState, useEffect } from "react";
import axios from "axios";
import MyEventCard from "./MyEventCard.jsx";
import EventCard from "../HomeFeed/EventCard.jsx"
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

function MyEvent(props) {
    const [attendingEvents, setAttendingEvents] = useState([]);
    const [hostingEvents, setHostingEvents] = useState([]);
    const [userDetails, setUserDetails] = useState({})

    useEffect(() => {
        let params = {
            userId: props.userId,
        };

        axios
            .get(`http://localhost:8080/myevents/${props.userId}`)
            .then((response) => {
                setAttendingEvents(response.data.attendingEvents);
                setHostingEvents(response.data.hostingEvents);
            })
            .catch((error) => {
                console.log("myevents error: ", error);
            });

        axios
            .get(`http://localhost:8080/user/${props.userId}`)
            .then((response) => {
                console.log('user details: ', response.data)
                setUserDetails(response.data)
            })
            .catch((error) => {
                console.log("get user error: ", error);
            });

    });

    return (
        <div className="myevent-wrapper auto-margin">
            <div className="profile-wrapper">
                <div>
                    <img
                        class="profile-icon"
                        src="https://i.ibb.co/RbK369F/cute-animals-portrait-face-panda-bear-fox-cat-rabbit-fox-deer-raccon-icons-vector-illustration.jpg"
                        alt="An adorable bear icon"
                    />
                </div>
                <div className="profile-name">{props.userName}</div>
                <div className="profile-user-details">
                    <Popup trigger=
                        {<span class="material-icons clickable edit-icon">more</span>}
                        position="right center">
                        <div className="user-detail">
                            <div className="event-card-details">Personal Info:</div>
                            <div className="event-card-details">
                                <span class="material-icons">person</span>
                                {userDetails.firstname} {" "} {userDetails.lastname}
                            </div>
                            <div className="event-card-details">
                                <span class="material-icons">email</span>
                                {userDetails.email}
                            </div>
                            <div className="event-card-details">
                                <span class="material-icons">phone</span>
                                {userDetails.phone}
                            </div>
                            <div className="event-card-details">
                                <span class="material-icons">discord</span>
                                {userDetails.discord}
                            </div>
                        </div>
                    </Popup>
                </div>
            </div>
            <div class="split">
                <div>
                    <p class="myevents-title">Hosting</p>
                    {hostingEvents.map((event) => (
                        <EventCard
                            userId={props.userId}
                            event={event}
                        />
                    ))}
                </div>
                <div>
                    <p class="myevents-title">Attending</p>
                    {attendingEvents.map((event) => (
                        <EventCard
                            userId={props.userId}
                            event={event}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default MyEvent;
