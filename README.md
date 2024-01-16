# Minglee
Ready to mingle but still worried about COVID? Minglee creates an inclusive hangout space, connecting folks both in-person and virtually! With Minglee, you can host, attend, and monitor all your events!

## Getting Started...
We're excited to share Minglee with you! If you would like to check out Minglee, feel free to download or clone our source code. Go to your terminal (and make sure that you're in the right directory) and enter the following commands:

1. `npm install` to download all the necessary dependencies
2. `npm start` to start the frontend app (runs locally on http://localhost:3000/)
3. `npm run server-dev` to start the server (runs locally on http://localhost:8080/)

Please also make sure that you have MongoDB installed! If you would like to use our dummy data, please see the following section.

## Importing dummy data into your local MongoDB database
* In a separate terminal, run the following commands line by line:
```
mongoimport --db mingleedb --collection users --file ./backend/data/users.json --jsonArray
mongoimport --db mingleedb --collection events --file ./backend/data/events.json --jsonArray
```

## Logging In
To log-in, feel free to use any of the users' credentials. If you would like to log-in as Tattie and Faustina (Yes, it's us, Mingly developers!), please use the following credentials:
- "tc3117@columbia.edu" (email) and "abc123" (password)

## Dependencies and tools
Minglee primarily uses:
* React
* Express.js
* Node.js
* MongoDB
* Axios
* React Hooks
* React-Router-Dom

## Contributor
* Tattie Chitrakorn <a href="https://github.com/tchitrakorn">@tchitrakorn</a>
