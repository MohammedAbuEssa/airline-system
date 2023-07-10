"use strict";
require("dotenv").config();
const port = process.env.PORT;
const ioServer = require("socket.io")(port);

let queue = {
  flights: {},
};

ioServer.on("connection", (socket) => {
  console.log(`connected with ${socket.id}`);
  socket.on("new-flight", (payload) => {
    let id = payload.id;
    queue.flights[id] = payload;
    let obj = {
      event: `new flight `,
      time: new Date(),
      id: id,
      Details: payload,
    };
    console.log(obj);
    ioServer.emit("schedialed", payload);
  });
  socket.on("delete", (payload) => {
    delete queue.flights[payload.id];
  });
  socket.on("Arrived", (payload) => {
    let obj = {
      event: `arrived `,
      time: new Date(),
      Details: payload,
    };
    console.log(obj);
    ioServer.emit("ArrivedM", payload);
  });
  socket.on("get_all", () => {
    Object.keys(queue.flights).map((id) => {
      socket.emit("flight", (id, queue.flights[id]));
      // console.log(id);
    });
  });
});

const airline = ioServer.of("/airline");

airline.on("connection", (socket) => {
  console.log(`connected the airline with ${socket.id}`);
  socket.on("took-off", (payload) => {
    let obj = {
      event: `took off`,
      time: new Date(),
      Details: payload,
    };
    console.log(obj);
    socket.emit("tookOff", payload);
  });
});
