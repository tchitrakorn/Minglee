const filterEvents = (events, inPerson, virtual, groupSize, keyword) => {
    let filteredEvents = [];
    for (let i = 0; i < events.length; i++) {
        let event = events[i];
        let filtered = false
        if (!(inPerson && event.mode === 'in-person') && !(virtual && event.mode === 'virtual')) {
            filtered = true;
        }
        if (!(event.maxSize <= parseInt(groupSize))) {
            filtered = true;
        }
        /*
        let containsKeyword = false;
        if (event.participants.some(participant => participant.userId == event.hostId && (participant.firstname.toLowerCase().includes(keyword.toLowerCase()) || participant.lastname.toLowerCase().includes(keyword.toLowerCase())))) {
            containsKeyword = true;
        }
        if (Object.values(event).some((val) => val.toString().toLowerCase().includes(keyword.toLowerCase()))) {
            containsKeyword = true;
        }
        if (!containsKeyword) {
            filtered = true;
        } */
        if (!Object.values(event).some((val) => val.toString().toLowerCase().includes(keyword.toLowerCase()))) {
            filtered = true;
        }
        if (!filtered) {
            filteredEvents.push(event);
        }
    }
    return filteredEvents;
}

module.exports = {
    filterEvents
};