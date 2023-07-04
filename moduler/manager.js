"use strict";

const event = require("./events");
// const { faker } = require("@faker-js/faker");
// const uuid = require("uuid");

event.on("new-flight", (payload) => {
  console.log(
    `Manager: new flight with ID ${payload.flightID} have been scheduled`
  );
});

// let flight = {
//   flightId: faker.string.uuid(),
//   pilotFirstName: faker.person.firstName(),
//   pilotSecondtName: faker.person.lastName(),
// };

event.on("arrived", (payload) => {
  console.log(
    `Manager: We're greatly thankful for the amazing flight, ${payload.pilot} `
  );
});

// event.emit("new-flight", flight);

// console.log(`============${flight.pilotFirstName} ${flight.pilotSecondtName}`);

// module.exports = flight;
