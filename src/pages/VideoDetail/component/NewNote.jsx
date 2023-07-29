import { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { useDataContext } from "../../../context/data/DataContext";
import { ACTION_TYPES } from "../../../utils/actionTypes";

export const NewNote = ({setShowAddNewNoteOption, videoId}) => {
    const[input,setInput]=useState("");
    const{dataDispatch}=useDataContext();
    const handleSubmit=()=>{
        if(input){
            dataDispatch({type:ACTION_TYPES.ADD_NOTES,payload:{
                videoId:videoId,
                note:input
            }})

            setShowAddNewNoteOption(false)
        }
        
    }
  return (
    <div className="playlist-option">
      <RxCross1 className="cross-icon" onClick={()=>setShowAddNewNoteOption(false)}/>
      <input className="new-note" placeholder="New notes" value={input} onChange={(e)=>setInput(e.target.value)}/>
      <button className="button" onClick={handleSubmit}>Add New Note</button>
    </div>
  );
};
