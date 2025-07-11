import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import { useStore } from '../store'; 
import './Home.css'
const Home = () => {
  const [title,setTitle]=useState("");
  const [value,setvalue]=useState("");
  const [searchparam,setsearchparam]=useSearchParams();
  const pasteId=searchparam.get("pasteId");
  const {pastes,AddToPaste,removePaste,updatePaste,resetPaste}=useStore();
  useEffect(()=>{
    if(pasteId){
      const paste=pastes.find((p)=>p.id==pasteId);
      if(paste){
        setTitle(paste.title);
        setvalue(paste.content);
      }
 
    }
  },[pasteId]);
  
  function createpaste(){
    //create paste nd store in local storage
    const paste={
      title:title,
      content:value,
      id:pasteId||Date.now().toString(36),
      createdAt:new Date().toISOString(),

    }
    if (pasteId){
      //update
      updatePaste(paste);
    }else{
      //create
      AddToPaste(paste);
    }
    //after creation/updation---clean
    setTitle("");
    setsearchparam({});
    setvalue("");


  }
 

  return (
<div> <h1 className="home-title">PASTE APPLICATION</h1>
    <div className="home-container">
     

      <input type='text'value={title}placeholder='enter title'onChange={(e)=>{setTitle(e.target.value)}}/>
     
      <hr></hr>
      <textarea value={value} placeholder='enter content here..'onChange={(e)=>{setvalue(e.target.value)}}rows={20}></textarea>
      <hr></hr>
      <div  className="button-wrapper">
      <button onClick={createpaste}>{pasteId?"Update Paste":"Create Paste"}</button>
      </div>
    </div>
    </div>
  )
}

export default Home
