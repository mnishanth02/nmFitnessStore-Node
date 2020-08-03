require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookioParser = require("cookie-parser");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

// DB Connection
mongoose
  .connect(process.env.DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DB CONNECTED");
  })
  .catch(() => {
    console.log("DB CONNECTION ERROR");
  });

// Middlewares
app.use(bodyParser.json());
app.use(cookioParser());
app.use(cors());

// Routes
app.use("/api", authRoutes);
app.use("/api/user", userRoutes);

// Server Start
app.listen(process.env.PORT, () => {
  console.log(`app is running at ${process.env.PORT}`);
});
