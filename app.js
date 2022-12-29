const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { petRouter } = require("./routes/pet-routes");
const { userRouter } = require("./routes/user-routes");

const app = express();

app.use(cors());
app.use(express.json()); // puts json data on req.body
app.use(express.urlencoded({ extended: true })); // puts form data on req.body

app.use("/pet", petRouter);
app.use("/user", userRouter);

mongoose.set("strictQuery", true);
mongoose
  .connect(
    "mongodb+srv://admin:admin@cluster0.znbqpcc.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to MongoDB");
  });

const PORT = 3001;
app.listen(PORT, () => {
  console.log("Server is listening on port", PORT);
});
