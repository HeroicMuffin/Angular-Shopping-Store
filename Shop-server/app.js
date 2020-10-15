global.config = require("./config.json")
const express = require("express");
const cors = require("cors");
const controller = require("./Controllers/controller");
const { connect } = require("./data-access-layer/dal");

const server = express();

server.use(cors());
server.use(express.json());
server.use("/api/users", controller);



server.listen(3000, async () => {
    console.log("listening on http://localhost:3000")
    connect().then(db => {
        console.log("mongo service started ")
    })

})



