import React, { useState, useEffect } from "react";
import { getChatRoomList, leaveChatRoom } from "../../api/myChatListApi"; // API 호출 함수
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

  const handleChatClick = (chat) => {
    // 클릭한 채팅방의 unreadCount를 0으로 업데이트
    setChats((prevChats) =>
      prevChats.map((c) => (c.id === chat.id ? { ...c, unReadCount: 0 } : c))
    );
    onChatSelect(chat); // 채팅방 선택 핸들러 호출
  };

  const handleLeaveChat = async (chat) => {
    try {
      await leaveChatRoom(userId, chat.id); // userId와 chatRoomId를 API로 전달
      setChats((prevChats) => prevChats.filter((c) => c.id !== chat.id)); // 상태에서 채팅방 제거
    } catch (error) {
      console.error("채팅방 나가기 중 오류:", error);
    }
  };

  if (loading) {
    return <p>채팅방 데이터를 불러오는 중...</p>;
  }

  if (!chats.length) {
    return <p>참여 중인 채팅방이 없습니다.</p>;
  }

  return (
    <ul className="chat-list">
      {chats.map((chat) => (
        <li key={chat.id} className="chat-item">
          {/* 왼쪽: 제목과 인원 */}
          <div className="chat-item-left" onClick={() => handleChatClick(chat)}>
            <div className="chat-item-title">{chat.title}</div>
            <div className="chat-item-participants">{chat.userCount}명</div>
            {chat.unReadCount > 0 && (
              <div className="chat-unread">{chat.unReadCount}</div>
            )}
          </div>
          {/* 오른쪽: 나가기 버튼 */}
          <button
            className="chat-leave-button"
            onClick={() => handleLeaveChat(chat)}
          >
            나가기
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ChatList;