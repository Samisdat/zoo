const mongooseSlugPlugin = require('mongoose-slug-plugin');
const mongoose = require('mongoose')

const waySchema = new mongoose.Schema(
    {
        zooId: String,
        name:String,
        type:String,
        osmId:String,
        tags:{},
        steps: Boolean,
        location: {
            type: { type: String },
            coordinates: []
        },
        osmNodeIds: []
    },
    { versionKey: false }
);

waySchema.plugin(mongooseSlugPlugin, { tmpl: '<%=name%>' });

waySchema.index({ geometry: "2dsphere" });

module.exports = mongoose.model('Way', waySchema);
