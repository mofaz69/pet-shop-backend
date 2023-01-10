const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const { petRouter } = require("./routes/pet-routes");
const { userRouter } = require("./routes/user-routes");

const app = express();

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

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
