const express = require("express");
const driverRouter = require ("./routes/driver.routes");
const teamRouter = require("./routes/team.routes");
const morgan = require("morgan");
const cors = require("cors");

const server = express();

server.use(morgan("dev"));
server.use(express.json());
server.use(cors());

server.use(driverRouter)
server.use(teamRouter)

module.exports = server;
