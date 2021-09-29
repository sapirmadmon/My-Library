const router = require("express").Router();
const Book = require("../models/Book");
const User = require("../models/User");

//create book
router.post("/book/create", async(req, res) => {
    const newBook = new Book(req.body);
    try {
        const saveBook = await newBook.save();
        res.status(200).json(saveBook);
    } catch (err) {
        res.status(500).json(err);
    }
});

//update book
router.put("/book/update/:id", async(req, res) => {
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
router.delete("/book/delete/:id", async(req, res) => {
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
router.put("/book/:id/like", async(req, res) => {
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
router.get("/book/:id", async(req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        res.status(200).json(book);
    } catch (err) {
        res.status(500).json(err);
    }
});

//get timeline books
router.get("/book/timeline/all", async(req, res) => {
    try {
        const currentUser = await User.findById(req.body.userId);
        const userBooks = await Book.find({ userId: currentUser._id });
        const friendBooks = await Promise.all(
            currentUser.followings.map((friendId) => {
                return Book.find({ userId: friendId });
            })
        );
        res.json(userBooks.concat(...friendBooks));
    } catch (err) {
        // console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;