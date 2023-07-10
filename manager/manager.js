"use strict";
require("dotenv").config();

const { faker } = require("@faker-js/faker");

const port = process.env.PORT;
const ioClient = require("socket.io-client");
const host = `http://localhost:${port}`;
const managerConnection = ioClient.connect(host);

class details {
  constructor() {
    (this.id = faker.string.uuid()),
      (this.pilot = faker.person.fullName()),
      (this.destination = faker.location.country()),
      (this.time = faker.date.future());
  }
}
setInterval(() => {
  managerConnection.emit("new-flight", new details());
}, 10000);
managerConnection.on("schedialed", (payload) => {
  console.log(`the flight with id ${payload.id} has scadualed`);
});
managerConnection.on("ArrivedM", (payload) => {
  console.log(
    `we’re greatly thankful for the amazing flight, ${payload.pilot}.`
  );
});
