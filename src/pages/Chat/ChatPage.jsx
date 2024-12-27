import React from 'react';
import ChatList from './ChatList';
import ChatRoom from './ChatRoom';
import './ChatPage.css';
const ChatPage = () => {
  return (
    <div className="chat-page-container">
      <div className="chat-list-section">
        <ChatList />
      </div>
      <div className="chat-room-section">
        <ChatRoom />
      </div>
    </div>
  );
};

export default ChatPage;