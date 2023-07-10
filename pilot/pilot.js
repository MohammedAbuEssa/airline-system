"use strict";

require("dotenv").config();
const port = process.env.PORT;
const ioClient = require("socket.io-client");
const link = `http://localhost:${port}/airline`;
const URL = `http://localhost:${port}`;
const nameSpaceconn = ioClient.connect(URL);
const pilotConnection = ioClient.connect(link);

nameSpaceconn.on("schedialed", (payload) => {
  setTimeout(() => {
    pilotConnection.emit("took-off", payload);
  }, 4000);
});
nameSpaceconn.on("ArrivedM", (payload) => {
  console.log(`${payload.id} flight arrived`);
});

pilotConnection.on("tookOff", (payload) => {
  console.log(`${payload.id} flight tooked off`);
  setTimeout(() => {
    nameSpaceconn.emit("Arrived", payload);
  }, 3000);
});
