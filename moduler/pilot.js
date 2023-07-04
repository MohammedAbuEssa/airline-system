"use strict";

const event = require("./events");
const flight = require("./manager");
const { faker } = require("@faker-js/faker");

require("./manager.js");

event.on("new-flight", (payload) => {
  setTimeout(() => {
    event.emit("took-off", payload);
    console.log(`Pilot: Flight with ID '${payload.flightID}' took off`);
  }, 4000);

  setTimeout(() => {
    event.emit("arrived", payload);
    console.log(`Pilot: Flight with ID '${payload.flightID}' has arrived`);
  }, 7000);
});

// event.on("took-off", flighEvemtListner);

// let flightDetails = {
//   event: "took_off",
//   time: faker.date.soon(),
//   Details: {
//     airLine: "Royal Jordanian Airlines",
//     destination: "Manchester, UK",
//     pilot: `${flight.pilotFirstName} ${flight.pilotSecondtName}`,
//     flightID: flight.flightId,
//   },
// };

// function flighEvemtListner(payload) {
//   setTimeout(() => {
//     console.log(
//       `Flight {
//         event: 'took_off',
//         time: ${payload.time},
//         Details: ${JSON.stringify(payload.Details)}`
//     );
//   }, 4000);
// }

// event.emit("took-off", flightDetails);
