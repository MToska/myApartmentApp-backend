const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const { dbURI } = require("./config/keys");
const users = require('./routes/users');
const calculator = require('./routes/calculator');
const apartmentsList = require('./routes/apartmentsList');
const comments = require('./routes/comments');
const ranking = require('./routes/ranking');
const withAuth = require('./config/middleware');
const cookieParser = require('cookie-parser');

//Connect
mongoose
    .connect(dbURI, { useNewUrlParser: true })
    .then(() => console.log('Connected to db'))
    .catch(err => console.error(`Connection Error ${err}`));

//Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

//Routes
app.use("/api/users", users);
app.use("/api/calculator", calculator);
app.use("/api/apartments", apartmentsList);
app.use("/api/ranking", ranking);
app.use("/api/comments", comments);


//Listen
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`listening at port ${port}`));