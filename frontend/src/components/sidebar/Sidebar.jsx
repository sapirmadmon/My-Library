import "./sidebar.css";
import { Favorite, Feed, Group } from "@mui/icons-material";
export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <Feed htmlColor="#F19A24" className="sidebarIcon"></Feed>
            <span className="sidebarListItemText">My Feed</span>
          </li>

          <li className="sidebarListItem">
            <Favorite htmlColor="red" className="sidebarIcon"></Favorite>
            <span className="sidebarListItemText">Favorites</span>
          </li>

          <li className="sidebarListItem">
            <Group htmlColor="#0CCC80" className="sidebarIcon"></Group>
            <span className="sidebarListItemText">Friends</span>
          </li>
        </ul>

        <hr className="sidebarHr"></hr>

        <ul className="sidebarFollowingList">
          <li className="sidebarfriend">
            <img
              src="/assets/person/2.jpeg"
              alt=""
              className="sidebarFriendImg"
            />
            <span className="sidebarFriendName">friend1213</span>
          </li>

          <li className="sidebarfriend">
            <img
              src="/assets/person/2.jpeg"
              alt=""
              className="sidebarFriendImg"
            />
            <span className="sidebarFriendName">friend1213</span>
          </li>

          <li className="sidebarfriend">
            <img
              src="/assets/person/2.jpeg"
              alt=""
              className="sidebarFriendImg"
            />
            <span className="sidebarFriendName">friend1213</span>
          </li>

          <li className="sidebarfriend">
            <img
              src="/assets/person/2.jpeg"
              alt=""
              className="sidebarFriendImg"
            />
            <span className="sidebarFriendName">friend1213</span>
          </li>

          <li className="sidebarfriend">
            <img
              src="/assets/person/2.jpeg"
              alt=""
              className="sidebarFriendImg"
            />
            <span className="sidebarFriendName">friend1213</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
