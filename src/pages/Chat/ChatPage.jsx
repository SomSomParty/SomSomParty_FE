import React, { useState } from "react";
import ChatList from "./ChatList";
import ChatRoom from "./ChatRoom";
import "./ChatPage.css";

const ChatPage = () => {
  const [selectedChat, setSelectedChat] = useState(null);

  const handleChatSelect = (chat) => {
    setSelectedChat(chat);
  };

  return (
    <div className="chat-page-container">
      <div className="chat-layout"> {/* chat-layout 추가 */}
        <div className="chat-list-section">
          <ChatList onChatSelect={handleChatSelect} />
        </div>
        <div className="chat-room-section">
          {selectedChat ? (
            <ChatRoom chat={selectedChat} />
          ) : (
            <div className="placeholder">채팅방을 선택하세요.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;