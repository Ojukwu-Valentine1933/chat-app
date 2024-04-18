const express =  require("express");
const app = express();
const cors = require("cors");

app.use(cors());//cors configuration as a global middleware

app.use(express.json());//to make your server accept and send json files



app.get("/", (req, res) => { 
    res.send("hello world!")
 });

 app.post("/login", (req, res) => {
    console.log(req.body)

    res.json({message: "Information  received"})
 })
module.exports = app;