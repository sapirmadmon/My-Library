const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt"); //A library to help you hash passwords

//register user
router.post("/register", async(req, res) => {
    try {
        //generate new password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        //create new user
        const newUser = await new User({
            userName: req.body.userName,
            email: req.body.email,
            password: hashPassword,
        });

        //save user and return response
        const user = await newUser.save();
        res.status(200).json(user); //or send(user);
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
});

//login user
router.post("/login", async(req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            res.status(404).json("email user not found");
        }

        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if (!validPassword) {
            res.status(404).json("wrong password!");
        }

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
});

module.exports = router;