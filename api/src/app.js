const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')

var polygonRouter = require('./router/polygon.router');

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

module.exports = {
    app,
    initMongose
};
