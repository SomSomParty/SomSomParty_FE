import React, { useState, useEffect } from "react";
import { getChatRoomList } from "../../api/myChatListApi"; // API 호출 함수
import "./ChatPage.css";

const ChatList = ({ onChatSelect }) => {
  const [chats, setChats] = useState([]); // 채팅방 목록 상태
  const [loading, setLoading] = useState(true); // 로딩 상태
  const userId = 1; // 하드코딩된 사용자 ID

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const chatRooms = await getChatRoomList(userId); // API 호출
        setChats(chatRooms); // 상태에 데이터 저장
      } catch (error) {
        console.error("채팅방 목록을 가져오는 중 오류:", error);
      } finally {
        setLoading(false); // 로딩 완료
      }
    };

    fetchChats(); // 컴포넌트가 처음 렌더링될 때 채팅방 목록 가져오기
  }, []);

  if (loading) {
    return <p>채팅방 데이터를 불러오는 중...</p>;
  }

  if (!chats.length) {
    return <p>참여 중인 채팅방이 없습니다.</p>;
  }

  return (
    <ul className="chat-list">
      {chats.map((chat) => (
        <li
          key={chat.id}
          className="chat-item"
          onClick={() => onChatSelect(chat)} // 채팅방 선택 핸들러
        >
          <div className="chat-title">{chat.title}</div>
          <div className="chat-participants">{chat.userCount}명</div>
        </li>
      ))}
    </ul>
  );
};

export default ChatList;