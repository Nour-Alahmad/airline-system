'use strict'

const events = require('./events');

require('./manager');
require('./system');

events.on('new-flight', (flight)=>{
    setInterval(() => {
        events.emit('took-off', flight);
        console.log(`
        ********************************************************************
        Pilot: flight with ID ${flight.flightID} took-off
        ********************************************************************
        `);

    },14000);

    setInterval(() => {
       events.emit('arrived', flight)
        console.log(`
        *********************************************************************
        Pilot: flight with ID ${flight.flightID} is arrived
        *********************************************************************
    `)
    }, 17000);
})
