import React from "react";

function MyEventCard(props) {
    return (
        <div className="my-event-card event-card">
            <div class="card-title">{props.event.title}</div>
            <div>
                <p class="event-card-title">Host: </p>
                {props.event.host}
            </div>
            <div>
                <span class="material-icons">schedule</span> 2021-10-4 6:30{" "}
                <span class="material-icons">place</span>
                {props.event.location} ({props.event.mode})
            </div>
            <div>{props.event.description}</div>

            <div class="card-corner">
                {props.event.joined}/{props.event.groupsize}
            </div>
        </div>
    );
}

export default MyEventCard;