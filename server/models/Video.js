const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const videoSchema = mongoose.Schema({

  writer:{
    // 아이디만 입력해도 user에 가서 모든 정보를 가져올 수 있기위한것
    type: Schema.Types.ObjectId,
    ref:'User'
  },
  title:{
    type: String,
    maxlength:50
  },
  description:{
    type: String
  },
  privacy:{
    type: Number
  },
  filePath:{
    type: String
  },
  category:{
    type: String
  },
  views:{
    type: Number,
    default:0
  },
  duration:{
    type: String
  },
  thumbnail:{
    type: String
  }

// 만든 date 와 update한 date가 기록될 수 있음
},{timestamps:true})

const Video = mongoose.model('Video', videoSchema);

module.exports = { Video }
