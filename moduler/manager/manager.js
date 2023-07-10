"use strict";
require("dotenv").config();

// const event = require("../events");
// const { faker } = require("@faker-js/faker");
// const uuid = require("uuid");

const port = process.env.PORT || 3030;
const io = require("socket.io-client");
let host = `http://localhost:${port}/`;
const systemConnection = io.connect(host);

systemConnection.on("new-flight", (payload) => {
  setTimeout(() => {
    console.log(
      `Manager: new flight with ID ${payload.flightID} have been scheduled`
    );
  }, 10000);
});

// let flight = {
//   flightId: faker.string.uuid(),
//   pilotFirstName: faker.person.firstName(),
//   pilotSecondtName: faker.person.lastName(),
// };

systemConnection.on("arrived", (payload) => {
  console.log(
    `Manager: We're greatly thankful for the amazing flight, ${payload.pilot} `
  );
});

// event.emit("new-flight", flight);

// console.log(`============${flight.pilotFirstName} ${flight.pilotSecondtName}`);

// module.exports = flight;
