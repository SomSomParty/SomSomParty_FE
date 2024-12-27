import React, { useState, useEffect } from "react";
import { getChatRoomList } from "../../api/myChatListApi"; // API 함수 가져오기
import "./ChatPage.css";

const ChatList = ({ onChatSelect }) => {
  const [chats, setChats] = useState([]); // 채팅 목록 상태
  const [loading, setLoading] = useState(true); // 로딩 상태
  const userId = 1; // TODO: 로그인 구현 완료시 하드코딩 제거

  // 백엔드에서 채팅방 데이터 가져오기
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const chatRooms = await getChatRoomList(userId); // API 호출
        setChats(chatRooms); // 데이터 저장
      } catch (error) {
        console.error("채팅방 데이터를 가져오는 중 에러 발생:", error);
      } finally {
        setLoading(false); // 로딩 완료
      }
    };

    fetchChats();
  }, [userId]);

  if (loading) {
    return <p>채팅방 데이터를 불러오는 중...</p>;
  }

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
              {/* TODO: 알림 갯수 구현 후 표시 */}
              {/* <span className="chat-item-notifications">알림 수</span> */}
            </div>
            <span className="chat-item-participants">
              {chat.userCount}명
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatList;