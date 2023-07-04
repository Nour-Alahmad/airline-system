"use strict";

const { faker } = require("@faker-js/faker");
const { v4: uuidv4 } = require("uuid");

const events = require("./events");

require("./pilot");
require("./system");

setInterval(() => {
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
  events.emit("new-flight", flight);
}, 10000);

events.on("arrived", (flight) => {
  console.log(
    `     
    ........................................................................
    Manager: we’re greatly thankful for the amazing flight, ${flight.pilot}
    ........................................................................
    `
  );
});
