const mongoose = require('mongoose');

const seedPolygons = require('../../openstreetmap/export/polygon');
const updateSeed = [];


const Polygon = require('../model/polygon');

const initMongose = async (databaseUrl) => {

    await mongoose.connect(databaseUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {console.log('mongodb started.');});

};

const removeAllCollections = async () => {
    const collections = Object.keys(mongoose.connection.collections)
    for (const collectionName of collections) {
        const collection = mongoose.connection.collections[collectionName]
        await collection.deleteMany({})
    }
};



const starting = async () => {

    await initMongose('mongodb://mongo/jest');

};



const doing = async () => {

    await removeAllCollections();

    for(const seedPolygon of seedPolygons){
        const polygon = new Polygon(seedPolygon);
        await polygon.save();

        updateSeed.push(polygon);

    }

};



const stoping = async () => {

    await mongoose.connection.close();

};

module.exports = {
    starting,
    doing,
    stoping
};

