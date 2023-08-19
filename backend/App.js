const express = require("express");
const problemsRouter = require("./routes/problem");
const judgeRouter = require("./routes/judge");
const cors = require("cors");
require("./db/dbConnection");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/problems", problemsRouter);
app.use("/api/compile", judgeRouter);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
