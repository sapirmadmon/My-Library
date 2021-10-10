const router = require("express").Router();
const Book = require("../models/Book");
const User = require("../models/User");

//create book
router.post("/api/book/create", async(req, res) => {
    const newBook = new Book(req.body);
    try {
        const saveBook = await newBook.save();
        res.status(200).json(saveBook);
    } catch (err) {
        res.status(500).json(err);
    }
});

//update book
router.put("/api/book/update/:id", async(req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (book.userId === req.body.userId) {
            //if is my book -> i can to update this book
            await book.updateOne({ $set: req.body });
            res.status(200).json("the book has been updated");
        } else {
            //is not my book -> i cant update this book
            res.status(403).json("you can update only your book");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

//delete book
router.delete("/api/book/delete/:id", async(req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (book.userId === req.body.userId) {
            //if is my book -> i can to delete this book
            await book.deleteOne();
            res.status(200).json("the book has been deleted");
        } else {
            //is not my book -> i cant delete this book
            res.status(403).json("you can delete only your book");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

//like/dislike book
router.put("/api/book/:id/like", async(req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book.likes.includes(req.body.userId)) {
            await book.updateOne({ $push: { likes: req.body.userId } });
            res.status(200).json("the book has been liked");
        } else {
            await book.updateOne({ $pull: { likes: req.body.userId } });
            res.status(200).json("the book has been disliked");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

//get book
router.get("/api/book/:id", async(req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        res.header("Access-Control-Allow-Origin", "*");

        res.status(200).json(book);
    } catch (err) {
        res.status(500).json(err);
    }
});

//get timeline books
router.get("/api/book/timeline/:userId", async(req, res) => {
    try {
        const currentUser = await User.findById(req.params.userId);
        const userBooks = await Book.find({ userId: currentUser._id });
        const friendBooks = await Promise.all(
            currentUser.followings.map((friendId) => {
                return Book.find({ userId: friendId });
            })
        );
        res.header("Access-Control-Allow-Origin", "*");
        res.status(200).json(userBooks.concat(...friendBooks));
    } catch (err) {
        // console.log(err);
        res.status(500).json(err);
    }
});

//get user's all books
router.get("/api/book/profile/:username", async(req, res) => {
    try {
        const user = await User.findOne({ userName: req.params.username });
        const books = await Book.find({ userId: user._id });

        res.header("Access-Control-Allow-Origin", "*");
        res.status(200).json(books);
    } catch (err) {
        // console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;