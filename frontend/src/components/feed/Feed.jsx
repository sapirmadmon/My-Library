import { useState, useEffect, useContext } from "react";
import Postbook from "../postBook/Postbook";
import Share from "../share/Share";
import "./feed.css";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

export default function Feed({ userName }) {
  const [postsBook, setPostsBook] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPostsBook = async () => {
      const res = userName
        ? await axios.get("/api/book/profile/" + userName)
        : await axios.get("/api/book/timeline/" + user._id);
      setPostsBook(
        res.data.sort((post1, post2) => {
          return new Date(post2.createdAt) - new Date(post1.createdAt);
        })
      );
    };
    fetchPostsBook();
  }, [userName, user._id]);

  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share></Share>
        <div className="postsBookDiv">
          {postsBook.map((p) => (
            <Postbook key={p._id} postBook={p} />
          ))}
        </div>

        {/*<div className="divRow">
          <Postbook></Postbook>
          <Postbook></Postbook>
          <Postbook></Postbook>
        </div>
        <div className="divRow">
          <Postbook></Postbook>
          <Postbook></Postbook>

          <Postbook></Postbook>
        </div>*/}
      </div>
    </div>
  );
}
