import "./postbook.css";
import { format } from "timeago.js";

import { MoreVert } from "@mui/icons-material";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function Postbook({ postBook }) {
  const [like, setLike] = useState(postBook.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const { user: currentUser } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    setIsLiked(postBook.likes.includes(currentUser._id));
  }, [currentUser._id, postBook.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/api/user?userId=${postBook.userId}`);
      console.log(res);
      setUser(res.data);
    };
    fetchUser();
  }, [postBook.userId]);

  const likeHandler = () => {
    try {
      axios.put("/api/book/" + postBook._id + "/like", {
        userId: currentUser._id,
      });
    } catch (err) {}
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };
  return (
    <div className="postBook">
      <div className="postBookWrapper">
        <div className="postBookTop">
          <div className="postBookTopLeft">
            <Link to={`profile/${user.userName}`}>
              <img
                className="postBookProfileImg"
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "/person/noAvatar.png"
                }
                alt=""
              />
            </Link>

            <span className="postBookUsername">{user.userName}</span>
            <span className="postBookDate">{format(postBook.createdAt)}</span>
          </div>
          <div className="postBookTopRight">
            <Link to={`book/${postBook._id}`}>
              <MoreVert></MoreVert>
            </Link>
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
              //  onClick={likeHandler}
              alt=""
            />
            <span className="postBookLikeCounter">{like} people like it</span>
          </div>
          <div className="postBookBottomRight">
            {/*<span className="postBookCommentText">9 comments</span>*/}
          </div>
        </div>
      </div>
    </div>
  );
}
