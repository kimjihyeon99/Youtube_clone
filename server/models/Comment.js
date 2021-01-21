const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = mongoose.Schema({

  writer:{
    type: Schema.Types.ObjectId,
    ref:'User'
  },
  postId:{
    type: Schema.Types.ObjectId,
    ref:'Video'
  },
  responseTo:{
    type: Schema.Types.ObjectId,
    ref:'User'
  },
  content:{
    type:String
  },


// 만든 date 와 update한 date가 기록될 수 있음
},{timestamps:true})

const Comment = mongoose.model('Comment', commentSchema);

module.exports = { Comment }
