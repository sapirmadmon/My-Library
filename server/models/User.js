const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        min: 3,
        max: 20,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        max: 50,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        min: 6,
    },
    profilePicture: {
        type: String,
        default: "",
    },
    userRating: {
        type: Number,
        required: false,
    },

    //People who follow me
    followers: {
        type: Array,
        default: [],
    },
    //people I followings
    followings: {
        type: Array,
        default: [],
    },
    desc: {
        type: String,
        max: 50,
        default: "",
    },
    city: {
        type: String,
        max: 50,
    },
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);