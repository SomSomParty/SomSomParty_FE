import React from "react";
import "./ChatPage.css";

const ChatRoom = ({ chat }) => {
  // 메시지 데이터에 isMyMessage 속성 추가
  const messages = [
    { id: 1, sender: "관리자", content: "공지: 다음 주 모임 일정 안내", isMyMessage: false },
    { id: 2, sender: "유저2", content: "참석 가능합니다!", isMyMessage: false },
    { id: 3, sender: "나", content: "저도 가능합니다.", isMyMessage: true },
  ];

  return (
    <div>
      <div className="chat-room-header">{chat.title}</div>
      <div className="chat-room-messages">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`chat-message ${message.isMyMessage ? "my-message" : "other-message"}`}
          >
            {!message.isMyMessage && (
              <span className="chat-message-sender">{message.sender}</span>
            )}
            <div className={`chat-message-content ${message.isMyMessage ? "my-message" : "other-message"}`}>
              {message.content}
            </div>
          </div>
        ))}
      </div>
      <div className="chat-input-container">
        <input
          type="text"
          className="chat-input"
          placeholder="메시지를 입력하세요"
        />
        <button className="send-button">전송</button>
      </div>
    </div>
  );
};

export default ChatRoom;