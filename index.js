const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const serverless = require("serverless-http");
require("dotenv").config();

const routes = require("./src/routes");

const app = express();

app.use(cors());
app.use(morgan(":method :url :status :user-agent - :response-time ms"));
app.use(bodyParser.json());

app.use("/", routes);

// For dev
// app.listen(process.env.PORT || 8000, async function () {
//   await mongoose.connect(process.env.DB_URL);
//   console.log("Express app running on port " + (process.env.PORT || 8000));
// });

// For production
(async () => {
  await mongoose.connect(process.env.DB_URL);
})();
module.exports.handler = serverless(app);
