import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Calendar from "../../components/reservation/Calendar";
import ReservationInfo from "../../components/reservation/ReservationInfo";
import axios from "axios";

const Reservation = () => {
  const { festivalId } = useParams();
  const [selectedDate, setSelectedDate] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // 대기 완료 열에서 유저를 제거하는 함수(로그인 시 이메일 하드 코딩 변경 예정)
  const handleLeaveQueue = async () => {
    try {
      const email = "user10@example.com";
      await axios.delete(
        `/api/queues/festival${festivalId}/users/${email}/leave-proceed`
      );
      console.log("Successfully left the wait queue");
    } catch (error) {
      console.error("Error leaving the wait queue:", error);
    }
  };

  // API 요청으로 축제 정보
  useEffect(() => {
    const fetchDateRange = async () => {
      const apiResponse = await axios.get(`/api/festivals/${festivalId}`);
      setStartDate(apiResponse.data.startDate);
      setEndDate(apiResponse.data.endDate);
      setIsLoading(false);
    };

    handleLeaveQueue();
    fetchDateRange();
  }, []);

  // 날짜 변경 핸들러
  const handleDateChange = (date) => {
    setSelectedDate(date); // Calendar에서 선택된 날짜 업데이트
  };

  if (isLoading) {
    return <div>로딩 중...</div>; // 로딩 메시지 표시
  }

  return (
    <Container>
      <Calendar
        onDateSelect={handleDateChange}
        startDate={startDate}
        endDate={endDate}
      />
      <ReservationInfo festivalId={festivalId} selectedDate={selectedDate} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  padding: 30px;
  gap: 100px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export default Reservation;
