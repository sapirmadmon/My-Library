const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const multer = require("multer");
const path = require("path");
// app config
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const bookRoute = require("./routes/books");

dotenv.config();
// db config
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true }, () => {
    console.log("connected to mongoDB");
});

app.use("/images", express.static(path.join(__dirname, "public/images")));

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); //req.body.name - NOT WORK
    },
});

const upload = multer({ storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
    try {
        return res.status(200).json("file uploaded successfully!");
    } catch (err) {
        console.log(err);
    }
});

app.use((req, res, next) => next(), userRoute);
app.use((req, res, next) => next(), authRoute);
app.use((req, res, next) => next(), bookRoute);

app.listen(8800, () => {
    console.log("backend server is running!");
});