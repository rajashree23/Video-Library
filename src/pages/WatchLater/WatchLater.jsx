import { useDataContext } from "../../context/data/DataContext";

import "./watchlater.layout.css";
import { VideoCard } from "../../component/VideoCard/VideoCard";

export const WatchLater = () => {
  const { watchLaterList } = useDataContext();
  return (
    <div className="watchlater-container">
      <h1>Watch Later</h1>
      <div className="video-container">
        {watchLaterList.length===0 &&<h2>No videos added in watchlist yet!</h2> }
        {watchLaterList.map((video) => (
          <VideoCard video={video} key={video._id} />
        ))}
      </div>
    </div>
  );
};
