import { useState, useEffect, useContext } from "react";
import Topbar from "../../components/topbar/Topbar";
import "./favorites.css";
import Postbook from "../../components/postBook/Postbook";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { useParams } from "react-router";

export default function Favorites() {
  const [favoriteBook, setFavoriteBook] = useState([]);
  const { user } = useContext(AuthContext);
  const userName = useParams().userName;
  const { user: currentUser, dispatch } = useContext(AuthContext);

  useEffect(() => {
    const getFavorites = async () => {
      try {
        const user1 = await axios.get("/api/user?userName=" + userName);
        const favoriteList = await axios.get(
          "/api/favorites/" + user1.data._id
        );

        setFavoriteBook(
          favoriteList.data.sort((post1, post2) => {
            return new Date(post2.createdAt) - new Date(post1.createdAt);
          })
        );
      } catch (err) {
        console.log(err);
      }
    };
    getFavorites();
  }, [userName, user]);

  return (
    <>
      <Topbar></Topbar>
      <div className="favoritesContainer">
        <h1 className="title">Favorite Books of {userName}</h1>

        <div className="favoritesWarrper">
          <div className="postsBookDiv">
            {favoriteBook.map((p) => (
              <Postbook key={p._id} postBook={p} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
