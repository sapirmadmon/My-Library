import "./profile.css";
import Feed from "../../components/feed/Feed";
import Topbar from "../../components/topbar/Topbar";
import SidebarProfile from "../../components/SidebarProfile/SidebarProfile";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";

export default function Profile() {
  const [user, setUser] = useState({});
  const userName = useParams().userName;
  //const username = useParams().userName;

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/api/user?userName=${userName}`);
      console.log(res);
      setUser(res.data);
    };
    fetchUser();
  }, [userName]);

  return (
    <>
      <Topbar></Topbar>
      <div className="profile">
        <SidebarProfile user={user} />
        <Feed userName={userName}></Feed>
      </div>
    </>
  );
}
