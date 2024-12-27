import React from 'react';
import ChatInput from './ChatInput';

const ChatRoom = () => {
  const messages = [
    { id: 1, sender: '관리자', text: '공지: 다음 주 모임 일정 안내' },
    { id: 2, sender: '사용자1', text: '참석 가능합니다!' },
    { id: 3, sender: '사용자2', text: '저도 가능합니다.' },
  ];

  return (
    <div className="chat-room-container">
      <h3>동아리 채팅방</h3>
      <div className="chat-messages">
        {messages.map((message) => (
          <div key={message.id} className="chat-message">
            <strong>{message.sender}:</strong> {message.text}
          </div>
        ))}
      </div>
      <ChatInput />
    </div>
  );
};

export default ChatRoom;