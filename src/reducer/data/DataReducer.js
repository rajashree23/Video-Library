import { categories } from "../../database/categories";
import { videos } from "../../database/videos";
import { ACTION_TYPES } from "../../utils/actionTypes";

export const dataInitialState = {
  categories: categories,
  videos: videos,
  watchLaterList: localStorage.getItem("watchLaterList")
    ? JSON.parse(localStorage.getItem("watchLaterList"))
    : [],
  playlist: localStorage.getItem("playlist")
    ? JSON.parse(localStorage.getItem("playlist"))
    : [],
  notes: localStorage.getItem("notes")
    ? JSON.parse(localStorage.getItem("notes"))
    : [],
};

export const DataReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_WATCHLATER:
      const isWatchLater = state.watchLaterList.findIndex(
        (watchLater) => watchLater._id === action.payload._id
      );
      let watchLaterList = [];
      if (isWatchLater === -1) {
        watchLaterList = [...state.watchLaterList, action.payload];
      } else {
        watchLaterList = state.watchLaterList.filter(
          (watchLater) => watchLater._id !== action.payload._id
        );
      }
      localStorage.setItem("watchLaterList", JSON.stringify(watchLaterList));
      return {
        ...state,
        watchLaterList: watchLaterList,
      };

    case ACTION_TYPES.SET_INITIAL_PLAYLIST:
      localStorage.setItem("playlist", JSON.stringify(action.payload));
      return {
        ...state,
        playlist: action.payload,
      };

    case ACTION_TYPES.DELETE_PLAYLIST:
      const finalPlaylist = state.playlist.filter(
        (p) => p._id !== action.payload._id
      );
      localStorage.setItem("playlist", JSON.stringify(finalPlaylist));
      return {
        ...state,
        playlist: finalPlaylist,
      };

    case ACTION_TYPES.SET_NEW_PLAYLIST:
      const updatedPlaylist = [
        ...state.playlist,
        {
          _id: state.playlist.length + 1,
          description: action.payload.description,
          thumbnail: "https://picsum.photos/300/175",
          name: action.payload.name,
          videos: action.payload.videos,
        },
      ];
      localStorage.setItem("playlist", JSON.stringify(updatedPlaylist));
      return {
        ...state,
        playlist: updatedPlaylist,
      };

    case ACTION_TYPES.DELETE_VIDEO_FROM_PLAYLIST:
      const filteredPlaylist = state.playlist.map((p) =>
        p._id === action.payload.playlistId
          ? {
              ...p,
              videos: p.videos.filter((v) => v._id !== action.payload.videoId),
            }
          : p
      );
      localStorage.setItem("playlist", JSON.stringify(filteredPlaylist));
      return {
        ...state,
        playlist: filteredPlaylist,
      };

    case ACTION_TYPES.ADD_VIDEO_TO_EXISTING_PLAYLIST:
      const updatedVideoPlaylist = state.playlist.map((p) =>
        p._id === action.payload.playlistId
          ? { ...p, videos: [...p.videos, action.payload.video] }
          : p
      );
      localStorage.setItem("playlist", JSON.stringify(updatedVideoPlaylist));
      return {
        ...state,
        playlist: updatedVideoPlaylist,
      };
    case ACTION_TYPES.ADD_NOTES:
      const findVideo = state.notes.findIndex(
        (n) => n.videoId === action.payload.videoId
      );
      let notes = {};
      if (findVideo === -1) {
        notes = [
          ...state.notes,
          {
            videoId: action.payload.videoId,
            notes: [{ note: action.payload.note, _id: 1 }],
          },
        ];
      } else {
        notes = state.notes.map((n) =>
          n.videoId === action.payload.videoId
            ? {
                ...n,
                notes: [
                  ...n.notes,
                  { note: action.payload.note, _id: n.notes.length + 1 },
                ],
              }
            : n
        );
      }
      localStorage.setItem("notes", JSON.stringify(notes));
      return {
        ...state,
        notes: notes,
      };
    case ACTION_TYPES.DELETE_NOTE:
      const filteredNotes = state.notes.map((n) =>
        n.videoId === action.payload.videoId
          ? {
              ...n,
              notes: n.notes.filter((n) => n !== action.payload._id),
            }
          : n
      );
      localStorage.setItem("notes", JSON.stringify(filteredNotes));
      return {
        ...state,
        notes: filteredNotes,
      };
    case ACTION_TYPES.EDIT_NOTE:
      const updateNotes = state.notes.map((n) =>
        n.videoId === action.payload.videoId
          ? {
              ...n,
              notes: n.notes.map((n1) =>
                n1._id === action.payload.note._id
                  ? { ...n1, note: action.payload.updatedNote }
                  : n1
              ),
            }
          : n
      );
      localStorage.setItem("notes", JSON.stringify(updateNotes));
      return {
        ...state,
        notes: updateNotes,
      };
    default:
      return state;
  }
};
