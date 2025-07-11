import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom';
import { useStore } from '../store'; 
import toast from 'react-hot-toast';
import'./ViewPaste.css'
const ViewPaste = () => {

  const { id }=useParams("pasteId");
  const {pastes,AddToPaste,removePaste,updatePaste,resetPaste}=useStore();
  const paste=pastes.filter((p)=>p.id==id)[0];
  function handlecopy(paste){
    navigator.clipboard.writeText(paste.content);
    toast.success("Copied to clipboard");
  }

  return (
    <div className="view-paste-container">
    <h1 className="view-paste-title">{paste.title}</h1>
    <textarea
      value={paste.content}
      readOnly
      rows={15}
      className="view-paste-textarea"
    />
    <button onClick={handlecopy} className="copy-btn">Copy Content</button>
  </div>
  )
}

export default ViewPaste
