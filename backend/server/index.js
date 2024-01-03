const express = require('express');
const app = express();
const port = 8080;
const mongodb = require('../database/index.js')
const connectDB = require('../database/connect.js')
const cors = require('cors');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cors({
  origin: "*",
  methods: ['GET', 'POST', 'DELETE', 'PATCH']
}))

// Establish database connection
connectDB()

// Retrieve all events
app.get('/events', (req, res) => {
  mongodb.getAllEvents()
    .then(results => res.status(200).send(results))
    .catch(error => res.status(500).send(error))
});

// Retrieve my events (both hosting and attending)
app.get('/myevents/:id', (req, res) => {
  let userId = req.params.id;
  mongodb.getMyEvents(userId)
    .then(results => res.status(200).send(results))
    .catch(error => res.status(500).send(error))
});

// Add a new event
app.post('/event', (req, res) => {
  console.log('creating an event...')
  console.log(req.body);
  mongodb.addEvent(req.body)
    .then(results => res.status(200).send(results))
    .catch(error => res.status(500).send(error));
})

// Delete an event
app.delete('/event/:id', (req, res) => {
  let eventId = req.params.id;
  mongodb.deleteEvent(eventId)
    .then(results => res.status(200).send(results))
    .catch(error => res.status(500).send(error));
})

// Join an event
app.post('/join', (req, res) => {
  let eventId = req.body.eventId;
  let userId = req.body.userId;
  mongodb.joinEvent(eventId, userId)
    .then(results => res.status(200).send(results))
    .catch(error => res.status(500).send(error));
})

// Unjoin an event
app.post('/unjoin', (req, res) => {
  let eventId = req.body.eventId;
  let userId = req.body.userId;
  mongodb.unjoinEvent(eventId, userId)
    .then(results => {
      console.log('results: ', results)
      res.status(200).send({ results })
    })
    .catch(error => res.status(500).send(error));
})

// Update an event
app.patch('/event', (req, res) => {
  mongodb.updateEvent(req.body)
    .then(results => res.status(200).send(results))
    .catch(error => res.status(500).send(error));
})

// Verify user's credentials (log-in)
app.post('/login', (req, res) => {
  console.log('logging in...')
  let email = req.body.email;
  let password = req.body.password;
  mongodb.getLoggedInUser(email, password)
    .then(results => res.status(200).send(results))
    .catch(error => res.status(500).send(error))
});

// Add a new user (sign-up)
app.post('/signup', (req, res) => {
  mongodb.addUser(req.body)
    .then(results => res.status(200).send(results))
    .catch(error => res.status(500).send(error))
});

// Retrieve a user
app.get('/user/:id', (req, res) => {
  let userId = req.params.id;
  mongodb.getUser(userId)
    .then(results => res.status(200).send(results))
    .catch(error => res.status(500).send(error))
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});