"use strict";
require("dotenv").config();
const port = process.env.PORT;
const ioClient = require("socket.io-client");
const link = `http://localhost:${port}/airline`;
const URL = `http://localhost:${port}`;
const nameSpaceConn = ioClient.connect(URL);
const pilotConnection = ioClient.connect(link);

nameSpaceConn.emit("get_all");
nameSpaceConn.on("schedialed", (payload) => {
  setTimeout(() => {
    pilotConnection.emit("took-off", payload);
  }, 4000);
});
nameSpaceConn.on("flight", (payload) => {
  console.log(`Sorry i didn't catch this flight ID ${payload.id}`);
  setTimeout(() => {
    pilotConnection.emit("took-off", payload);
  }, 4000);
});
nameSpaceConn.on("ArrivedM", (payload) => {
  console.log(`${payload.id} flight arrived`);
  nameSpaceConn.emit("delete", payload);
});

pilotConnection.on("tookOff", (payload) => {
  console.log(`${payload.id} flight tooked off`);
  setTimeout(() => {
    nameSpaceConn.emit("Arrived", payload);
  }, 3000);
});
