const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/myApartmentApp');
mongoose.model('ApartmentsList', new Schema({}), 'apartmentsList');
var apartmentsList = mongoose.model('ApartmentsList');

//Get
router.get("/", (req, res) => {
    apartmentsList.find({}, function (err, docs) {
        if (err) {
            console.log(err);
        } else {
            res.send(docs);
            console.log(docs);
        }
    })

});

//Post
router.post("/", (req, res) => {
    let filterData = req.body.filterData;
    var conditions = {};
    
    if (filterData.roomNumbers !== '') {
        conditions['room_numbers'] = { $eq: filterData.roomNumbers }; }

    if (filterData.localization !== '') {
        conditions['localization'] = { $eq: filterData.localization };
    }

    if (filterData.priceMin !== '') {
        conditions['price'] = { $gte: filterData.priceMin};
    }   
    if (filterData.priceMax !== '') {
        conditions['price'] = { $lte: filterData.priceMax };
    }   
    if (filterData.priceMin !== '' && filterData.priceMax !== '') {
        conditions['price'] = { $gte: filterData.priceMin, $lte: filterData.priceMax };
    }   
    
    apartmentsList.find(conditions,
        function (err, docs) {
        if (err) {
            console.log(err);
        } else {
            res.send(docs);
        }
    })


});

//Export
module.exports = router;