const mongoose = require('mongoose')

const polygonSchema = new mongoose.Schema(
    {
        name:String,
        type:String,
        osmId:String,
        location: {
            type: { type: String },
            coordinates: []
        },
        osmNodeIds: []
    },
    { versionKey: false }
);

polygonSchema.index({ geometry: "2dsphere" });

module.exports = mongoose.model('Polygon', polygonSchema);
