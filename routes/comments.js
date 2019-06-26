const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/myApartmentApp');
mongoose.model('InvestmentsComments', new Schema({}), 'investmentsComments');
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


//Export
module.exports = router;