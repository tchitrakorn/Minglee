import React, { useState, useEffect } from "react";
import axios from "axios";
import MyEventCard from "./MyEventCard.jsx";
import EventCard from "../HomeFeed/EventCard.jsx"

function MyEvent(props) {
    const [attendingEvents, setAttendingEvents] = useState([]);
    const [hostingEvents, setHostingEvents] = useState([]);

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
    });

    return (
        <div class="myevent-wrapper auto-margin">
            <div class="profile-wrapper">
                <div>
                    <img
                        class="profile-icon"
                        src="https://i.ibb.co/RbK369F/cute-animals-portrait-face-panda-bear-fox-cat-rabbit-fox-deer-raccon-icons-vector-illustration.jpg"
                        alt="An adorable bear icon"
                    />
                </div>
                <div class="profile-name">{props.userName}</div>
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
