import { MdExplore, MdPlaylistAdd, MdWatchLater, MdHome } from "react-icons/md";
import { NavLink } from "react-router-dom";

import "./leftsidebar.layout.css";

export const LeftSidebar = () => {
  const getActiveStyle = ({ isActive }) => ({
    color: isActive?"#509FCE":"black",
  });
  return (
    <div className="leftsidebar-container">
      <NavLink className="item" to="/ " style={getActiveStyle}>
        <MdHome />
        <p>Home</p>
      </NavLink>
      <NavLink className="item" style={getActiveStyle} to="/explore">
        <MdExplore />
        <p>Explore</p>
      </NavLink>
      <NavLink className="item" style={getActiveStyle} to="/playlist">
        <MdPlaylistAdd />
        <p>Playlists</p>
      </NavLink>
      <NavLink className="item" style={getActiveStyle} to="/watch-later">
        <MdWatchLater />
        <p>Watch Later</p>
      </NavLink>
    </div>
  );
};
