import "./profile.css";
import Feed from "../../components/feed/Feed";
import Topbar from "../../components/topbar/Topbar";
import SidebarProfile from "../../components/SidebarProfile/SidebarProfile";

export default function Profile() {
  return (
    <>
      <Topbar></Topbar>
      <div className="profile">
        <SidebarProfile />
        <Feed></Feed>
      </div>
    </>
  );
}
