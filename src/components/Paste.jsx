import React, { useState } from 'react'
import { useStore } from '../store'; 
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import './Paste.css'


const Paste = () => {
  const { pastes, AddToPaste, removePaste, updatePaste, resetPaste } = useStore();
  
  const [searchterm,setsearchterm]=useState("");
  const filtereddata=pastes.filter((paste)=>{return paste.title.toLowerCase().includes(searchterm.toLowerCase())});
  function handledelete(paste){
    removePaste(paste)
  }
  function handlecopy(paste){
    navigator.clipboard.writeText(paste.content);
    toast.success("Copied to clipboard");
  }

function handleShare(pasteId) {
  const shareURL = `${window.location.origin}/pastes/${pasteId}`;
  navigator.clipboard.writeText(shareURL);
  toast.success("Link copied!");
}
function formatDate(isoDate) {
  const date = new Date(isoDate);
  return date.toLocaleString(); 

}

  return (
    <div className="paste-container">
      <h1 className="paste-title">All Pastes</h1>

      <input
        type="search"
        placeholder="Search here..."
        value={searchterm}
        onChange={(e) => setsearchterm(e.target.value)}
        className="paste-search"
      />

      <div className="paste-list">
        {filtereddata.map((paste) => (
          <div key={paste.id} className="paste-card">
            <h2>{paste.title}</h2>
            <p>{paste.content}</p>
            <div className="paste-actions">
              <Link to={`/?pasteId=${paste.id}`}>
                <button>Edit</button>
              </Link>
              <Link to={`/pastes/${paste.id}`}>
                <button>View</button>
              </Link>
              <button onClick={() => handlecopy(paste)}>Copy</button>
              <button onClick={() => handledelete(paste)}>Delete</button>
              <button onClick={() => handleShare(paste.id)}>Share</button>
            </div>
            <span className="paste-date">{formatDate(paste.createdAt)}</span>

          </div>
        ))}
      </div>
    </div>
  )
}

export default Paste
