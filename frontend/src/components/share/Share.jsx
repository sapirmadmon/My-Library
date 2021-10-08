import "./share.css";
import { Cancel, PhotoLibrary, Stars } from "@mui/icons-material";
import { useState, useContext, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

export default function Share() {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const title = useRef();
  const author = useRef();
  const genre = useRef();
  const summary = useRef();
  const rating = useRef();

  const [file, setFile] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    const newPostBook = {
      userId: user._id,
      name: title.current.value,
      author: author.current.value,
      summary: summary.current.value,
      genre: genre.current.value,
      rating: rating.current.value,
      //  img: "",
    };
    if (file) {
      const data = new FormData();
      const fileName = file.name; //Date.now() + file.name;
      data.append("file", file);
      data.append("name", fileName);
      newPostBook.img = fileName;
      try {
        await axios.post("/api/upload", data);
      } catch (err) {
        console.log(err);
      }
    }
    try {
      await axios.post("/api/book/create", newPostBook);
      window.location.reload();
    } catch (err) {}
  };
  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "person/noAvatar"
            }
            alt=""
            className="shareProfileImg"
          />
          <input placeholder="Title" className="shareInput" ref={title} />
          <input placeholder="Author" className="shareInput" ref={author} />
          <input placeholder="Genre" className="shareInput" ref={genre} />

          {/*TODO radio button of sale/replace/inrelevant*/}
        </div>
        <div className="shareCenter">
          <textarea
            placeholder="Summary"
            className="shareSummaryInput"
            ref={summary}
          />
        </div>
        <hr className="shareHr" />
        {file && (
          <div className="shareImgContainer">
            <img src={URL.createObjectURL(file)} className="shareImg" alt="" />
            <Cancel className="shareCancelImg" onClick={() => setFile(null)} />
          </div>
        )}
        <form className="shareBottom" onSubmit={submitHandler}>
          <div className="shareOptions">
            <label htmlFor="file" className="option">
              <PhotoLibrary htmlColor="#31C243" className="shareIcon" />
              <span className="optionText">Photo</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png, .jpeg, .jpg"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>

            <div className="option">
              <Stars htmlColor="#FFBF00" className="shareIcon" />
              <input
                type="number"
                min="1"
                max="5"
                placeholder="Rating"
                className="shareRatingInput"
                ref={rating}
              />
            </div>
          </div>

          <button className="shareButton" type="submit">
            Share
          </button>
        </form>
      </div>
    </div>
  );
}
