require("dotenv").config();
const express = require("express");
const cors = require("cors"); //npm

const userRouter = require("./server/api/users/user.router");
const app = express();
const pool = require("./server/config/database");

const port = process.env.PORT;
// const { CleaningServices } = require("@mui/icons-material");
// const questionRouter = require("./server/api/question/question.router");
// const answerRouter = require("./server/api/answer/answer.router");

app.use(cors()); //middle ware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/users", userRouter);
// app.use("/api/question", questionRouter);
// app.use("/api/answer", answerRouter);

app.listen(port, () => console.log(`Listening at http://localhost:${port}`)); //p
