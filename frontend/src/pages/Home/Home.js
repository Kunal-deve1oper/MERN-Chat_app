import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

function Home() {

    const navigate = useNavigate();

    const handleLogin = ()=>{
        return navigate("/login")
    }

    const handleSignup = ()=>{
        return navigate("/signup")
    }

    useEffect(()=>{
      const userCred = JSON.parse(localStorage.getItem("userCred"));
      if(userCred != null)
      {
        navigate("/chat");
      }
    },[])

  return (
    <div className="flex w-full min-h-screen justify-center items-center bg-slate-700">
      <div className="flex flex-col h-[200px] md:h-[300px] space-y-6 bg-zinc-800 w-full max-w-4xl p-8 sm:p-12 rounded-xl shadow-lg text-white justify-center">
        <div className="text-center font-bold text-base md:text-3xl py-4">
          <h1>Welcome to Chat Room</h1>
        </div>
        <div className="flex justify-around items-center py-6 md:pt-[3.5rem]">
          <button className="inline-block self-center bg-zinc-700 text-white font-bold rounded-lg px-6 py-2 uppercase  text-sm hover:bg-blue-600" onClick={handleLogin}>
            Login
          </button>
          <span>OR</span>
          <button className="inline-block self-center bg-zinc-700 text-white font-bold rounded-lg px-6 py-2 uppercase  text-sm hover:bg-blue-600" onClick={handleSignup}>
            Signup
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
