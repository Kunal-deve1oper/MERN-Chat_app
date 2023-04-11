import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  useEffect(()=>{
    const userCred = JSON.parse(localStorage.getItem("userCred"));
    if(userCred != null)
    {
      navigate("/chat");
    }
  },[])


  const sendLoginData = async (e) => {
    e.preventDefault();
    const info = {
      email: email,
      password: password,
    };
    try {
      const data = await axios.post("http://localhost:5000/api/users/login", info);
      toast.success("Login Successful", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setEmail("");
      setPassword("");
      localStorage.setItem("userCred", JSON.stringify(data.data));
      navigate("/chat");
    } catch (error) {
      if (error.response.status === 400) {
        toast.error(error.response.data.error, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen justify-center items-center bg-slate-700">
      <h1 className="text-center text-[30px] py-5 font-bold text-gray-400">
        LOGIN
      </h1>
      <div className=" bg-zinc-800 p-8 rounded-xl shadow-lg text-white md:w-67">
        <form className="flex flex-col space-y-7" onSubmit={sendLoginData}>
          <div>
            <label className="text-sm">Email Address</label>
            <input
              type="email"
              placeholder="Email Address"
              className="bg-zinc-700 w-full rounded-md px-3 py-2 mt-1 outline-none focus:ring-2 focus:ring-zinc-400"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
              required
            />
          </div>
          <div>
            <label className="text-sm">Password</label>
            <input
              type="password"
              placeholder="Password"
              className="bg-zinc-700 w-full rounded-md px-3 py-2 mt-1 outline-none focus:ring-2 focus:ring-zinc-400"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
              required
            />
          </div>
          <button className="inline-block self-center bg-zinc-700 text-white font-bold rounded-lg px-6 py-2 uppercase  text-sm hover:bg-blue-600">
            Login
          </button>
          <div className="text-center">OR</div>
          <div className="text-center">
            Dose't have an account?{" "}
            <Link to="/signup" className="text-blue-500 text-lg">
              Signup
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
