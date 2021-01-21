import React , {useState} from 'react'
import Axios from 'axios';
import {Comment, Avatar, Button, Input} from 'antd';
import { useSelector } from 'react-redux';
import LikeDislikes from './LikeDislikes';

const {TextArea} = Input;

function SingleComment(props) {

const videoId = props.postId;

const user = useSelector(state => state.user);

const [OpenReply, setOpenReply] =useState(false)
const [CommentValue, setCommentValue] =useState("")



const onClickReplyOpen = () =>{
  setOpenReply(!OpenReply)
}

const onHandleChange = (event)=>{
  setCommentValue(event.currentTarget.value);
}

const onSubmit = (event) =>{
  event.preventDefault();
  // 댓글의 내용, 정보를 모아 request 보내기, responseTo 정보가 추가됨
  const variables ={
    content: CommentValue,
    writer: user.userData._id,
    postId: videoId,
    responseTo: props.comment._id
  }

  Axios.post('/api/comment/saveComment',variables)
    .then(response=>{
      if(response.data.success){
        //videoDetail Page의 comment에 업데이트 필요함
        setCommentValue("")
        setOpenReply(false)
        props.refreshFunction(response.data.result)
      }else{
        alert('커멘트를 저장하지 못했습니다.')
      }
    })

}

const actions =[
   <React.Fragment>
  <LikeDislikes comment userId={localStorage.getItem('userId')} commentId={props.comment._id} />
  <span onClick={onClickReplyOpen} key="comment-basic-reply-to">Reply to </span>
  </React.Fragment>
]

  return(
    <div>
      <Comment
        actions={actions}
        author={props.comment.writer.name}
        avatar={<Avatar src={props.comment.writer.image} alt="image"/>}
        content={<p>{props.comment.content}</p>}

      />

      {OpenReply &&
        <form style={{display: 'flex'}} onSubmit={onSubmit} >
          <TextArea
            style={{width: '100%', borderRadius:'5px' }}
            onChange={onHandleChange}
            value={CommentValue}
            placeholder="코멘트를 작성해 주세요"
            />
          <br />
            <Button style={{ width: '20%', height: '52px' }} onClick={onSubmit}>Submit</Button>

          </form>

      }

    </div>



  )
}

export default SingleComment
