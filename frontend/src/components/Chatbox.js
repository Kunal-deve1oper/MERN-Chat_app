import React, { useEffect, useRef } from "react";
import Message from "./Message";
import Sendmsg from "./Sendmsg";
import { IoArrowBack } from "react-icons/io5";

function Chatbox({selectedChat, message, setMessage, setMobileView}) {

  const msgRef = useRef(null);

  useEffect(()=>{
    msgRef.current?.scrollIntoView();
  },[message])

  const index = (user)=>{
    const userCred = JSON.parse(localStorage.getItem("userCred"));
    return userCred.name === user[0].name ? user[1] : user[0];
  }

  return (
    <div className="flex flex-col lg:h-[93.2vh] h-[92.5vh] bg-slate-800">
      <div className=" flex p-2 items-center justify-between bg-slate-500 ">
        <IoArrowBack className="hover:cursor-pointer lg:hidden" onClick={()=>{setMobileView(false)}}/>
        <div className="flex items-center">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img src={selectedChat.users.length > 0 ? index(selectedChat.users).pic: ""} />
            </div>
          </label>
          <h1 className="px-3 font-bold text-2xl">{selectedChat.users.length > 0 ? index(selectedChat.users).name : ""}</h1>
        </div>
      </div>
      <div className="pb-4 px-4 pt-5 h-[83vh] container mx-auto max-w-4xl lg:max-w-[90%] overflow-y-auto no-scrollbar">
        {message.map((e)=>{
          return <Message key={e._id} data={e} />
        })}
        <div ref={msgRef}></div>
      </div>
      <div className="pt-3 pb-3">
        <Sendmsg message={message} chatId={selectedChat._id} setMessage={setMessage} />
      </div>
    </div>
  );
}

export default Chatbox;
