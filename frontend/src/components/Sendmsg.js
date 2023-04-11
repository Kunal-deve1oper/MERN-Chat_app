import axios from "axios";
import React, { useState } from "react";
import { IoIosSend } from "react-icons/io";

function Sendmsg({message, chatId, setMessage}) {

  const [msg,setMsg] = useState("");
  
  //console.log("message:",message);

  const userCred = JSON.parse(localStorage.getItem("userCred"));

  const sendMessage = async(e)=>{
    e.preventDefault();
    console.log(message)
    const data = await axios.post("http://localhost:5000/api/message",{
      content: msg,
      chatId: chatId
    },
    {
      headers: {
        Authorization: "Bearer " + userCred.token,
      },
    });
    setMsg("");
    let updataedMsg = [...message,data.data];
    setMessage(updataedMsg);
    console.log(updataedMsg);
    //console.log(data.data);
  }

  return (
    <form className="px-0 container mx-auto max-w-4xl flex md:justify-center">
      <input
        className="input w-full md:w-[60%] focus:outline-none bg-zinc-900 text-white rounded-r-none py-2 px-2"
        type="text"
        value={msg}
        onChange={(e)=>{setMsg(e.target.value)}}
      />
      <button
        type="submit"
        className="w-auto bg-gray-500 text-white rounded-r-lg px-5 text-sm"
        
        onClick={sendMessage}
      >
        <IoIosSend size="25px" />
      </button>
    </form>
  );
}

export default Sendmsg;
