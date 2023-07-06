"use strict";
// require("dotenv").config();
const port = process.env.PORT || 3006;
const io = require("socket.io-client");
let host = `http://localhost:3006`;
const socket = io.connect("http://localhost:3006");

const { faker } = require("@faker-js/faker");
const { v4: uuidv4 } = require("uuid");

setTimeout(() => {
  const flight = {
    airline: "Royal Jordanian Airlines",
    flightID: uuidv4(),
    destination: `${faker.location.city()}, ${faker.location.country()}`,
    pilot: faker.person.fullName(),
  };

  console.log(`
    *********************************************************************************
    Manager: A filght with ID ${flight.flightID} has been scheduled 
    *********************************************************************************
    
    `);
  socket.emit("new-flight", flight);
  //  socket.emit("arrived", flight);
}, 10000);


socket.on("arrived", (flight) => {
 
  console.log(
    `     
    ........................................................................
    Manager: we’re greatly thankful for the amazing flight, ${flight.pilot}
    ........................................................................
    `
  );
});
