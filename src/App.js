import { Routes, Route } from "react-router-dom";
import { LeftSidebar } from "./component/LeftSidebar/LeftSidebar";
import { Homepage } from "./pages/Homepage/Homepage";
import { VideoListing } from "./pages/VideoListing/VideoListing";
import { WatchLater } from "./pages/WatchLater/WatchLater";
import { VideoDetail } from "./pages/VideoDetail/VideoDetail";
import { Explore } from "./pages/Explore/Explore";
import { Playlists } from "./pages/Playlists/Playlists";
import { PlaylistMusicVideos } from "./pages/PlaylistMusicVideos/PlaylistMusicVideos";


function App() {
  return (
    <div className="main-container">
      <LeftSidebar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/:videoCategory" element={<VideoListing />} />
        <Route path="/watch-later" element={<WatchLater />} />
        <Route path="/video/:videoTitle" element={<VideoDetail />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/playlist" element={<Playlists />} />
        <Route path="/playlist/:playlistId" element={<PlaylistMusicVideos />} />
      </Routes>
    </div>
  );
}

export default App;
