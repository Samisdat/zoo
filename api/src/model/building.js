const mongoose = require('mongoose')

const buildingSchema = new mongoose.Schema(
    {
        name: String
    },
    { versionKey: false }
);
/*
buildingSchema.set('toJSON', {
    transform: function(doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
    }
});
*/
module.exports = mongoose.model('Building', buildingSchema);
