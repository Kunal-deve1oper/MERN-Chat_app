import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar({pic}) {

  const navigate = useNavigate();

  const handleLogout = ()=>{
    localStorage.removeItem("userCred");
    navigate("/login");
  }

  return (
    <div className="navbar p-0 bg-black ">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">Chatter</a>
      </div>
      <div className="flex-none gap-2">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img src={pic} />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="mt-3 shadow menu menu-compact dropdown-content rounded-box w-52 bg-blue-800"
          >
            <li>
              <span className="justify-between">
                Profile  
              </span>
            </li>
            <li>
              <span>Settings</span>
            </li>
            <li>
              <span onClick={handleLogout}>Logout</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
