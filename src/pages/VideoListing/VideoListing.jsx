import { useParams } from "react-router-dom";
import { useDataContext } from "../../context/data/DataContext";


import "./videolisting.layout.css"
import { VideoCard } from "../../component/VideoCard/VideoCard";

export const VideoListing = () => {
  const { videoCategory } = useParams();
  const { videos } = useDataContext();
  const filteredVideos = videos.filter(
    (video) => video.category === videoCategory
  );

  return (
    <div className="videolisting-container">
      <h1>{videoCategory}</h1>
      <div className="video-container">{filteredVideos.map((video)=><VideoCard video={video} key={video._id}/>)}</div>
    </div>
  );
};
