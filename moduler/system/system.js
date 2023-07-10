"use strict";
require("dotenv").config();
// const event = require("../events");
const pilotName = require("../manager/manager");
const { faker } = require("@faker-js/faker");

const port = process.env.PORT || 3030;
const ioServer = require("socket.io")(port);

require("../manager/manager.js");
require("../pilot/pilot.js");

//New
const airline = ioServer.of("/airline");

ioServer.on("new-flight", (payload) => {
  console.log("Flight:");
  console.log({
    event: "new-flight",
    time: new Date().toLocaleString(),
    Details: payload,
  });
});

ioServer.on("took-off", (payload) => {
  console.log("Flight:");
  console.log({
    event: "took_off",
    time: new Date().toLocaleString(),
    Details: payload,
  });
});

ioServer.on("arrived", (payload) => {
  console.log("Flight:");
  console.log({
    event: "arrived",
    time: new Date().toLocaleString(),
    Details: payload,
  });
});

//New
airline.on("connection", (payload) => {
  // console.log("connected to airline system ", socket.id);
  // airline.emit("took-off", payload);
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

  ioServer.emit("new-flight", payload);
}, 10000);

// console.log(
//   `Manager: we’re greatly thankful for the amazing flight, ${pilotName.pilotFirstName} ${pilotName.pilotSecondtName}`
// );
