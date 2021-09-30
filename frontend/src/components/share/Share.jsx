import "./share.css";
import { PhotoLibrary, Stars } from "@mui/icons-material";
export default function Share() {
  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img src="/assets/book.png" alt="" className="shareProfileImg" />
          <input placeholder="Title" className="shareInput" />
          <input placeholder="Author" className="shareInput" />
          <input placeholder="Genre" className="shareInput" />

          {/*TODO radio button of sale/replace/inrelevant*/}
        </div>
        <div className="shareCenter">
          <textarea placeholder="Summary" className="shareSummaryInput" />
        </div>
        <hr className="shareHr" />

        <div className="shareBottom">
          <div className="shareOptions">
            <div className="option">
              <PhotoLibrary htmlColor="#31C243" className="shareIcon" />
              <span className="optionText">Photo</span>
            </div>

            <div className="option">
              <Stars htmlColor="#FFBF00" className="shareIcon" />
              <input
                type="number"
                min="1"
                max="5"
                placeholder="Rating"
                className="shareRatingInput"
              />
            </div>
          </div>

          <button className="shareButton">Share</button>
        </div>
      </div>
    </div>
  );
}
