"use strict";
// require("dotenv").config();
const port = process.env.PORT || 3006;
const io = require("socket.io-client");
let host = `http://localhost:3006`;
const airline = io.connect(`${host}/airline`);
const connection = io.connect(host);


connection.on("new-flight", (flight) => {
  setTimeout(() => {
    airline.emit("took-off", flight);
    console.log(`
        ********************************************************************
        Pilot: flight with ID ${flight.flightID} took-off
        ********************************************************************
        `);
  }, 14000);

  setTimeout(() => {
    airline.emit("arrived", flight);
    console.log(`
        *********************************************************************
        Pilot: flight with ID ${flight.flightID} is arrived
        *********************************************************************
    `);
    connection.emit("arrived", flight);

  }, 17000);

  connection.emit("get_all");

  connection.on("flight", (flight)=>{
    console.log(`Pilot:Sorry i didn't catch this flight ID ${flight.flightID}`  );
    connection.emit("delete",flight)
  })
});
