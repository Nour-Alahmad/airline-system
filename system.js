"use strict";

const events = require("./events");

require("./manager");
require("./pilot");

events.on("new-flight", (flight) => {
  console.log(`Flight {
    event: 'new-flight',
    time:  ${new Date().toLocaleDateString()}  ${new Date().toLocaleTimeString()},
    Details: {
    airLine: ${flight.airline},
    destination: ${flight.destination},
    pilot: ${flight.pilot},
    flightID: ${flight.flightID}
}`);
});

events.on("took-off", (flight) => {
  console.log(`Flight {
        event: 'took_off',
        time:   ${new Date().toLocaleDateString()}  ${new Date().toLocaleTimeString()},
        Details: {
        airLine: ${flight.airline},
        destination: ${flight.destination},
        pilot: ${flight.pilot},
        flightID: ${flight.flightID}
    }`);
});

events.on("arrived", (flight) => {
  console.log(`Flight {
        event: 'arrived',
        time:  ${new Date().toLocaleDateString()}  ${new Date().toLocaleTimeString()},
        Details: {
        airLine: ${flight.airline},
        destination: ${flight.destination},
        pilot: ${flight.pilot},
        flightID: ${flight.flightID}
    }`);
});
