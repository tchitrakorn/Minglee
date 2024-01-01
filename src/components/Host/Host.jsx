import React, { useState, useEffect } from "react";
import axios from "axios";

function Host(props) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [groupSize, setGroupSize] = useState("");
    const [mode, setMode] = useState("in-person");
    const [invalidForm, setInvalidForm] = useState(true)

    // warning variables
    const [titleWarning, setTitleWarning] = useState("")
    const [locationWarning, setLocationWarning] = useState("")
    const [descriptionWarning, setDescriptionWarning] = useState("")
    const [timeWarning, setTimeWarning] = useState("")
    const [dateWarning, setDateWarning] = useState("")
    const [groupSizeWarning, setGroupSizeWarning] = useState("")


    useEffect(() => {
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
    })

    const handleFormSubmit = (e) => {
        e.preventDefault();
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
            })
            .catch((error) => {
                console.log("create event error: ", error);
            });
    };

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
                        value="Submit Form"
                    ></input>
                </form>
            </div>
        </div>
    );
}

export default Host;
