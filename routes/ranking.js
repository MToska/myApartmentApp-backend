const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/myApartmentApp');

mongoose.model('InvestmentsList', new Schema({}), 'investmentsList');
var investmentsList = mongoose.model('InvestmentsList');


//Get
router.get("/", (req, res) => {
    investmentsList.find({}).sort({ grading: -1 }).exec(function (err, docs) {
        if (err) {
            console.log(err);
        } else {
            res.send(docs);
        }
    })
});


// POST 
router.post('/', (req, res) => {
    let investmentName = req.body.investmentName;
    investmentsList.find({ 'investment_name': investmentName }).exec(function (err, docs) {
        if (err) {
            console.log(err);
        } else {
            res.send(docs);
        }
    })
});


//Export
module.exports = router;