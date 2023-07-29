import { GrAddCircle } from "react-icons/gr";

import { useDataContext } from "../../context/data/DataContext";
import { PlaylistCard } from "./component/PlaylistCard";

import "./playlist.layout.css";
import { useState } from "react";
import { AddPlaylistModal } from "./component/AddPlaylistModal";

export const Playlists = () => {
  const { playlist } = useDataContext();
  const[showModal,setShowModal]=useState(false);

  return (
    <div className="playlists-container">
      <h1>Playlists</h1>
      <div className="playlist-container">
        {playlist.map((p) => (
          <PlaylistCard playlist={p} key={p._id} />
        ))}
        <GrAddCircle className="add-icon" onClick={()=>setShowModal(true)}/>
      </div>
      {showModal && <AddPlaylistModal setShowModal={setShowModal}  />}
    </div>
  );
};
