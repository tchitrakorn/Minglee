import React, { useState, useEffect } from "react";
import axios from "axios";
import MyEventCard from "./MyEventCard.jsx";

function MyEvent(props) {
    const [attendingEvents, setAttendingEvents] = useState([]);
    const [hostingEvents, setHostingEvents] = useState([]);

    useEffect(() => {
        console.log("userId: ", props.userId);
        let params = {
            userId: props.userId,
        };

        axios
            .get("/usersEvents", { params })
            .then((response) => {
                setAttendingEvents(response.data);
            })
            .catch((error) => {
                console.log("error");
            });

        axios
            .get("/hostingEvents", { params })
            .then((response) => {
                console.log(response);
                setHostingEvents(response.data);
            })
            .catch((error) => {
                console.log("error");
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
                        <MyEventCard event={event} />
                    ))}
                </div>
                <div>
                    <p class="myevents-title">Attending</p>
                    {attendingEvents.map((event) => (
                        <MyEventCard event={event} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default MyEvent;
