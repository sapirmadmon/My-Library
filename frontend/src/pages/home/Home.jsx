import Feed from "../../components/feed/Feed";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import "./home.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";

export default function Home() {
  const [user, setUser] = useState({});
  const userName = useParams().userName;
  //const username = useParams().userName;

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/api/user?userName=${userName}`);
      setUser(res.data);
    };
    fetchUser();
  }, [userName]);

  return (
    <>
      <Topbar></Topbar>
      <div className="homeContainer">
        <Sidebar user={user}></Sidebar>
        <Feed></Feed>
      </div>
    </>
  );
}
