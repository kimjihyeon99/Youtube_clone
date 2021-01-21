const express = require('express');
const router = express.Router();

const { Subscriber } = require("../models/Subscriber")


//=================================
//             Subscribe
//=================================


router.post('/subscribe',(req, res) => {

    const subscribe = new Subscriber(req.body)

    //구독 기능 수행
    subscribe.save((err, doc) =>{
       if(err) return res.status(400).json({success:false, err});
       res.status(200).json({success:true})
    })
})


router.post('/unSubscribe',(req, res) => {

    //구독 취소 기능 수행
    Subscriber.findOneAndDelete({ 'userTo': req.body.userTo, 'userFrom':req.body.userFrom})
     .exec((err, doc)=>{
       if(err) return res.status(400).json({success:false, err});
       res.status(200).json({success:true, doc})
     })
})


router.post('/subscribeNumber',(req, res) => {

    //
    Subscriber.find({ 'userTo': req.body.userTo})
     .exec((err, subscribe)=>{
       if(err) return res.status(400).send(err);
       return res.status(200).json({success:true, subscribeNumber: subscribe.length})
     })
})

router.post('/subscribed',(req, res) => {

  Subscriber.find({'userTo':req.body.userTo, 'userFrom': req.body.userFrom})
    .exec((err, subscribe)=>{
      if(err) return res.status(400).send(err);
      let result = false
      if(subscribe.length !==0){
        result= true
      }
      return res.status(200).json({success:true, subscribed: result})
    })
})

module.exports = router;
