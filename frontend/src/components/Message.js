import React from 'react'

function Message({data, id}) {

  const userCred = JSON.parse(localStorage.getItem("userCred"));

  return (
    <div>
    <div className={`chat ${userCred._id === data.sender._id ? "chat-end": "chat-start"} `}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img src={data.sender.pic} />
        </div>
      </div>
      <div className="chat-header">
        {data.sender.name}
      </div>
      <div className="chat-bubble">{data.content}</div>
    </div>
  </div>
  )
}

export default Message
