const express = require('express');
const router = express.Router();
const { Video } = require("../models/Video");
const { Subscriber } = require("../models/Subscriber");
const { auth } = require("../middleware/auth");


// 이를 이용해서 파일을 서버로 보냄.
const multer = require("multer");
// 이를 이용해서 영상 썸네일 생성
const ffmpeg = require("fluent-ffmpeg");

// STORAGE MULTER Config
let storage = multer.diskStorage({
  // 파일을 올리는 목적지.. 저장위치
  destination: (req, file, cb) =>{
    cb(null, "uploads/");
  },
  // 날짜_파일이름 형식으로 저장됨
  filename: (req, file, cb) =>{
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  // 허용 확장자 지정
  fileFilter: (req, file, cb) =>{
    const ext = path.extname(file.originalname)
    if(ext !== '.mp4'){
      return cb(res.status(400).end('only mp4 is allowed'), false);
    }
    cb(null, true);
  }
});

const upload = multer({ storage: storage }).single("file")


//=================================
//             Video
//=================================

router.post('/getSubscriptionVideos',(req, res) => {
  //동영상 중 선별해서 가져와야하므로 props가 필요함

  //자신의 아이디를 가지고 구독한 사람들을 찾는다.
  Subscriber.find({ 'userFrom' : req.body.userFrom})
    .exec((err, subscriberInfo) => {
      if(err) return res.status(400).send(err);

      let subscribedUser = [];

      subscriberInfo.map((subscriber, i)=>{
        subscribedUser.push(subscriber.userTo);
      })
        //구독한 사람들의 비디오를 가지고 온다.
        //$in : 여러명의 정보를 가져올 수 있게함.
      Video.find({ writer: {$in :subscribedUser }})
        .populate('writer')
        .exec((err, videos) => {
            if(err) return  res.status(400).send(err);
            res.status(200).json({success: true, videos})
        })
    })



})


router.post('/getVideoDetail',(req, res) => {

    //id를 이용해 동영상 정보 가져오기
    Video.findOne({ "_id" : req.body.videoId })
    .populate('writer')
    .exec((err, video) => {
        if(err) return res.status(400).send(err);
        res.status(200).json({ success: true, video })
    })
})

router.get('/getVideos',(req, res) => {

    //비디오를 DB에서 가져와서 클라이언트에 보낸다.
    //find 로 저장된 데이터를 모두 가져온다.
    //poplulate를 통해 모든 정보를 가져옴. 아니면 id만 가져올수 있음
    Video.find()
      .populate('writer')
      .exec((err,videos) =>{
        if(err) return res.status(400).send(err);
        res.status(200).json({success:true,videos })
      })

})

router.post('/uploadfiles',(req, res) => {

    //비디오를 서버에 저장한다.
    upload(req, res, err => {
      if(err){
        return res.json({success : false, err})
      }
      // url : 파일 업로드시 저장하는 폴더 경로임.
      return res.json({success : true, url: res.req.file.path, filename: res.req.file.filename })
    })
})

router.post('/thumbnail',(req, res) => {
    //썸네일 생성하고 비디오 러닝타임도 가져오기

    //비디오 정보가져오기
    ffmpeg.ffprobe(req.body.url, function(err, metadata){
      console.log(metadata);
      console.log(metadata.format.duration);
      fileDuration = metadata.format.duration;
    });

    // body.url 비디오 저장 경로
    ffmpeg(req.body.url)
    //비디오 썸네일 파일이름
    .on('filenames', function(filenames){
      console.log('Will generate '+filenames.join(', '))
      console.log(filenames);

      filePath = "uploads/thumbnails/" + filenames[0]
    })
    .on('end', function(){
      console.log('screenshots taken')
      return res.json({success : true, url: filePath, fileDuration: fileDuration})

    })
    .on('error', function(err){
      console.log(err)
      return res.json({success : false, err});
    })
    .screenshots({
      //3개의 썸네일을 찍을수있음
      count: 3,
      //저장경로
      folder: 'uploads/thumbnails',
      size: '320x240',
      filename: 'thumbnail-%b.png'
    })

})

router.post('/uploadVideo',(req, res) => {

    //비디오를 정보들을 저장한다.
    //req.body : client로 부터 모든 정보를 가져옴
    const video = new Video(req.body)

    video.save((err, doc)=> {
      if(err) return res.json({success:false, err})
      return res.status(200).json({success:true})
    })
})

module.exports = router;
