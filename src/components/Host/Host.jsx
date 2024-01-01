import React, { useState, useEffect } from "react";
import axios from "axios";

function Host(props) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [groupSize, setGroupSize] = useState("");
    const [mode, setMode] = useState("");

    const handleFormSubmit = (e) => {
        e.preventDefault();
        let data = {
            host: props.userId,
            title: title,
            description: description,
            location: location,
            date: date,
            time: time,
            groupSize: groupSize,
            mode: mode,
        };
        axios
            .post("/formsubmit", data)
            .then((response) => {
                console.log(response);
                alert("Form successfully submitted!");
                setTitle("");
                setDescription("");
                setLocation("");
                setDate("");
                setTime("");
                setGroupSize("");
                setMode("");
            })
            .catch((error) => {
                console.log("error");
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
                            Title:
                            <input
                                type="text"
                                id="title"
                                name="title"
                                placeholder="Example: Movie Night"
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Description:
                            <textarea
                                rows="4"
                                cols="50"
                                id="description"
                                name="description"
                                placeholder="Example: Let's go watch Soul!"
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Location:
                            <input
                                type="text"
                                id="location"
                                name="location"
                                placeholder="Example: Local AMC"
                                onChange={(e) => setLocation(e.target.value)}
                            />
                        </label>
                    </div>
                    <div class="split">
                        <div>
                            <label>
                                Date:
                                <input
                                    type="date"
                                    id="date"
                                    name="date"
                                    onChange={(e) => setDate(e.target.value)}
                                />
                            </label>
                        </div>
                        <div>
                            <label>
                                Time:
                                <input
                                    type="time"
                                    id="time"
                                    name="time"
                                    onChange={(e) => setTime(e.target.value)}
                                />
                            </label>
                        </div>
                    </div>
                    <div>
                        <label>
                            Preferred Group Size:
                            <input
                                type="text"
                                id="groupSize"
                                name="groupSize"
                                onChange={(e) => setGroupSize(e.target.value)}
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
                        type="submit"
                        value="Submit Form"
                    ></input>
                </form>
            </div>
        </div>
    );
}

export default Host;
