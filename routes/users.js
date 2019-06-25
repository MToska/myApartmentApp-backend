const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const router = express.Router();
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const jwt_decode = require("jwt-decode");
const { Users, regValidate, logValidate } = require('../models/Users');
const passport = require('passport');
const withAuth = require('../config/middleware');
const cookieParser = require('cookie-parser');

const auth = require('../config/auth');

//Get 
router.get("/", (req, res) => {
    res.send("Hello users api");
});

router.get('/secret', withAuth, function (req, res) {
    res.send('The password is potato');
});

router.get('/checkToken', withAuth, function (req, res) {
    res.sendStatus(200);
});
/* 
 * POST 
 * register users
 */
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
/* 
 * POST 
 * Login users
 */
router.post('/login', (req, res) => {
    //Validation
    const { error } = logValidate(req.body);
    if (error) {
        return res.status(400).json({
            status: 'error',
            type: error.details[0].path[0],
            msg: error.details[0].message
        });
    }
    //Check email exist or not
    Users.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(400).json({
                        status: 'error',
                        type: "email",
                        msg: "Email is not registered"
                })
            }
            //Check password using brypt
            bcrypt.compare(req.body.password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        //Generate token using jsonwebtoken
                        const payload = {
                            email: user.email
                        };
                        const token = jwt.sign(payload, keys.secretKey, { expiresIn: 36 }); 
                        res.cookie('token', token, { httpOnly: true }).sendStatus(200);
                    } else {
                        return res.status(400).json({
                            status: 'password',
                            type: "password",
                            msg: "Password is incorrect."
                        })
                    }
                })
        });
});



router.get("/current", passport.authenticate('jwt', { session: false }), (req, res) => {
    res.send("Success you can visit this site")
});

//Export
module.exports = router;