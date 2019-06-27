const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/myApartmentApp');
mongoose.model('InvestmentsComments', new Schema({ investment_name: String, author: String, comment: String, grading: Number }), 'investmentsComments');
var investmentsComments = mongoose.model('InvestmentsComments');

// POST 
router.post('/', (req, res) => {
    let investmentName = req.body.investmentName;
    investmentsComments.find({ 'investment_name': investmentName }).exec(function (err, docs) {
        if (err) {
            console.log(err);
        } else {
            res.send(docs);
        }
    })
});

// POST 
router.post('/rating', (req, res) => {
    let investmentName = req.body.investmentName;
    investmentsComments.aggregate([
        { $match: { 'investment_name': investmentName } },
        {
            $group: {
                _id: null,
                average_grade: {
                    $avg: "$grading"
                },
            }
        }
    ]).exec(function (err, docs) {
        if (err) {
            console.log(err);
        } else {
            res.send(docs[0]);
        }
    })
});

// POST 
router.post('/add', (req, res) => {
    let investmentName = req.body.commentDetails.investmentName;
    let author = req.body.commentDetails.nameFieldValue;
    let comment = req.body.commentDetails.commentFieldValue;
    let rating = req.body.commentDetails.rating;
    var newComment = new investmentsComments({ investment_name: investmentName, author: author, comment: comment, grading: rating });
    newComment.save(function (err, book) {
        if (err) return console.error(err);
        return res.status(200).send("Komentarz dodany")
    });
});

//Export
module.exports = router;