import React from 'react';

const ChatList = () => {
  const chats = [
    '동아리 회의 알림 🚨',
    '채팅방 1',
    '채팅방 2',
    '새로운 공지',
    '다른 메시지들...',
  ];

  return (
    <div className="chat-list-container">
      <h3>채팅방 목록</h3>
      <input type="text" className="search-bar" placeholder="채팅방 검색" />
      <ul className="chat-list">
        {chats.map((chat, index) => (
          <li key={index} className="chat-item">
            {chat}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatList;