const mongoose = require('mongoose')

// Point
const nodeSchema = new mongoose.Schema(
    {
        name: String,
        location: {
            type: { type: String },
            coordinates: []
        },
        osmNodeId: String
    },
    { versionKey: false }
);

nodeSchema.index({ geometry: "2dsphere" });

module.exports = mongoose.model('Node', nodeSchema);
