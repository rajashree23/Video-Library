import { Link } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";
import { MdOutlineWatchLater, MdWatchLater } from "react-icons/md";
import { useDataContext } from "../../context/data/DataContext";
import { ACTION_TYPES } from "../../utils/actionTypes";

import "./videocard.layout.css";

export const VideoCard = ({ video, playlist }) => {
  const { watchLaterList, dataDispatch } = useDataContext();
  const isWatchLater = watchLaterList.findIndex(
    (watchLater) => watchLater._id === video._id
  );

  return (
    <div className="video-card">
      <div className="video-thumbnail">
        <Link to={`/video/${video.title}`}>
          <img src={video.thumbnail} alt={video.title} />
        </Link>
        {playlist && (
          <RxCross1
            className="cross-icon"
            onClick={() =>
              dataDispatch({
                type: ACTION_TYPES.DELETE_VIDEO_FROM_PLAYLIST,
                payload: {
                    videoId:video._id,
                    playlistId:playlist
                },
              })
            }
          />
        )}
        <div
          className="watch-later"
          onClick={() =>
            dataDispatch({ type: ACTION_TYPES.SET_WATCHLATER, payload: video })
          }
        >
          {isWatchLater === -1 ? (
            <MdOutlineWatchLater className="watch-later-icon" />
          ) : (
            <MdWatchLater className="watch-later-icon" />
          )}
        </div>
      </div>
      <div className="details-container">
        <div className="profile-pic-container">
          <img src="https://picsum.photos/200" alt="profile" />
        </div>
        <div className="details">
          <p>{video.title}</p>
          <p>{video.category}</p>
          <p className="views">
            {video.views} views | {video.creator}
          </p>
        </div>
      </div>
    </div>
  );
};
