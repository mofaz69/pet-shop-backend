require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const { petRouter } = require("./routes/pet-routes");
const { userRouter } = require("./routes/user-routes");

const app = express();

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true })); // parses formData, and places it on req.body

app.use(express.static(path.join(__dirname)));

app.use("/pet", petRouter);
app.use("/user", userRouter);

mongoose.set("strictQuery", true);

mongoose.connection.on("error", (err) => console.error(err));
mongoose.connection.once("open", () => console.log("Connected to MongoDB"));

mongoose.connect(process.env.MONGO_URI);

const PORT =
  process.env.STATUS === "production"
    ? process.env.PROD_PORT
    : process.env.DEV_PORT;
app.listen(PORT, () => {
  console.log(
    `Server in ${process.env.STATUS} mode, listening on port:${PORT}`
  );
});
