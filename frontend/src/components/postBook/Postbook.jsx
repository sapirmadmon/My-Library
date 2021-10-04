import "./postbook.css";
import { format } from "timeago.js";

import { MoreVert } from "@mui/icons-material";
import { useState, useEffect } from "react";
import axios from "axios";
export default function Postbook({ postBook }) {
  const [like, setLike] = useState(postBook.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(
        `http://localhost:8800/api/user/${postBook.userId}`
      );
      console.log(res);
      setUser(res.data);
    };
    fetchUser();
  }, [postBook.userId]);

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
              src={user.profilePicture || PF + "/person/noAvatar.png"}
              alt=""
            />
            <span className="postBookUsername">{user.userName}</span>
            <span className="postBookDate">{format(postBook.createdAt)}</span>
          </div>
          <div className="postBookTopRight">
            <MoreVert></MoreVert>
          </div>
        </div>
        <div className="postBookCenter">
          {/*<span className="postBookText">hey its my first book </span>*/}
          <img className="bookImg" src={PF + postBook.img} alt="" />
        </div>
        <div className="postBookBottom">
          <div className="postBookBottomLeft">
            <img
              className="likeIcon"
              src={PF + "like.png"}
              onClick={likeHandler}
              alt=""
            />
            <img
              className="likeIcon"
              src={PF + "heart.png"}
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
