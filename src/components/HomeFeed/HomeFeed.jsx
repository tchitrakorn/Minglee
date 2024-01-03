import React, { useState, useEffect, useRef } from "react";
import { Navigate, Outlet } from 'react-router-dom';
import axios from "axios";
import FilterPanel from "./FilterPanel.jsx";
import EventBoard from "./EventBoard.jsx";
import helpers from './helpers.js';

function HomeFeed(props) {
    const [events, setEvents] = useState([]);
    const [sortedEvents, setSortedEvents] = useState([]);
    const [inperson, setInperson] = useState(true);
    const [virtual, setVirtual] = useState(true);
    const [groupSize, setGroupSize] = useState(100);
    const [keyword, setKeyword] = useState('');
    const [mostRecent, setMostRecent] = useState(true);
    const [alphabetical, setAlphabetical] = useState(false);

    useEffect(() => {
        let params = {
            userId: props.userId
        };

        axios.get('http://localhost:8080/events', { params })
            .then((response) => {
                let events = response.data;
                let filteredEvents = helpers.filterEvents(events, inperson, virtual, groupSize, keyword);
                let sortedEvents = helpers.sortEvents(filteredEvents, mostRecent, alphabetical);
                setEvents(sortedEvents);
                //setSortedEvents(sortedEvents)
            })
            .catch((error) => {
                console.log(error);
            });
    });

    return (
        <div className="homefeed">
            <FilterPanel
                setInperson={setInperson}
                setVirtual={setVirtual}
                setGroupSize={setGroupSize}
                setKeyword={setKeyword}
                setMostRecent={setMostRecent}
                setAlphabetical={setAlphabetical}
                groupSize={groupSize}
                inperson={inperson}
                virtual={virtual}
                keyword={keyword}
                mostRecent={mostRecent}
                alphabetical={alphabetical}
            />

            <div className="filter-placeholder">a</div>

            <EventBoard
                events={events}
                userId={props.userId} />
        </div>
    );
}

export default HomeFeed;