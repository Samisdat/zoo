import mongoose, { Schema } from 'mongoose';

export const BuildingSchema = new mongoose.Schema(
    {
        name: String
    },
    { versionKey: false }
);

BuildingSchema.set('toJSON', {
    transform: function(doc: any, ret: any, options: any) {
        ret.id = ret._id;
        delete ret._id;
    }
});

export const Building = mongoose.model('Building', BuildingSchema);
