const mongoose = require('mongoose')

const borderSchema = new mongoose.Schema(
    {
        location: {
            type: { type: String },
            coordinates: []
        },
    },
    { versionKey: false }
);

borderSchema.index({ geometry: "2dsphere" });

module.exports = mongoose.model('Border', borderSchema);
