const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')

//import {Controller} from "./controller/building";
//import {BuildingService} from "./service/building.service";

var building = require('./router/building.router');

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

app.use('/building', building);

module.exports = {
    app,
    initMongose
};
