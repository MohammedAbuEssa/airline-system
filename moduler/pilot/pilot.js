"use strict";
require("dotenv").config();

// const event = require("../events");
// const flight = require("../manager/manager");
// const { faker } = require("@faker-js/faker");

require("../manager/manager.js");
require("../system/system.js");

const port = process.env.PORT || 3030;
const io = require("socket.io-client");
let host = `http://localhost:${port}/airline`;
const systemConnection = io.connect(host);

systemConnection.on("new-flight", (payload) => {
  setTimeout(() => {
    systemConnection.emit("took-off", payload);
    console.log(`Pilot: Flight with ID '${payload.flightID}' took off`);
  }, 4000);

  setTimeout(() => {
    systemConnection.emit("arrived", payload);
    console.log(`Pilot: Flight with ID '${payload.flightID}' has arrived`);
  }, 3000);
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
