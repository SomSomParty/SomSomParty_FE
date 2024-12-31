import React, {useContext, useEffect, useState} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { joinChatRoom, enterChatRoom } from "../../../api/chatJoinApi";
import FestivalImage from "./FestivalImage";  // 이미지를 처리하는 컴포넌트
import FestivalButton from "./FestivalButton";
import "./FestivalDetail.css";
import axios from "axios";
import {AuthContext} from "../../../context/AuthContext";

const FestivalPage = () => {
  const location = useLocation();
  const eventId = location.pathname.split('/')[2];
  console.log("Event ID from URL:", eventId);  
  const navigate = useNavigate();
  const {accessToken} = useContext(AuthContext);
  const {userId} = useContext(AuthContext);

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 축제 상세 데이터 가져오기
  useEffect(() => {
    const fetchFestivalDetails = async () => {
      try {
        console.log("Fetching festival details for ID:", eventId);
        const response = await axios.get(`/api/festivals/${eventId}`);
        console.log("API Response:", response.data);
        setEvent(response.data);
      } catch (err) {
        console.error("Error fetching festival details:", err);
        setError("축제 정보를 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchFestivalDetails();
  }, [eventId]);

  if (loading) {
    return <p>로딩 중...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!event) {
    return <p>해당 축제를 찾을 수 없습니다.</p>;
  }

  const handleEnterChatRoom = async () => {
    try {
      const chatRoomId = await joinChatRoom(event.id, accessToken);
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
      <div className="festival-image-container">
        <FestivalImage />
      </div>
      <div className="festival-details">
        <p>일시: {event.startDate} ~ {event.endDate}</p>
        <p>{event.description}</p>
      </div>
      <div className="festival-page-buttons">
        <FestivalButton label="채팅방 입장하기" onClick={handleEnterChatRoom} />
        <FestivalButton label="예약하기" />
      </div>
    </div>
  );
};

export default FestivalPage;