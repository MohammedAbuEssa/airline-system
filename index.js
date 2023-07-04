"use strict";

const event = require("./moduler/events");
const pilotName = require("./moduler/manager");
const { faker } = require("@faker-js/faker");

require("./moduler/manager.js");
require("./moduler/pilot.js");

event.on("new-flight", (payload) => {
  console.log("Flight:");
  console.log({
    event: "new-flight",
    time: new Date().toLocaleString(),
    Details: payload,
  });
});

event.on("took-off", (payload) => {
  console.log("Flight:");
  console.log({
    event: "took_off",
    time: new Date().toLocaleString(),
    Details: payload,
  });
});

event.on("arrived", (payload) => {
  console.log("Flight:");
  console.log({
    event: "arrived",
    time: new Date().toLocaleString(),
    Details: payload,
  });
});

setInterval(() => {
  const flightID = faker.string.uuid();
  const pilotName = `${faker.person.firstName()} ${faker.person.lastName()}`;
  const destination = faker.location.city();

  const payload = {
    airLine: "Royal Jordanian Airlines",
    flightID,
    pilot: pilotName,
    destination,
  };

  event.emit("new-flight", payload);
}, 10000);

// console.log(
//   `Manager: we’re greatly thankful for the amazing flight, ${pilotName.pilotFirstName} ${pilotName.pilotSecondtName}`
// );
