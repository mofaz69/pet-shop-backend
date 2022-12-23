const express = require("express");
const cors = require("cors");
const { petRouter } = require("./routes/pet-routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/pet", petRouter);
//app.use("/user", userRouter);

// app.use((req, res, next) => {
//   res.status(404).send("<h1>Page not found</h1>");
// });

const PORT = 3001;
app.listen(PORT, () => {
  console.log("Server is listening on port", PORT);
});
