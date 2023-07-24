import React from 'react';
import './Chat.css';
import chaticon from '../Img/chaticon.png'

function ChatIcon(props) {
  return (
    <div className="chat-icon" onClick={props.onClick}>
      <span >
          <img src={chaticon} style={{width:'5vw', height:'5vw'}}></img>
      </span>
    </div>
  );
}

export default ChatIcon;
