const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

console.log("Index.js loaded");

mongoose.connect("mongodb://127.0.0.1:27017/studentdb")
    .then(() => console.log("MongoDB connected to studentdb"))
    .catch(err => {
        console.error("MongoDB error:", err);
        process.exit(1);
    });

const studentRoutes = require("./routes/studentRoutes");
app.use("/students", studentRoutes);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
