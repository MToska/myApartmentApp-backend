const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/myApartmentApp');
mongoose.model('InvestmentsList', new Schema({}), 'investmentsList');
var investmentsList = mongoose.model('InvestmentsList');

//Get
router.get("/", (req, res) => {
    investmentsList.find({}).sort({ grading: -1 }).exec( function (err, docs) {
        if (err) {
            console.log(err);
        } else {
            res.send(docs);
        }
    })
});


// POST 
router.post('/', (req, res) => {
    const permissionReq = req.body.permission;
    console.log(permissionReq);
});


//Export
module.exports = router;