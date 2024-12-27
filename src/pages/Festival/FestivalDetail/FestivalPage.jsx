import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { joinChatRoom, enterChatRoom } from "../../../api/chatJoinApi";
import FestivalImage from "./FestivalImage";
import FestivalCard from "./FestivalCard";
import FestivalButton from "./FestivalButton";
import "./FestivalDetail.css";

const mockEvents = [
  { id: 1, name: "태안 빛축제", date: "2024-12-31", organizer: "충청남도 태안군" },
  { id: 4, name: "낭만등불축제", date: "2025-04-30", organizer: "경기도 남양주시" },
  { id: 5, name: "무주반딧불축제", date: "2024-09-08", organizer: "전북특별자치도 무주군" },
];

const FestivalPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userId = 1; // 하드코딩된 사용자 ID

  const searchParams = new URLSearchParams(location.search);
  const eventId = parseInt(searchParams.get("id"), 10);
  const event = mockEvents.find((e) => e.id === eventId);

  if (!event) {
    return <p>해당 축제를 찾을 수 없습니다.</p>;
  }

  const handleEnterChatRoom = async () => {
    try {
      const chatRoomId = await joinChatRoom(event.id, userId);
      const chatRoomData = await enterChatRoom(chatRoomId, userId);
  
      navigate("/chat", {
        state: { chat: { id: chatRoomId, title: event.name }, messages: chatRoomData.messages },
      });
    } catch (error) {
      console.error("채팅방 입장 중 에러 발생:", error);
    }
  };

  return (
    <div className="festival-page-container">
      <h1 className="festival-page-title">{event.name}</h1>
      <FestivalImage />
      <FestivalCard
        title={event.name}
        date={event.date}
        recruitPeriod={event.recruitPeriod}
        limit={event.limit}
        description={event.description}
      />
      <div className="festival-page-buttons">
        <FestivalButton label="채팅방 입장하기" onClick={handleEnterChatRoom} />
        <FestivalButton label="예약하기" />
      </div>
    </div>
  );
};

export default FestivalPage;