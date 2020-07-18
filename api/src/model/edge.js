const mongoose = require('mongoose')

//LineString
const edgeSchema = new mongoose.Schema(
    {
        name:String,
        steps: Boolean,
        location: {
            type: { type: String },
            coordinates: []
        },
        nodes: [],
        osmNodeIds: []
    },
    { versionKey: false }
);

edgeSchema.index({ geometry: "2dsphere" });

module.exports = mongoose.model('Edge', edgeSchema);
