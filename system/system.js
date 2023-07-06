"use strict";

const port = process.env.PORT || 3006;

const ioServer = require("socket.io")(3006);

ioServer.on("connection", (socket) => {
  console.log("connected to server");

  socket.on("new-flight", (flight) => {
    ioServer.emit("new-flight", flight);
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

  socket.on("arrived", (flight) => {
    ioServer.emit("arrived", flight);
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
});

//namespace
const airline = ioServer.of("/airline");

airline.on("connection", (socket) => {
  socket.on("took-off", (flight) => {
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
});
