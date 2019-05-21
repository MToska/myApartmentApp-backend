const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const router = express.Router();
const { Users, regValidate } = require('../models/Users');

//Get 
router.get("/", (req, res) => {
    res.send("Hello users api");
});

// POST register users
router.post('/register', (req, res) => {
    //Validation
    const { error } = regValidate(req.body);
    if (error) {
        return res.status(400).json({
            status: 'error',
            type: error.details[0].path[0],
            msg: error.details[0].message
        });
    }
    //New Object
    const newUser = new Users({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });
    //Check email is registered already ?
    Users.findOne({ email: req.body.email }).then(emailMatch => {
        if (emailMatch) {
            return res.status(400).json({
                status: 'error',
                type: "email",
                msg: "Email is already registered"
            });
        }
        //Check username is taken ?
        Users.findOne({ username: req.body.username }).then(username => {
            if (username) {
                return res.status(400).json({
                    status: 'error',
                    type: "username",
                    msg: "Username is already registered"
                });
            }
            //Hash the password
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    //Saving to db
                    newUser
                        .save()
                        .then((post) => res.json(post))
                        .catch(err => console.error(err));
                });
            });
        });
    });
});

//Export
module.exports = router;