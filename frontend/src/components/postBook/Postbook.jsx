import "./postbook.css";
import { MoreVert } from "@mui/icons-material";
import { useState } from "react";
export default function Postbook() {
  const [like, setLike] = useState(0); //(post.like)
  const [isLiked, setIsLiked] = useState(false);
  const likeHandler = () => {
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };
  return (
    <div className="postBook">
      <div className="postBookWrapper">
        <div className="postBookTop">
          <div className="postBookTopLeft">
            <img
              className="postBookProfileImg"
              src="/assets/person/1.jpeg"
              alt=""
            />
            <span className="postBookUsername">my name</span>
            <span className="postBookDate">5 mins ago</span>
          </div>
          <div className="postBookTopRight">
            <MoreVert></MoreVert>
          </div>
        </div>
        <div className="postBookCenter">
          <span className="postBookText">hey its my first book </span>
          <img className="bookImg" src="assets/books/book1.jpg" alt="" />
        </div>
        <div className="postBookBottom">
          <div className="postBookBottomLeft">
            <img
              className="likeIcon"
              src="assets/like.png"
              onClick={likeHandler}
              alt=""
            />
            <img
              className="likeIcon"
              src="assets/heart.png"
              onClick={likeHandler}
              alt=""
            />
            <span className="postBookLikeCounter">{like} people like it</span>
          </div>
          <div className="postBookBottomRight">
            <span className="postBookCommentText">9 comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}
