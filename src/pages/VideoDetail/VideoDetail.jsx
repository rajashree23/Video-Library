import { useParams } from "react-router-dom";
import {
  MdPlaylistAdd,
  MdEditNote,
  MdWatchLater,
  MdOutlineWatchLater,
  MdDelete,
} from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import { useDataContext } from "../../context/data/DataContext";
import { MoreVideos } from "./component/MoreVideos";

import "./videodetail.layout.css";
import { ACTION_TYPES } from "../../utils/actionTypes";
import { useState } from "react";
import { PlaylistOption } from "./component/PlaylistOption";
import { NewNote } from "./component/NewNote";

export const VideoDetail = () => {
  const { videos, watchLaterList, dataDispatch, notes } = useDataContext();
  const [updatedNote, setUpdatedNote] = useState("");
  const { videoTitle } = useParams();
  const [edit, setShowEdit] = useState({
    show: false,
    _id: null,
  });
  const [showPlaylistOption, setShowPlaylistOption] = useState(false);
  const [showAddNewNoteOption, setShowAddNewNoteOption] = useState(false);
  const findVideo = videos.find((video) => video.title === videoTitle);
  const isWatchLater = watchLaterList.findIndex(
    (watchLater) => watchLater._id === findVideo._id
  );

  const findNotesByVideo = notes.find((n) => n.videoId === findVideo._id);
  const handleUpdate = (note) => {
    setShowEdit(false);
    dataDispatch({
      type: ACTION_TYPES.EDIT_NOTE,
      payload: { videoId: findVideo._id, note: note,updatedNote:updatedNote },
    });
  };

  return (
    <div className="video-detail-container">
      <div className="single-video">
        <iframe
          width="100%"
          height="480"
          src={findVideo.src}
          title={videoTitle}
          frameborder="0"
          allowfullscreen
        ></iframe>
        <div className="actions">
          <div className="details">
            <div className="profile-pic-container">
              <img src="https://picsum.photos/200" alt="profile-pic" />
            </div>
            <div>
              <p className="title">{findVideo.title}</p>
            </div>
          </div>
          <div className="action-icons">
            {isWatchLater === -1 ? (
              <MdOutlineWatchLater
                className="icon"
                onClick={() =>
                  dataDispatch({
                    type: ACTION_TYPES.SET_WATCHLATER,
                    payload: findVideo,
                  })
                }
              />
            ) : (
              <MdWatchLater
                className="icon"
                onClick={() =>
                  dataDispatch({
                    type: ACTION_TYPES.SET_WATCHLATER,
                    payload: findVideo,
                  })
                }
              />
            )}
            <MdPlaylistAdd
              className="icon"
              onClick={() => {
                setShowPlaylistOption((prev) => !prev);
                setShowAddNewNoteOption(false);
              }}
            />
            {showPlaylistOption && (
              <PlaylistOption
                setShowPlaylistOption={setShowPlaylistOption}
                video={findVideo}
              />
            )}
            <MdEditNote
              className="icon"
              onClick={() => {
                setShowAddNewNoteOption((prev) => !prev);
                setShowPlaylistOption(false);
              }}
            />
            {showAddNewNoteOption && (
              <NewNote
                setShowAddNewNoteOption={setShowAddNewNoteOption}
                videoId={findVideo._id}
              />
            )}
          </div>
        </div>
        <div className="notes-container">
          <h1>My Notes</h1>
          <div className="note-list">
            {findNotesByVideo?.notes.map((n, index) => (
              <div key={index} className="note">
                {edit.show && edit._id === n._id ? (
                  <div>
                    <input
                      type="text"
                      value={updatedNote}
                      onChange={(e) => setUpdatedNote(e.target.value)}
                    />
                    <button className="button" onClick={() => handleUpdate(n)}>
                      Update
                    </button>
                    <button className="button cancel" onClick={() => setShowEdit({})}>
                      Cancel
                    </button>
                  </div>
                ) : (
                  <p>{n.note}</p>
                )}
                <div className="edit-delete">
                  <AiFillEdit
                    className="icon"
                    onClick={() =>{
                      setUpdatedNote(n.note)
                      setShowEdit((prev) => ({
                        show: true,
                        _id: n._id,
                      }))}
                    }
                  />
                  <MdDelete
                    className="icon"
                    onClick={() =>
                      dataDispatch({
                        type: ACTION_TYPES.DELETE_NOTE,
                        payload: {
                          note: n._id,
                          videoId: findVideo._id,
                        },
                      })
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="more-video-container">
        <h2>More Videos: </h2>
        <div className="more-video-list">
          {videos.map((video) => (
            <MoreVideos key={video._id} video={video} />
          ))}
        </div>
      </div>
    </div>
  );
};
