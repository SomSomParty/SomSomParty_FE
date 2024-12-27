import React from "react";
import "./ChatPage.css";

const chats = [
  { id: 1, title: "동덕여대 축제 공지 방", notifications: 3, participants: "5명" },
  { id: 2, title: "동덕여대 축제 동반인 모집 방", notifications: 2, participants: "2명" },
  { id: 3, title: "여의도 불꽃 축제 같이 가요", notifications: 4, participants: "8명" },
  { id: 4, title: "서힙페 같이 가요", notifications: 1, participants: "3명" },
  { id: 5, title: "고대 축제 같이 다녀용", notifications: 8, participants: "6명" },
];

const ChatList = ({ onChatSelect }) => {
  return (
    <div className="chat-search-container">
      <input
        type="text"
        className="chat-search"
        placeholder="채팅방 검색"
      />
      <ul className="chat-list">
        {chats.map((chat) => (
          <li
            key={chat.id}
            className="chat-item"
            onClick={() => onChatSelect(chat)}
          >
            <div className="chat-item-details">
              <span className="chat-item-title">{chat.title}</span>
              {chat.notifications > 0 && (
                <span className="chat-item-notifications">
                  {chat.notifications}
                </span>
              )}
            </div>
            <span className="chat-item-participants">
              {chat.participants}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatList;