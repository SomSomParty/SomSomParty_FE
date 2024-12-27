import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ChatList from "./ChatList";
import ChatRoom from "./ChatRoom";
import { enterChatRoom } from "../../api/chatJoinApi"; // API 호출 함수
import "./ChatPage.css";

const ChatPage = () => {
  const location = useLocation();
  const [selectedChat, setSelectedChat] = useState(location.state?.chat || null);
  const [messages, setMessages] = useState(location.state?.messages || []);

  const handleChatSelect = async (chat) => {
    try {
      const chatRoomData = await enterChatRoom(chat.id, 1); // userId는 하드코딩된 값
      setSelectedChat(chat);
      setMessages(chatRoomData.messages || []);
    } catch (error) {
      console.error("채팅방 데이터를 가져오는 중 오류:", error);
    }
  };

  return (
    <div className="chat-page-container">
      <div className="chat-layout">
        {/* 채팅방 리스트 */}
        <div className="chat-list-section">
          <ChatList onChatSelect={handleChatSelect} />
        </div>

        {/* 채팅방 내용 */}
        <div className="chat-room-section">
          {selectedChat ? (
            <ChatRoom chat={selectedChat} messages={messages} />
          ) : (
            <div className="placeholder">채팅방을 선택하세요.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;