import React from "react";
import "./showBook.css";
import { ThumbUp } from "@mui/icons-material";

export default function ShowBook({ postBook }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div className="showBook">
      <div className="showBookWrapper">
        <div className="showLeft">
          <div className="showTop">
            <div className="divTitle">
              <h1 className="showTitle"> {postBook.name}</h1>
            </div>
            <div className="divRating">
              <img
                src={PF + "ratings/" + postBook.rating + ".jpg"}
                alt=""
                className="rating"
              />
            </div>
          </div>
          <div className="showCenter">
            <h3 className="showAuthor"> {postBook.author}</h3>
            <h5 className="showGenre">{postBook.genre}</h5>
          </div>
          <hr className="shareHr" />
          <div className="showBottom">
            <span className="showSummary">{postBook.summary}</span>
          </div>
        </div>
        <div className="showRight">
          <img src={PF + postBook.img} alt="" className="showImg" />
          {/*<div className="showLikes">
            <ThumbUp fontSize="11px" />
            <span className="countLikes">{postBook.likes.length} people like this</span>
          </div>*/}
        </div>
      </div>
    </div>
  );
}
