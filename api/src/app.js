const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')

var polygonRouter = require('./router/polygon.router');
var animalRouter = require('./router/animal.router');
var wayRouter = require('./router/way.router');
//var correctRouter = require('./router/correct.router');

var app = express();

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());
app.use(express.json())

const initMongose = async (databaseUrl) => {

    await mongoose.connect(databaseUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {console.log('mongodb started.');});

};

app.use('/polygon', polygonRouter);
app.use('/animal', animalRouter);
app.use('/way', wayRouter);
//app.use('/correct', correctRouter);

module.exports = {
    app,
    initMongose
};
