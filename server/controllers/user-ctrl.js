const User = require('../models/user-model');
const bcrypt = require("bcryptjs");
const passport = require("passport");
require("../passportAuth")(passport);
const axios = require('axios');

register = (req, res) => {
    User.findOne({ username: req.body.username }, async (err, doc) => {
        if (err) throw err;
        if (doc) res.send("User Already Exists");
        if (!doc) {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);

            const newUser = new User({
                username: req.body.username,
                email: req.body.email,
                password: hashedPassword,
                picture: req.body.picture,
            });
            await newUser.save();
            res.send("User Created");
        }
    });
}

loginUser = async (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) throw err;
        if (!user) res.send("No User Exists");
        else {
            req.logIn(user, (err) => {
                if (err) throw err;
                res.send("Successfully Authenticated");
                console.log(req.user);
            });
        }
    })(req, res, next);
}

getUser = async (req, res) => {
    return res.send(req.user);
}

getUserInfo = async (req, res) => {
    await User.findOne({ username: req.body.username }, (err, user) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!user) {
            return res
                .status(404)
                .json({ success: false, error: `User not found` })
        }
        return res.status(200).json({ success: true, data: user })
    }).clone().catch(err => console.log(err))
}

updateUsername = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    User.findOne({ username: req.user.username }, (err, user) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'User not found!',
            })
        }
        user.username = body.username
        user
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: user._id,
                    message: 'Username updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Username not updated!',
                })
            })
    })
}

updateEmail = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    User.findOne({ username: req.user.username }, (err, user) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'User not found!',
            })
        }
        user.email = body.email
        user
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: user._id,
                    message: 'Email updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Email not updated!',
                })
            })
    })
}

updatePassword = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    User.findOne({ username: req.user.username }, (err, user) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'User not found!',
            })
        }
        user.password = body.password
        user
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: user._id,
                    message: 'Password updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Password not updated!',
                })
            })
    })
}

updateProfilePicture = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    User.findOne({ username: req.user.username }, (err, user) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'User not found!',
            })
        }
        user.profilePicture = body.profilePicture
        user
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: user._id,
                    message: 'ProfilePicture updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'ProfilePicture not updated!',
                })
            })
    })
}

deleteUser = async (req, res) => {
    await User.findOneAndDelete({ username: req.user.username }, (err, user) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!user) {
            return res
                .status(404)
                .json({ success: false, error: `User not found` })
        }

        return res.status(200).json({ success: true, data: user })
    }).catch(err => console.log(err))
}

module.exports = {
    register,
    loginUser,
    getUser,
    getUserInfo,
    updateUsername,
    updateEmail,
    updatePassword,
    updateProfilePicture,
    deleteUser,
}
