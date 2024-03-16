const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const server = express();

const issuesController = require("./controllers/IssuesController");

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.use(cors());
server.get("/", (req, res) => {
  res.send("Hello to the issues API");
});

server.use("/", issuesController);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
