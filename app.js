const express = require("express");
const authController = require("./controllers/authController");
const protectedRoutes = require("./routes/protectedRoutes");

const app = express();
app.use(express.json());

app.post("/login", authController.login);
app.use("/protected", protectedRoutes);

module.exports = app
