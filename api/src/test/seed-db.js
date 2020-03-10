const mongoose = require('mongoose');

const seedData = require('./seed');

const Border = require('../model/border');
const Building = require('../model/building');

const removeAllCollections = async () => {
    const collections = Object.keys(mongoose.connection.collections)
    for (const collectionName of collections) {
        const collection = mongoose.connection.collections[collectionName]
        await collection.deleteMany({})
    }
};

const seed = async () => {

    await removeAllCollections();

    const border = new Border(seedData.border);
    await border.save();

    for(const buildingData of seedData.buidings){
        const building = new Building(buildingData);
        await building.save();
    }

};

module.exports = seed;



