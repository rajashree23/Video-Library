import { useParams } from "react-router-dom";

import { useDataContext } from "../../context/data/DataContext";
import { VideoCard } from "../../component/VideoCard/VideoCard";

import "./playlistmusicvideos.layout.css";

export const PlaylistMusicVideos = () => {
  const { playlist } = useDataContext();
  const { playlistId } = useParams();
  const findPlaylist = playlist.find((p) => p._id.toString() === playlistId);
  return (
    <div className="music-videos-container">
      <h1>Music Videos</h1>
      <div className="video-container">
        {findPlaylist.videos.length===0 &&<h2>No videos saved in this playlist yet!</h2>}
        {findPlaylist.videos.map((video) => (
          <VideoCard video={video} key={video._id} playlist={findPlaylist._id} />
        ))}
      </div>
    </div>
  );
};
