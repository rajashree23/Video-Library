import { RxCross1 } from "react-icons/rx";
import { Link } from "react-router-dom";
import { useDataContext } from "../../../context/data/DataContext";
import { ACTION_TYPES } from "../../../utils/actionTypes";

export const PlaylistCard = ({ playlist }) => {
  const { dataDispatch } = useDataContext();
  return (
    <div className="playlist-card">
      <div className="thumbnail">
        <Link to={`/playlist/${playlist._id}`}>
          <img src={playlist.thumbnail} alt={playlist.name} />
        </Link>

        <RxCross1
          className="cross-icon"
          onClick={() =>
            dataDispatch({
              type: ACTION_TYPES.DELETE_PLAYLIST,
              payload: playlist,
            })
          }
        />
      </div>
      <p className="playlist-name">{playlist.name}</p>
      <p>{playlist.description}</p>
    </div>
  );
};
