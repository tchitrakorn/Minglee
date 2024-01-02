import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from 'moment';
import { Navigate, useNavigate } from 'react-router-dom';
import Host from '../Host/Host.jsx';

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
    const [redirect, setRedirect] = useState(false)

    const navigate = useNavigate();

    let joinText = 'Join';
    if (joinable === false) {
        joinText = 'Unjoin'
    }

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

    const handleDelete = (e) => {
        axios.delete(`http://localhost:8080/event/${props.event._id}`)
            .then((response) => { })
            .catch((error) => {
                console.log('unjoin error: ', error);
            });
    }

    const handleEdit = (e) => {
        navigate('/host', { state: props.event });
    }

    if (redirect) {
        return <Navigate to='/host' />
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
            <div>Host's note: {props.event.description}</div>
            <div class="card-corner">
                <div>
                    {props.event.hostId == props.userId &&
                        <button
                            type="button"
                            onClick={handleDelete}>
                            Cancel
                        </button>}
                    {props.event.hostId == props.userId &&
                        <button
                            type="button"
                            onClick={handleEdit}>
                            Edit
                        </button>}
                </div>
                {props.event.hostId != props.userId &&
                    <button
                        type="button"
                        onClick={handleJoin}>
                        {joinText}
                    </button>}
                {props.event.participants.length}/{props.event.maxSize}
            </div>
        </div>
    );
}

export default EventCard;
