import axios from "axios";
import React, { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { toast } from "react-toastify";

function Sidebar({ setSelectedChat, setShow, setMessage, setMobileView }) {
  const [searchItem, setSearchItem] = useState("");
  const [userData, setUserData] = useState([]);
  const [highlight, setHighlight] = useState("");

  const userCred = JSON.parse(localStorage.getItem("userCred"));

  const searchHandler = async () => {
    try {
      if (searchItem.trim(" ") === "") {
        toast.error("Search field cannot be empty", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        return;
      }
      const data = await axios.get(
        `http://localhost:5000/api/users?search=${searchItem}`,
        {
          headers: {
            Authorization: "Bearer " + userCred.token,
          },
        }
      );
      setUserData(data.data);
    } catch (error) {
      if (error) {
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

  const getChatList = async () => {
    try {
      let data = await axios.get("http://localhost:5000/api/chats", {
        headers: {
          Authorization: "Bearer " + userCred.token,
        },
      });
      setUserData(data.data);
    } catch (error) {
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
  };

  const getName = (user) => {
    return user[0].name === userCred.name ? user[1].name : user[0].name;
  };

  const createChat = async (id) => {
    try {
      let data = await axios.post(
        "http://localhost:5000/api/chats/create",
        {
          userId: id,
        },
        {
          headers: {
            Authorization: "Bearer " + userCred.token,
          },
        }
      );
    } catch (error) {
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
  };

  const fetchMessage = async(id)=>{
    let data = await axios.get(`http://localhost:5000/api/message/${id}`,{
      headers: {
        Authorization: "Bearer " + userCred.token,
      },
    })
    setMessage(data.data);
    console.log(data.data);

  }

  useEffect(() => {
    if (userCred && searchItem === "") {
      getChatList();
    }
  }, [searchItem]);

  useEffect(() => {
    if (userCred != null) {
      getChatList();
    }
  }, []);

  return (
    <div className="drawer h-[93vh]">
      <div className="drawer-side overflow-y-auto no-scrollbar">
        <div className="flex items-center justify-between p-2">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-[220px]"
            onChange={(e) => {
              setSearchItem(e.target.value);
            }}
          />
          <BiSearch
            size={"22px"}
            className=" hover:cursor-pointer"
            onClick={searchHandler}
          />
        </div>
        <label htmlFor="my-drawer" className="drawer-overlay"></label>
        {userData.map((e) => {
          return (
            <ul
              key={e._id}
              className="menu p-4 w-full bg-base-100 text-base-content"
            >
              <li
                className={
                  highlight === e._id
                    ? " bg-purple-600 text-white rounded-md"
                    : ""
                }
              >
                <span
                  onClick={
                    e.users
                      ? () => {
                          setSelectedChat(e);
                          setShow(true);
                          setHighlight(e._id);
                          fetchMessage(e._id);
                          setMobileView(true);
                        }
                      : () => {
                          createChat(e._id);
                        }
                  }
                >
                  {e.users ? getName(e.users) : e.name}
                </span>
              </li>
            </ul>
          );
        })}
      </div>
    </div>
  );
}

export default Sidebar;
