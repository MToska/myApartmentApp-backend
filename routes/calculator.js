const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();

//Get 
router.get("/", (req, res) => {
    res.send("Hello users api");
});

/* 
 * POST 
 * register users
 */
router.post('/', (req, res) => {
    const apartmentPrice = req.body.apartmentPrice;
    let agentFee = Math.round((123 * (0.02 * apartmentPrice) / 100) * 100) / 100;
    let conveyancerFee = Math.round((123 * (1010 + (0.004 * (apartmentPrice - 60000))) / 100) * 100) / 100;
    let PCCpurchase = Math.round((0.002 * apartmentPrice) * 100) / 100;
    let mortgageRegisterFeeProprietorship = Math.round(200 * 100) / 100;
    let mortgageRegisterFeeMortgage = Math.round(200 * 100) / 100;
    let finalPrice = parseInt(apartmentPrice) + agentFee + conveyancerFee + PCCpurchase + mortgageRegisterFeeProprietorship + mortgageRegisterFeeMortgage;

    let prices = {
        agentFee: agentFee,
        conveyancerFee: conveyancerFee,
        PCCpurchase: PCCpurchase,
        mortgageRegisterFeeProprietorship: mortgageRegisterFeeProprietorship,
        mortgageRegisterFeeMortgage: mortgageRegisterFeeMortgage,
        finalPrice: finalPrice
    }
    console.log(prices);
    res.send(prices);
});

//Export
module.exports = router;