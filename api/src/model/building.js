const mongoose = require('mongoose')

const buildingSchema = new mongoose.Schema(
    {
        name: String,
        location: {
            type: { type: String },
            coordinates: []
        },
    },
    { versionKey: false }
);

buildingSchema.index({ location: "2dsphere" });
/*
buildingSchema.set('toJSON', {
    transform: function(doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
    }
});
*/
module.exports = mongoose.model('Building', buildingSchema);
