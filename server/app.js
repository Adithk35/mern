// import express js
const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/userModel");
const Product = require("./models/productModels");

//import cors
const cors = require("cors");

// create express app using express function
const app = express();

app.use(
  cors({
    origin: true,
  }),
);
app.use(express.json());

app.use("/uploads", express.static("uploads"));

app.use("/auth", require("./routes/authenticationRoutes"));
app.use("/products", require("./routes/productsRoutes"));
app.use("/cart", require("./routes/cartRoutes"));

mongoose
  .connect(
    "mongodb://adithk3355k_db_user:RDn5yUnhNFENbzmq@ac-9eatz5z-shard-00-00.sdjwvx9.mongodb.net:27017,ac-9eatz5z-shard-00-01.sdjwvx9.mongodb.net:27017,ac-9eatz5z-shard-00-02.sdjwvx9.mongodb.net:27017/?ssl=true&replicaSet=atlas-l7k3xm-shard-0&authSource=admin&appName=Cluster0",
  )
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.log(err);
  });

// app deployed on port 8000
app.listen(8000, () => {
  console.log("Server listen on port 8000");
});
