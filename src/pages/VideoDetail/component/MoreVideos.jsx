import { Link } from "react-router-dom";

export const MoreVideos = ({ video }) => {
  return (
    <Link className="video-card" to={`/video/${video.title}`}>
      <div>
        <img src={video.thumbnail} alt={video.title} />
      </div>

      <div className="detail">
        <p className="title">{video.title}</p>
        <p>{video.creator}</p>
      </div>
    </Link>
  );
};
