const express = require("express");
const cors = require("cors");
const { petRouter } = require("./routes/pet-routes");
const { userRouter } = require("./routes/user-routes");
const bcrypt = require("bcrypt");
const app = express();

app.use(cors());
app.use(express.json()); // puts json data on req.body
app.use(express.urlencoded({ extended: true })); // puts form data on req.body

app.use("/pet", petRouter);
app.use("/user", userRouter);

const PORT = 3001;
app.listen(PORT, () => {
  console.log("Server is listening on port", PORT);
});
