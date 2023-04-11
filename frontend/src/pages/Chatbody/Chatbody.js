import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Chatbox from "../../components/Chatbox";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

function Chatbody() {

  const [user,setUser] = useState({});
  const [selectedChat,setSelectedChat] = useState([]);
  const [show,setShow] = useState(false);
  const [message,setMessage] = useState([]);
  const [mobileView,setMobileView] = useState(false);

  const navigate = useNavigate();

  useEffect(()=>{
    const userCred = JSON.parse(localStorage.getItem("userCred"));
    if(userCred != null)
    {
      setUser(userCred);
    }
    else
    {
      navigate("/login");
    }
  },[])

  return (
    <div className="max-h-screen">
      <Navbar pic={user.pic} />
      <div className="flex bg-zinc-700 overflow-x-hidden">
        <div className={mobileView ? "lg:w-[20%] lg:grid lg:min-w-fit min-w-full hidden" : "lg:w-[20%] lg:grid lg:min-w-fit min-w-full"}>
          <Sidebar setSelectedChat={setSelectedChat} setShow={setShow} setMessage={setMessage} setMobileView={setMobileView} />
        </div>
        <div className={mobileView ? "lg:flex lg:flex-col lg:h-full lg:w-[80%] lg:min-w-fit min-w-full" : "lg:flex lg:flex-col lg:h-full lg:w-[80%] lg:min-w-fit min-w-full hidden"}>
          <div>
            {show ? <Chatbox selectedChat={selectedChat} message={message} setMessage={setMessage} setMobileView={setMobileView}/> : ""}
          </div>
        </div>
      </div>
    </div>
   
  );
}

export default Chatbody;
