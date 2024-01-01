import React, { useState, useEffect } from "react";
import axios from "axios";
import EventCard from "./EventCard.jsx";

function EventBoard(props) {
    return (
        <div class="event-wrapper">
            {props.events.map((event) => (
                <EventCard 
                    event={event}
                    userId={props.userId} />
            ))}
        </div>
    );
}

export default EventBoard;
