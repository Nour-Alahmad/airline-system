"use strict";

const port = process.env.PORT || 3006;

const ioServer = require("socket.io")(3006);
const { v4: uuidv4 } = require("uuid");

const Queue = {
  flights: {},
};

ioServer.on("connection", (socket) => {
  console.log("connected to server");

  socket.on("new-flight", (flight) => {
    ioServer.emit("new-flight", flight);

    let id = uuidv4();

    Queue.flights[id] = flight;
    console.log('Queue V1 : ', Queue);

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

  socket.on("get_all", () => {
    Object.keys(Queue.flights).forEach((id) => {
      socket.emit("flight", { id: id, filght: Queue.flights[id] });
    
    }); 
     console.log(Queue.flights);
  });

  socket.on("delete", (filght) => {
    delete Queue.flights[filght.id];
    console.log('Queue V2 : ', Queue);

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
