const mongoose = require('mongoose');

const seedData = require('./seed');

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

    for(const buildingData of seedData.buidings){
        const building = new Building(buildingData);
        await building.save();
    }

};

module.exports = seed;



