import "./sidebarProfile.css";
import { Favorite, Group } from "@mui/icons-material";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Add, Remove } from "@mui/icons-material";

export default function SidebarProfile({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [friends, setFriends] = useState([]);
  const [followed, setFollowed] = useState(
    currentUser.followings.includes(user?._id)
  );

  useEffect(() => {
    setFollowed(currentUser.followings.includes(user?._id));
  }, [currentUser, user._id]);

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get("/api/friends/" + user._id);
        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [user]);

  const handleClick = async () => {
    try {
      if (followed) {
        await axios.put("/api/user/" + user._id + "/unfollow", {
          userId: currentUser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put("/api/user/" + user._id + "/follow", {
          userId: currentUser._id,
        });
        dispatch({ type: "FOLLOW", payload: user._id });
      }
      setFollowed(!followed);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="profilePicture">
          <img
            className="profileImg"
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt=""
          />
        </div>
        <div className="profileInfo">
          <h3 className="profileInfoName">{user.userName}</h3>
          <span className="profileInfoDesc">{user.desc}</span>
          <span className="profileInfoCity">{user.city}</span>
        </div>

        <div className="ratingDiv">
          <img className="ratingUserImg" src="/assets/ratings/5.jpg" alt="" />
        </div>
        <div className="followButtonDiv">
          {user.userName !== currentUser.userName && (
            <button className="followButton" onClick={handleClick}>
              {followed ? "Unfollow" : "Follow"}
              {followed ? <Remove /> : <Add />}
            </button>
          )}
        </div>
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <Favorite htmlColor="red" className="sidebarIcon"></Favorite>
            <span className="sidebarListItemText">Favorites</span>
          </li>

          <li className="sidebarListItem">
            <Group className="sidebarIcon"></Group>
            <span className="sidebarListItemText">Followers</span>
          </li>
        </ul>
        <hr className="sidebarHr"></hr>
        <h4 className="followingTitle">Following</h4>
        <div className="sidebarFollowings">
          {friends.map((friend) => (
            <Link
              to={"/profile/" + friend.userName}
              style={{ textDecoration: "none" }}
            >
              <div className="followingDiv">
                <img
                  className="followingImg"
                  src={
                    friend.profilePicture
                      ? PF + friend.profilePicture
                      : PF + "person/noAvatar.png"
                  }
                  alt=""
                />
                <span className="followingName">{friend.userName}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
