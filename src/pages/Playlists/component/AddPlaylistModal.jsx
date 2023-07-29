import { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { useDataContext } from "../../../context/data/DataContext";
import { ACTION_TYPES } from "../../../utils/actionTypes";

export const AddPlaylistModal = ({ setShowModal }) => {
  const { dataDispatch } = useDataContext();
  const [input, setInput] = useState("New Playlist");
  const handleCreateNewPlaylist = () => {
    if (input) {
      dataDispatch({ type: ACTION_TYPES.SET_NEW_PLAYLIST, payload: {
        name:input,
        description:"",
        videos:[]
      } });
      setShowModal(false);
    }
  };
  return (
    <div className="modal-container">
      <RxCross1 className="cross-icon" onClick={() => setShowModal(false)} />
      <p>Add To Playlist</p>
      <p>{input}</p>
      <input
        className="playlist-input"
        type="text"
        value={input}
        placeholder="Enter playlist name"
        onChange={(e) => setInput(e.target.value)}
      />
      <button className="button" onClick={handleCreateNewPlaylist}>
        Create New Playlist
      </button>
    </div>
  );
};
