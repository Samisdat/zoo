import mongoose, { Schema } from 'mongoose';

export const EnclosureSchema = new mongoose.Schema(
    {
        name: String,
        building:{type: Schema.Types.ObjectId, ref: 'Building'}
    },
    { versionKey: false }
);

EnclosureSchema.set('toJSON', {
    transform: function(doc: any, ret: any, options: any) {
        ret.id = ret._id;
        delete ret._id;
    }
});

export const Enclosure = mongoose.model('Enclosure', EnclosureSchema);
