const mongooseSlugPlugin = require('mongoose-slug-plugin');
const mongoose = require('mongoose')

const polygonSchema = new mongoose.Schema(
    {
        zooId: String,
        name:String,
        type:String,
        osmId:String,
        tags:{},
        location: {
            type: { type: String },
            coordinates: []
        },
        osmNodeIds: []
    },
    { versionKey: false }
);

polygonSchema.plugin(mongooseSlugPlugin, { tmpl: '<%=name%>' });

polygonSchema.index({ geometry: "2dsphere" });

module.exports = mongoose.model('Polygon', polygonSchema);
