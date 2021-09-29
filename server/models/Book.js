const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    summary: {
        type: String,
        max: 500,
    },
    genre: {
        type: String,
        max: 10,
    },
    img: {
        type: String,
        default: "",
    },
    likes: {
        type: Array,
        default: [],
    },
    rating: {
        type: Number,
    },
    typeDelivery: {
        type: String,
        enum: ["sale", "replace", "irrelevant"],
    },
}, { timestamps: true });

module.exports = mongoose.model("Book", BookSchema);