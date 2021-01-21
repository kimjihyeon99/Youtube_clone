const express = require('express');
const router = express.Router();

const { Like } = require("../models/Like")
const { Dislike } = require("../models/Dislike")

//=================================
//             like
//=================================

router.post('/upDislike',(req, res) => {

  let variable = {}

  if(req.body.videoId){
    variable = {videoId: req.body.videoId, userId:req.body.userId}
  }else{
    variable = {commentId: req.body.commentId,userId:req.body.userId}
  }

  //disLike collection에다가 클릭정보 넣기
  const dislike = new Dislike(variable)

  dislike.save((err, dislikeResult)=>{
    if(err) return res.json({ success: false, err });
        //만약에 like 이미 클릭이 되었다면, like 1을 줄인다.

        Dislike.findOneAndDelete(variable)
          .exec((err, likeResult) =>{
            if(err)  res.status(400).json({success: false, err})
            res.status(200).json({success: true})
          })
  })


})

router.post('/unDislike',(req, res) => {

  let variable = {}

  if(req.body.videoId){
    variable = {videoId: req.body.videoId, userId:req.body.userId}
  }else{
    variable = {commentId: req.body.commentId,userId:req.body.userId}
  }
  Dislike.findOneAndDelete(variable)
    .exec((err, result)=>{
      if(err) return res.status(400).json({success:false, err})
      res.status(200).json({success: true})
    })


})

router.post('/unlike',(req, res) => {

  let variable = {}

  if(req.body.videoId){
    variable = {videoId: req.body.videoId, userId:req.body.userId}
  }else{
    variable = {commentId: req.body.commentId,userId:req.body.userId}
  }
  Like.findOneAndDelete(variable)
    .exec((err, result)=>{
      if(err) return res.status(400).json({success:false, err})
      res.status(200).json({success: true})
    })


})

router.post('/uplike',(req, res) => {

  let variable = {}

  if(req.body.videoId){
    variable = {videoId: req.body.videoId, userId:req.body.userId}
  }else{
    variable = {commentId: req.body.commentId,userId:req.body.userId}
  }

  //Like collection에다가 클릭정보 넣기
  const like = new Like(variable)

  like.save((err, likeResult)=>{
    if(err) return res.json({ success: false, err });
        //만약에 Dislike 이미 클릭이 되었다면, dislike 1을 줄인다.

        Dislike.findOneAndDelete(variable)
          .exec((err, dislikeResult) =>{
            if(err)  res.status(400).json({success: false, err})
            res.status(200).json({success: true})
          })
  })



})


router.post('/getDislikes',(req, res) => {

  let variable = {}

  if(req.body.videoId){
    variable = {videoId: req.body.videoId}
  }else{
    variable = {commentId: req.body.commentId}
  }

    //like 정보 가져오기
    Dislike.find(variable)
      .exec((err, dislikes) =>{
        if(err) return res.status(400).send(err)
        res.status(200).json({ success:true, dislikes})
      })
})

router.post('/getLikes',(req, res) => {

  let variable = {}

  if(req.body.videoId){
    variable = {videoId: req.body.videoId}
  }else{
    variable = {commentId: req.body.commentId}
  }

    //like 정보 가져오기
    Like.find(variable)
      .exec((err, likes) =>{
        if(err) return res.status(400).send(err)
        res.status(200).json({ success:true, likes})
      })
})

module.exports = router;
