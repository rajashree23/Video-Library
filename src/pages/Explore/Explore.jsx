import { useState } from "react";
import { VideoCard } from "../../component/VideoCard/VideoCard";
import { useDataContext } from "../../context/data/DataContext";

import "./explore.layout.css";

export const Explore = () => {
  const { videos } = useDataContext();
  const [input, setInput] = useState(null);
  
  const filteredVideos=input?videos.filter((video)=>video.title.toLowerCase().includes(input.toLowerCase())):videos

  return (
    <div className="explore-container">
      <h1>Explore</h1>
      <div className="input-field">
        <input
          type="text"
          placeholder="Search video by title"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>
      <div className="video-container">
        {filteredVideos.map((video) => (
          <VideoCard key={video._id} video={video} />
        ))}
      </div>
    </div>
  );
};
