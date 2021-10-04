import Postbook from "../postBook/Postbook";
import Share from "../share/Share";
import "./feed.css";

export default function Feed() {
  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share></Share>
        <div className="divRow">
          <Postbook></Postbook>
          <Postbook></Postbook>
          <Postbook></Postbook>
        </div>
        <div className="divRow">
          <Postbook></Postbook>
          <Postbook></Postbook>

          <Postbook></Postbook>
        </div>
      </div>
    </div>
  );
}
