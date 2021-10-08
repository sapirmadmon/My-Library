const router = require("express").Router();
const bcrypt = require("bcrypt"); //A library to help you hash passwords
const status = require("statuses");
const User = require("../models/User");

//update user
router.put("/api/user/update/:id", async(req, res) => {
    if (req.body.userId == req.params.id) {
        //update password
        if (req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            } catch (err) {
                return res.status(500).json(err);
            }
        }

        try {
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            });
            res.status(200).json("Account has been updated");
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    } else {
        return res.status(403).json("you can update only your account!");
    }
});

//delete user
router.delete("/api/user/delete/:id", async(req, res) => {
    if (req.body.userId == req.params.id) {
        try {
            const user = await User.findByIdAndDelete(req.params.id);
            res.status(200).json("Account has been deleted");
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    } else {
        return res.status(403).json("you can delete only your account!");
    }
});

//get a user
router.get("/api/user/", async(req, res) => {
    const userId = req.query.userId;
    const userName = req.query.userName;
    try {
        const user = userId ?
            await User.findById(userId) :
            await User.findOne({ userName: userName });
        const { password, updatedAt, ...other } = user._doc;
        res.header("Access-Control-Allow-Origin", "*");

        res.status(200).json(other);
    } catch (err) {
        res.status(500).json(err);
    }
});

//get friends
router.get("/api/friends/:userId", async(req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        const friends = await Promise.all(
            user.followings.map((friendId) => {
                return User.findById(friendId);
            })
        );
        let friendList = [];
        friends.map((friend) => {
            const { _id, userName, profilePicture } = friend;
            friendList.push({ _id, userName, profilePicture });
        });
        res.status(200).json(friendList);
    } catch (err) {
        res.status(500).json(err);
    }
});

//follow after user
router.put("/api/user/:id/follow", async(req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id); //Who I want to follow
            const currentUser = await User.findById(req.body.userId); //my user
            if (!user.followers.includes(req.body.userId)) {
                await currentUser.updateOne({
                    $push: { followings: req.params.id },
                });
                await user.updateOne({
                    $push: { followers: req.body.userId },
                });

                res.status(200).json("user has been followed");
            } else {
                //else we are already following the user
                res.status(403).json("you already follow this user");
            }
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        //the same user
        res.status(403).json("you cant follow yourself");
    }
});

//unfollow a user
router.put("/api/user/:id/unfollow", async(req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id); //Who I want to unfollow
            const currentUser = await User.findById(req.body.userId); //my user
            if (user.followers.includes(req.body.userId)) {
                //if we are already following the user

                await currentUser.updateOne({
                    $pull: { followings: req.params.id },
                });
                await user.updateOne({
                    $pull: { followers: req.body.userId },
                });

                res.status(200).json("user has been unfollowed");
            } else {
                res.status(403).json("you dont follow this user");
            }
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        //the same user
        res.status(403).json("you cant unfollow yourself");
    }
});
//router.get("/api/users", (req, res) => {
//    res.send("hey its user route");
//});

module.exports = router;