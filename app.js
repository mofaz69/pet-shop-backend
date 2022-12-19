const express = require("express");
const cors = require("cors");
const { petRouter } = require("./routes/pet-routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/pet", petRouter);

// app.get('/',(req,res)=>{
//     // read file
//     // send content as a response
// })

const PORT = 3001;
app.listen(PORT, () => {
  console.log("Server is listening on port", PORT);
});
