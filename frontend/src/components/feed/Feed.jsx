import { useState, useEffect } from "react";
import Postbook from "../postBook/Postbook";
import Share from "../share/Share";
import "./feed.css";
import axios from "axios";

export default function Feed({ userName }) {
  const [postsBook, setPostsBook] = useState([]);

  useEffect(() => {
    const fetchPostsBook = async () => {
      const res = userName
        ? await axios.get("/api/book/profile/" + userName)
        : await axios.get("/api/book/timeline/6154895dd029eb32f7dd4529");
      setPostsBook(res.data);
    };
    fetchPostsBook();
  }, [userName]);

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
