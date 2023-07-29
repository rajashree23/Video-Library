import { createContext, useContext, useEffect, useReducer } from "react";
import { DataReducer, dataInitialState } from "../../reducer/data/DataReducer";
import { ACTION_TYPES } from "../../utils/actionTypes";

const DataContext = createContext();

export const DataContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(DataReducer, dataInitialState);
  useEffect(() => {
    if (state.playlist.length === 0) {
      dispatch({
        type: ACTION_TYPES.SET_INITIAL_PLAYLIST,
        payload: [
          {
            _id: "1",
            name: "Music Videos",
            description: "my personal favorites",
            thumbnail: "https://picsum.photos/300/175",
            videos: [
              {
                _id: 20,
                title: "Kirigami Flower Bouquet - Beautiful Handmade Gift",
                views: 1756,
                chips: ["kirigami", "flower bouquet", "paper", "gift"],
                thumbnail: "https://picsum.photos/300/175",
                src: "https://www.youtube.com/embed/GBIIQ0kP15E",
                category: "Kirigami",
                creator: "Crafty Delights",
              },
              {
                _id: 21,
                title:
                  "Sculpting Animals from Polymer Clay - Step by Step Guide",
                views: 2251,
                chips: ["sculpture", "polymer clay", "animals", "crafts"],
                thumbnail: "https://picsum.photos/300/176",
                src: "https://www.youtube.com/embed/GBIIQ0kP15E",
                category: "Clay Modeling",
                creator: "CraftyCritters",
              },
            ],
          },
        ],
      });
    }
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <DataContext.Provider
      value={{
        categories: state.categories,
        dataDispatch: dispatch,
        videos: state.videos,
        watchLaterList: state.watchLaterList,
        playlist: state.playlist,
        notes:state.notes
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => useContext(DataContext);
