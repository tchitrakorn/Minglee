import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from 'moment';

const getHost = (hostId, participants) => {
    const result = participants.filter(participant => {
        if (participant.userId == hostId) {
            return participant
        }
    })
    return result[0].firstname + " " + result[0].lastname
}

function EventCard(props) {
    const [joinable, setJoinable] = useState(!props.event.participants.some(participant => participant.userId == props.userId));

    let joinText = 'Join';
    if (joinable === false) {
        joinText = 'Cancel'
    }

    /*axios.get('http://localhost:8080/events', { params })
            .then((response) => {
                let events = response.data;
                let filteredEvents = helpers.filterEvents(events, inperson, virtual, groupSize, keyword);
                setEvents(filteredEvents);
            })
            .catch((error) => {
                console.log(error);
            }); */

    const handleJoin = (e) => {
        let data = {
            userId: props.userId,
            eventId: props.event._id
        }
        if (joinable) {
            axios.post('http://localhost:8080/join', data)
                .then((response) => {
                    setJoinable(!joinable);
                })
                .catch((error) => {
                    console.log('join error: ', error);
                });
        } else {
            axios.post('http://localhost:8080/unjoin', data)
                .then((response) => {
                    setJoinable(!joinable);
                })
                .catch((error) => {
                    console.log('unjoin error: ', error);
                });
        }
    }

    return (
        <div className="event-card">
            <div class="card-title">{props.event.name}</div>
            <div>
                <p class="event-card-title">Host: </p>
                {getHost(props.event.hostId, props.event.participants)}
            </div>
            <div>
                <span class="material-icons">schedule</span>
                {moment(props.event.date).format('MMMM Do YYYY, h:mm:ss a')} {" "}
                <span class="material-icons">place</span>
                {props.event.location}{" "}
                <span class="virtual-tab">{props.event.mode}</span>
            </div>
            <div>{props.event.description}</div>
            <div class="card-corner">
                {/* <button>Join</button> */}
                <button
                    type="button"
                    onClick={handleJoin}>
                    {joinText}
                </button>
                {props.event.participants.length}/{props.event.maxSize}
            </div>
        </div>
    );
}

export default EventCard;
