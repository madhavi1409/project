const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const authRoutes = require("./routes/authRoutes");
const app = express();
app.use(express.json());
mongoose.connect(process.env.MONGODB_URI)
.then(()=>console.log("db connected successfully"))
.catch((err)=>{console.log("unable to connect to db",err)});

app.use("/api/auth",authRoutes);
const PORT = process.env.PORT ||5001;
app.listen(PORT,()=>{
  console.log("server started at "+PORT);
});