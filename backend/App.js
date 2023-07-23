const express = require("express");
const mongoose = require("mongoose");
const problemsRouter = require("./routes/problem");
const cors = require("cors");
require("./db/dbConnection");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mount the problems router
app.use("/api/problems", problemsRouter);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
