import { Schema, model } from 'mongoose';

const subscriberSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  subscribedChannel: {
    type: String,
    required: true
  },
  subscribeDate: {
    type: Date,
    required: true,
    default: Date.now
  }
},
{ versionKey: false }
)

subscriberSchema.set('toJSON', {
  transform: function(doc: any, ret: any, options: any) {
    ret.id = ret._id;
    delete ret._id;
  }
});

module.exports = model('Subscriber', subscriberSchema)
