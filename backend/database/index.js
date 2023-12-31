const mongodb = require('mongodb');
const mongoose = require('mongoose');
const ObjectId = mongodb.ObjectId;
const connectDB = require('./connect')

const counterSchema = new mongoose.Schema({
    "_id": String,
    "sequence_value": Number
})

const Counter = mongoose.model('Counter', counterSchema);

const initializeUserIdCounter = async () => {
    const userCounter = new Counter({
        "_id": "userId",
        "sequence_value": 4
    });
    try {
        const result = await userCounter.save()
        return result
    } catch (error) {
        throw new Error(error)
    }
}

const getNextSequenceValue = async (sequenceName) => {
    const filter = { _id: sequenceName }
    const update = { $inc: { sequence_value: 1 } }
    const sequenceDocument = await Counter.findOneAndUpdate(
        filter,
        update,
        { new: true }
    )
    return sequenceDocument.sequence_value;
}

const userSchema = new mongoose.Schema({
    userId: Number,
    email: String,
    password: String,
    firstname: String,
    lastname: String
})

const User = mongoose.model('User', userSchema);

const eventSchema = new mongoose.Schema({
    hostId: Number,
    active: Boolean,
    full: Boolean,
    name: String,
    date: Date,
    location: String,
    mode: String,
    description: String,
    maxSize: Number,
    participants: [userSchema]
})

const Event = mongoose.model('Event', eventSchema);

const getAllEvents = async () => {
    try {
        return await Event.find({}, { __v: 0 });
    } catch (error) {
        throw new Error(error)
    }
}

const getMyEvents = async (userId) => {
    try {
        const hostingEvents = await Event.find({ hostId: userId }, { __v: 0 });
        const attendingEvents = await Event.find({
            hostId: {
                $ne: userId
            },
            participants: {
                $elemMatch: {
                    userId: userId
                }
            }
        }, { __v: 0 })
        const myEvents = {
            hostingEvents: hostingEvents,
            attendingEvents: attendingEvents
        }
        return myEvents
    } catch (error) {
        throw new Error(error)
    }
}

const addEvent = async (event) => {
    const result = await User.find({ userId: event.hostId.toString() }, { __v: 0 })
        .select('-password');
    const host = result[0]
    const newEvent = new Event({
        hostId: event.hostId,
        active: true,
        full: false,
        name: event.name,
        date: event.date,
        location: event.location,
        mode: event.mode,
        description: event.description,
        maxSize: event.size,
        participants: [host]
    });
    try {
        const result = await newEvent.save()
        return result
    } catch (error) {
        throw new Error(error)
    }
}

const deleteEvent = async (id) => {
    try {
        const result = await Event.deleteMany({ _id: new ObjectId(id) })
        return result
    } catch (error) {
        throw new Error(error)
    }
}

const joinEvent = async (eventId, userId) => {
    try {
        const filter = { _id: new ObjectId(eventId) }
        const newParticipant = await User.find({ userId: userId.toString() }, { __v: 0 })
        const update = {
            $push: {
                participants: newParticipant
            }
        }
        return await Event.findOneAndUpdate(
            filter,
            update,
            { new: true }
        )
    } catch (error) {
        throw new Error(error)
    }
}

const unjoinEvent = async (eventId, userId) => {
    try {
        const filter = { _id: new ObjectId(eventId) }
        const unjoinedParticipant = await User.find({ userId: userId.toString() }, { __v: 0 })
        const update = {
            $pullAll: {
                participants: unjoinedParticipant
            }
        }
        return await Event.findOneAndUpdate(
            filter,
            update,
            { new: true }
        )
    } catch (error) {
        throw new Error(error)
    }
}

const updateEvent = async (event) => {
    try {
        const filter = { _id: new ObjectId(event.eventId) }
        return await Event.findOneAndUpdate(
            filter,
            event,
            { new: true }
        )
    } catch (error) {
        throw new Error(error)
    }
}

const getLoggedInUser = async (email, password) => {
    try {
        const result = await User.find({
            email: email,
            password: password
        }, { __v: 0 }
        ).select('-password')
        if (result.length == 0) {
            throw new Error(error)
        }
        return result[0]
    } catch (error) {
        throw new Error(error)
    }
}

const addUser = async (user) => {
    const newUser = new User({
        userId: await getNextSequenceValue('userId'),
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        password: user.password
    });
    try {
        const result = await newUser.save()
        return result
    } catch (error) {
        throw new Error(error)
    }
}


module.exports.initializeUserIdCounter = initializeUserIdCounter;
module.exports.getAllEvents = getAllEvents;
module.exports.getMyEvents = getMyEvents;
module.exports.addEvent = addEvent;
module.exports.deleteEvent = deleteEvent;
module.exports.joinEvent = joinEvent;
module.exports.unjoinEvent = unjoinEvent;
module.exports.updateEvent = updateEvent;
module.exports.getLoggedInUser = getLoggedInUser;
module.exports.addUser = addUser;
