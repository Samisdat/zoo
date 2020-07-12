const mongooseSlugPlugin = require('mongoose-slug-plugin');
const mongoose = require('mongoose')

const animalSchema = new mongoose.Schema(
    {
        class: String,
        order: String,
        family: String,
        species: String,
        wikipediaDeUrl:String
    },
    { versionKey: false }
);

animalSchema.plugin(mongooseSlugPlugin, { tmpl: '<%=species%>' });

module.exports = mongoose.model('Animal', animalSchema);
