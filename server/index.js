const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");

// app config
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const bookRoute = require("./routes/books");

dotenv.config();
// db config
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true }, () => {
    console.log("connected to mongoDB");
});

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use((req, res, next) => next(), userRoute);
app.use((req, res, next) => next(), authRoute);
app.use((req, res, next) => next(), bookRoute);

app.listen(8800, () => {
    console.log("backend server is running!");
});