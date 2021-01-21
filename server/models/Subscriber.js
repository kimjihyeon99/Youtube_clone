const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subscriberSchema = mongoose.Schema({

  userTo: {
    type: Schema.Types.ObjectId,
    ref:'User'
  },
  userFrom: {
    type: Schema.Types.ObjectId,
    ref:'User'
  },
// 만든 date 와 update한 date가 기록될 수 있음
},{timestamps:true})

const Subscriber = mongoose.model('subscriber', subscriberSchema);

module.exports = { Subscriber }
