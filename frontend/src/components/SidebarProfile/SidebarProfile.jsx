import "./sidebarProfile.css";
import { Favorite, Feed, Group } from "@mui/icons-material";

export default function SidebarProfile({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="profilePicture">
          <img
            className="profileImg"
            src={PF + user.profilePicture || PF + "person/noAvatar.png"}
            alt=""
          />
        </div>
        <div className="profileInfo">
          <h3 className="profileInfoName">{user.userName}</h3>
          <span className="profileInfoDesc">{user.desc}</span>
          <span className="profileInfoCity">{user.city}</span>
        </div>

        <div className="ratingDiv">
          <img
            className="ratingUserImg"
            src="/assets/ratings/rating5.jpg"
            alt=""
          />
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
          <div className="followingDiv">
            <img className="followingImg" src="/assets/person/4.jpeg" alt="" />
            <span className="followingName">John Carter</span>
          </div>
          <div className="followingDiv">
            <img className="followingImg" src="/assets/person/5.jpeg" alt="" />
            <span className="followingName">John Carter</span>
          </div>
          <div className="followingDiv">
            <img className="followingImg" src="/assets/person/6.jpeg" alt="" />
            <span className="followingName">John Carter</span>
          </div>
          <div className="followingDiv">
            <img className="followingImg" src="/assets/person/7.jpeg" alt="" />
            <span className="followingName">John Carter</span>
          </div>
          <div className="followingDiv">
            <img className="followingImg" src="/assets/person/8.jpeg" alt="" />
            <span className="followingName">John Carter</span>
          </div>
          <div className="followingDiv">
            <img className="followingImg" src="/assets/person/9.jpeg" alt="" />
            <span className="followingName">John Carter</span>
          </div>
        </div>
      </div>
    </div>
  );
}
