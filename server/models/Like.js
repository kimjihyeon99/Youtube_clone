const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const likeSchema = mongoose.Schema({

  userId:{
    type: Schema.Types.ObjectId,
    ref:'User'
  },
  commentId:{
    type: Schema.Types.ObjectId,
    ref:'Comment'
  },
  videoId:{
    type: Schema.Types.ObjectId,
    ref:'Video'
  }


// 만든 date 와 update한 date가 기록될 수 있음
},{timestamps:true})

const Like = mongoose.model('Like', likeSchema);

module.exports = { Like }
