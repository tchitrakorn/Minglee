import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from 'moment';
import { Navigate, useNavigate } from 'react-router-dom';
import Host from '../Host/Host.jsx';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const getHost = (hostId, participants) => {
    const result = participants.filter(participant => {
        if (participant.userId == hostId) {
            return participant
        }
    })
    return result[0]
}

const getFullname = (user) => {
    return user.firstname + ' ' + user.lastname;
}

function EventCard(props) {
    let [joinable, setJoinable] = useState(props.event.participants.length != props.event.maxSize && !props.event.participants.some(participant => participant.userId == props.userId));
    const [redirect, setRedirect] = useState(false)
    const navigate = useNavigate();
    console.log(props.event.name)
    console.log(props.event.participants.length != props.event.maxSize)
    console.log(!props.event.participants.some(participant => participant.userId == props.userId))
    console.log(joinable)
    let joinText = 'Join';
    if (joinable === false) {
        //if (props.event.participants.length == props.event.maxSize || props.event.participants.some(participant => participant.userId == props.userId)) {
        if (props.event.participants.length == props.event.maxSize && !props.event.participants.some(participant => participant.userId == props.userId)) {
            joinText = 'Full'
        }
        else {
            joinText = 'Unjoin'
        }
    }



    const handleJoin = (e) => {
        let data = {
            userId: props.userId,
            eventId: props.event._id
        }
        if (joinable) {
            console.log('joinging...')
            axios.post('http://localhost:8080/join', data)
                .then((response) => {
                    setJoinable(!joinable);
                })
                .catch((error) => {
                    console.log('join error: ', error);
                });
        } else {
            console.log('unjoinging...')
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
            <div className="event-card-details">
                <span className="card-title">{props.event.name}</span>
                {props.event.hostId == props.userId &&
                    <span class="material-icons clickable edit-icon" onClick={handleEdit}>mode</span>}
            </div>
            <div>
                <div className="event-card-details">
                    <span class="material-icons">person</span>
                    <Popup trigger=
                        {<span className="host-name">{getFullname(getHost(props.event.hostId, props.event.participants))}</span>}
                        position="right center">
                        <div className="user-detail">
                            <div className="event-card-details">Contact Info:</div>
                            <div className="event-card-details">
                                <span class="material-icons">email</span>
                                {getHost(props.event.hostId, props.event.participants).email}
                            </div>
                            <div className="event-card-details">
                                <span class="material-icons">phone</span>
                                {getHost(props.event.hostId, props.event.participants).phone}
                            </div>
                            <div className="event-card-details">
                                <span class="material-icons">discord</span>
                                {getHost(props.event.hostId, props.event.participants).discord}
                            </div>
                        </div>
                    </Popup>
                </div>
                <div className="event-card-details">
                    <span class="material-icons">schedule</span>
                    {moment(props.event.date).format('MMMM Do YYYY, h:mm a')} {" "}
                </div>
                <div className="event-card-details">
                    <span class="material-icons">place</span> {" "}
                    <a href={props.event.url} target="_blank">{props.event.location}</a>{" "}
                </div>
                <div className="event-card-details">
                    <span class="material-icons">computer</span> {" "}
                    <span class="virtual-tab">{props.event.mode}</span>
                </div>
                <div className="event-card-details">
                    <span class="material-icons">notes</span> {" "}
                    "{props.event.description}"
                </div>
            </div>
            <div class="card-corner">
                <div>
                    {props.event.hostId == props.userId &&
                        <button
                            type="button"
                            onClick={handleDelete}>
                            Cancel
                        </button>}
                </div>
                {props.event.hostId != props.userId &&
                    <button
                        type="button"
                        //disabled={(!joinable &&!props.event.participants.some(participant => participant.userId == props.userId) || (joinable && props.event.participants.length == props.event.maxSize))}
                        disabled={joinText == "Full"}
                        onClick={handleJoin}>
                        {joinText}
                    </button>}
                {props.event.participants.length}/{props.event.maxSize}
            </div>
        </div>
    );
}

export default EventCard;
