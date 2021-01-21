import React , {useEffect, useState} from 'react'
import SingleComment from './SingleComment';

function ReplyComment(props) {

  const [ChildCommentNumber, setChildCommentNumber] =useState(0)
  const [OpenReplyComments, setOpenReplyComments] =useState(false)

  useEffect(()=>{

    let commentNumber =0;

    props.commentLists.map((comment)=>{
      if(comment.responseTo === props.parentCommentId){
        commentNumber ++
      }
    })
    setChildCommentNumber(commentNumber)
  },[props.commentLists])


  // replyto 댓글이 나오는 것이므로, 부모 comment가 나올수 있도록 설정
  const renderReplyComment = (parentCommentId) =>{
    props.commentLists.map((comment, index) =>(

      <React.Fragment>
        {comment.responseTo === parentCommentId &&
          <div  style={{ width: '80%', marginLeft: '40px' }}>
          <SingleComment refreshFunction={props.refreshFunction} comment={comment} postId={props.videoId} />
          <ReplyComment  refreshFunction={props.refreshFunction} commentLists={props.commentLists}  postId={props.videoId}  parentCommentId={comment._id}/>
          </div>
        }
      </React.Fragment>
    ))
  }

  const onHandleChange = () => {
    setOpenReplyComments(!OpenReplyComments)
  }
  return(
    <div>

    {ChildCommentNumber > 0 &&
      <p style={{ fontSize: '14px', margin:0, color: 'gray'}} onClick={onHandleChange}>
        View {ChildCommentNumber} more comment(s)
      </p>
    }

    {OpenReplyComments &&
      renderReplyComment(props.parentCommentId)
    }



    </div>



  )
}

export default ReplyComment
