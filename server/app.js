// import express js
const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/userModel");
const Product = require("./models/productModels");

require("dotenv").config();
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
  .connect(process.env.MONGO_URL )
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
