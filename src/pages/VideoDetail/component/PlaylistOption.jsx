import { RxCross1 } from "react-icons/rx";

import { useDataContext } from "../../../context/data/DataContext";
import { ACTION_TYPES } from "../../../utils/actionTypes";
import { useState } from "react";

export const PlaylistOption = ({ video, setShowPlaylistOption }) => {
  const { playlist, dataDispatch } = useDataContext();
  const [input, setInput] = useState({
    name: "",
    description: "",
  });

  const filteredPlaylist = playlist.filter(
    (p) => p.videos.findIndex((v) => v._id === video._id) === -1
  );

  const handleSubmit = () => {
    if (input.name && input.description) {
      dataDispatch({
        type: ACTION_TYPES.SET_NEW_PLAYLIST,
        payload: {
          ...input,
          videos: [video],
        },
      });
      setShowPlaylistOption(false);
    }
  };
  return (
    <div className="playlist-option">
      <h4>Add To Playlist</h4>
      <input
        onChange={(e) =>
          setInput((prev) => ({ ...prev, name: e.target.value }))
        }
        type="text"
        placeholder="Enter title of your playlist"
        className="playlist-input-field"
      />
      <input
        onChange={(e) =>
          setInput((prev) => ({ ...prev, description: e.target.value }))
        }
        type="text"
        placeholder="Write a description"
        className="playlist-input-field"
      />
      <button className="button" onClick={handleSubmit}>
        Create New Playlist
      </button>
      <div className="saved-playlist-list">
        {filteredPlaylist.map((p) => (
          <div className="playlist-details" key={p._id}>
            <p
              onClick={() => {
                dataDispatch({
                  type: ACTION_TYPES.ADD_VIDEO_TO_EXISTING_PLAYLIST,
                  payload: {
                    playlistId: p._id,
                    video: video,
                  },
                });
                setShowPlaylistOption(false);
              }}
              className="p-name"
            >
              {p.name}
            </p>
            <RxCross1
              className="icon"
              onClick={() =>
                dataDispatch({ type: ACTION_TYPES.DELETE_PLAYLIST, payload: p })
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
};
