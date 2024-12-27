import React from "react";
import { useLocation } from "react-router-dom"; // useLocation 추가
import "./ChatRoom.css";

const mockEvents = [
  { id: 1, title: "태안 빛축제 채팅방", description: "태안 빛축제에 대한 채팅방입니다." },
  { id: 4, title: "낭만등불축제 채팅방", description: "낭만등불축제 채팅방입니다." },
  { id: 5, title: "무주반딧불축제 채팅방", description: "무주반딧불축제에 대한 채팅방입니다." },
];

const ChatRoom = () => {
  const location = useLocation();

  // URL에서 `id` 쿼리 파라미터 추출
  const searchParams = new URLSearchParams(location.search);
  const chatRoomId = parseInt(searchParams.get("id"), 10); // 숫자로 변환

  // mockEvents에서 해당 `id`에 맞는 데이터 찾기
  const chat = mockEvents.find((room) => room.id === chatRoomId);

  if (!chat) {
    return <p>해당 채팅방을 찾을 수 없습니다.</p>; // 유효하지 않은 `id` 처리
  }

  // 메시지 데이터에 isMyMessage 속성 추가
  const messages = [
    { id: 1, sender: "관리자", content: "공지: 다음 주 모임 일정 안내", isMyMessage: false },
    { id: 2, sender: "유저2", content: "참석 가능합니다!", isMyMessage: false },
    { id: 3, sender: "나", content: "저도 가능합니다.", isMyMessage: true },
  ];

  return (
    <div className="chat-room-container">
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
            <div
              className={`chat-message-content ${
                message.isMyMessage ? "my-message" : "other-message"
              }`}
            >
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