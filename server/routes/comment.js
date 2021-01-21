const express = require('express');
const router = express.Router();

const { Comment } = require("../models/Comment")


//=================================
//             comment
//=================================



router.post('/getComments',(req, res) => {

    //구독 기능 수행
    Comment.find({"postId": req.body.videoId})
      .populate('writer')
      .exec((err, comments) => {
        if(err) return res.status(400).send(err);
        res.status(200).json({success:true, comments})
      })
})

router.post('/saveComment',(req, res) => {

    const commnet = new Comment(req.body)

    //구독 기능 수행
    commnet.save((err, comment) =>{
       if(err) return res.status(400).json({success:false, err});


       Comment.find({'_id': comment._id})
        .populate('writer')
        .exec((err, result)=>{
          if(err) return res.status(400).json({success:false, err});
          res.status(200).json({success:true,result})
        })
      })
})

module.exports = router;
