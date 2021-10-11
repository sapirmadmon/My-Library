import "./sidebar.css";
import { Favorite, Feed, Group } from "@mui/icons-material";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { color } from "@mui/system";

export default function Sidebar({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get("/api/friends/" + currentUser._id);
        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [user]);

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <Feed htmlColor="#F19A24" className="sidebarIcon"></Feed>
            <Link
              to={"/profile/" + currentUser.userName}
              style={{ textDecoration: "none", color: "black" }}
            >
              <span className="sidebarListItemText">My Feed</span>
            </Link>
          </li>

          <li className="sidebarListItem">
            <Favorite htmlColor="red" className="sidebarIcon"></Favorite>
            <Link
              to={"/profile/" + currentUser.userName + "/favorites"}
              style={{ textDecoration: "none", color: "black" }}
            >
              <span className="sidebarListItemText">My Favorites</span>
            </Link>
          </li>

          <li className="sidebarListItem">
            <Group htmlColor="#0CCC80" className="sidebarIcon"></Group>
            <span className="sidebarListItemText">Friends</span>
          </li>
        </ul>

        <hr className="sidebarHr"></hr>

        <div className="sidebarFollowingList">
          {friends.map((friend) => (
            <Link
              to={"/profile/" + friend.userName}
              style={{ textDecoration: "none", color: "black" }}
            >
              <div className="sidebarfriend">
                <img
                  src={
                    friend.profilePicture
                      ? PF + friend.profilePicture
                      : PF + "person/noAvatar.png"
                  }
                  alt=""
                  className="sidebarFriendImg"
                />
                <span className="sidebarFriendName">{friend.userName}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
