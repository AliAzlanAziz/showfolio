import { model, Schema, Types } from 'mongoose';

const waitListSchema = new Schema({
  _id: {
    type: Types.ObjectId,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  }
})

waitListSchema.pre('save', function() {
  this.email = this.email.toLocaleLowerCase();
});

const WaitList = model('WaitList', waitListSchema);

export default WaitList;