import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navigate, useLocation } from 'react-router-dom';
import moment from 'moment';

function Host(props) {
    // Handle data from edit
    const { state } = useLocation();

    // Set default values
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [groupSize, setGroupSize] = useState("");
    const [mode, setMode] = useState("in-person");
    const [invalidForm, setInvalidForm] = useState(true)

    // Warning variables
    const [titleWarning, setTitleWarning] = useState("")
    const [locationWarning, setLocationWarning] = useState("")
    const [descriptionWarning, setDescriptionWarning] = useState("")
    const [timeWarning, setTimeWarning] = useState("")
    const [dateWarning, setDateWarning] = useState("")
    const [groupSizeWarning, setGroupSizeWarning] = useState("")
    const [redirect, setRedirect] = useState(false)

    useEffect(() => {
        if (state) {
            updateStateFromEdit()
        }
    }, [])

    useEffect(() => {
        validateForm();
    })

    const submitFormText = state === null ? "Create Event" : "Update Event";

    const validateForm = () => {
        let valid = true
        if (description == "" || title == "" || location == "" || date == "" || time == "" || groupSize == "" || mode == "") {
            valid = false
        }
        if (parseInt(groupSize) <= 1) {
            valid = false
        }
        if (new Date(date + ' ' + time) < new Date()) {
            valid = false
        }
        if (valid) {
            setInvalidForm(false)
        }
    }

    const updateStateFromEdit = () => {
        setTitle(state.name);
        setDescription(state.description);
        setLocation(state.location);
        setDate(moment(state.date).format('YYYY-MM-DD'));
        setTime(moment(state.date).format('HH:mm:ss'));
        setGroupSize(state.maxSize);
        setMode(state.mode);
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (state) { // update an event
            let data = {
                eventId: state._id,
                name: title,
                description: description,
                location: location,
                date: new Date(date + ' ' + time),
                maxSize: groupSize,
                mode: mode,
            };
            axios
                .patch("http://localhost:8080/event", data)
                .then((response) => {
                    setTitle("");
                    setDescription("");
                    setLocation("");
                    setDate("");
                    setTime("");
                    setGroupSize("");
                    setMode("");
                    setRedirect(true);
                })
                .catch((error) => {
                    console.log("update event error: ", error);
                });
        } else { // create an event
            let data = {
                hostId: props.userId,
                name: title,
                description: description,
                location: location,
                date: new Date(date + ' ' + time),
                maxSize: groupSize,
                mode: mode,
            };
            axios
                .post("http://localhost:8080/event", data)
                .then((response) => {
                    setTitle("");
                    setDescription("");
                    setLocation("");
                    setDate("");
                    setTime("");
                    setGroupSize("");
                    setMode("");
                    setRedirect(true);
                })
                .catch((error) => {
                    console.log("create event error: ", error);
                });
        }
    };

    if (redirect) {
        return <Navigate to='/myevent' />
    }

    return (
        <div>
            <div class="form-wrapper">
                <form onSubmit={handleFormSubmit}>
                    <div class="host-title">
                        <div>
                            What kind of event would you like to host,{" "}
                            {props.userName}?
                        </div>
                    </div>
                    <div>
                        <label>
                            Title: <span className="warning-text">{titleWarning}</span>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                placeholder="Example: Movie Night"
                                value={title}
                                onChange={(e) => {
                                    setTitle(e.target.value)
                                    if (e.target.value == "") {
                                        setTitleWarning("*cannot be empty")
                                    } else {
                                        setTitleWarning("")
                                    }
                                }}
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Description: <span className="warning-text">{descriptionWarning}</span>
                            <textarea
                                rows="4"
                                cols="50"
                                id="description"
                                name="description"
                                placeholder="Example: Let's go watch Soul!"
                                value={description}
                                onChange={(e) => {
                                    setDescription(e.target.value)
                                    if (e.target.value == "") {
                                        setDescriptionWarning("*cannot be empty")
                                    } else {
                                        setDescriptionWarning("")
                                    }
                                }}
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Location: <span className="warning-text">{locationWarning}</span>
                            <input
                                type="text"
                                id="location"
                                name="location"
                                placeholder="Example: Local AMC"
                                value={location}
                                onChange={(e) => {
                                    setLocation(e.target.value)
                                    if (e.target.value == "") {
                                        setLocationWarning("*cannot be empty")
                                    } else {
                                        setLocationWarning("")
                                    }
                                }}
                            />
                        </label>
                    </div>
                    <div class="split">
                        <div>
                            <label>
                                Date: <span className="warning-text">{dateWarning}</span>
                                <input
                                    type="date"
                                    id="date"
                                    name="date"
                                    value={date}
                                    onChange={(e) => {
                                        setDate(e.target.value)
                                        if (e.target.value == "") {
                                            setDateWarning("*cannot be empty")
                                        } else if (new Date(e.target.value) <= new Date()) {
                                            setDateWarning("*cannot be in the past")
                                        } else {
                                            setDateWarning("")
                                        }
                                    }}
                                />
                            </label>
                        </div>
                        <div>
                            <label>
                                Time: <span className="warning-text">{timeWarning}</span>
                                <input
                                    type="time"
                                    id="time"
                                    name="time"
                                    value={time}
                                    onChange={(e) => {
                                        setTime(e.target.value)
                                        if (e.target.value == "") {
                                            setTimeWarning("*cannot be empty")
                                        } else {
                                            setTimeWarning("")
                                        }
                                    }}
                                />
                            </label>
                        </div>
                    </div>
                    <div>
                        <label>
                            Preferred Group Size: <span className="warning-text">{groupSizeWarning}</span>
                            <input
                                type="text"
                                id="groupSize"
                                name="groupSize"
                                value={groupSize}
                                onChange={(e) => {
                                    setGroupSize(e.target.value)
                                    if (e.target.value == "") {
                                        setGroupSizeWarning("*cannot be empty")
                                    } else if (parseInt(e.target.value) <= 1) {
                                        setGroupSizeWarning("*cannot be 1 or less")
                                    } else {
                                        setGroupSizeWarning("")
                                    }
                                }}
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Mode of Hangout:
                            <select
                                id="mode"
                                name="mode"
                                value={mode}
                                onChange={(e) => setMode(e.target.value)}
                            >
                                <option value="in-person">In-person</option>
                                <option value="virtual">Virtual</option>
                            </select>
                        </label>
                    </div>
                    <input
                        id="form-submit"
                        className="form-submit"
                        disabled={invalidForm}
                        type="submit"
                        value={submitFormText}
                    ></input>
                </form>
            </div>
        </div>
    );
}

export default Host;
