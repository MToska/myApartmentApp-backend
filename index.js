const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const { dbURI } = require("./config/keys");
const users = require('./routes/users');
//Connect
mongoose
    .connect(dbURI, { useNewUrlParser: true })
    .then(() => console.log('Connected to db'))
    .catch(err => console.error(`Connection Error ${err}`));

//Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Routes
app.use("/api/users", users);
//Listen
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`listening at port ${port}`));