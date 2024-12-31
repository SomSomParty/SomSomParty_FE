import React, { useState, useEffect, useContext, useRef } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Calendar from "../../components/reservation/Calendar";
import ReservationInfo from "../../components/reservation/ReservationInfo";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { jwtDecode } from "jwt-decode";

const Reservation = () => {
  const { festivalId } = useParams();
  const [selectedDate, setSelectedDate] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const {
    accessToken,
    setAccessToken,
    refreshToken,
    setRefreshToken,
    userName,
    setUserName,
    idToken,
  } = useContext(AuthContext);
  const accessTokenRef = useRef(accessToken);

  const handleLeaveQueue = async () => {
    try {
      const email = jwtDecode(idToken).email;
      await axios.delete(
        `/api/queues/festival${festivalId}/users/${email}/leave-proceed`
      );
      console.log("Successfully left the wait queue");
      return true;
    } catch (error) {
      if (error.response.data == "토큰 검증에 실패했습니다.") {
        await reissueAccessToken(); // refreshToken으로 accessToken을 재발급
      }
    }
  };

  const fetchDateRange = async () => {
    try {
      const apiResponse = await axios.get(`/api/festivals/${festivalId}`, {
        headers: {
          Authorization: `Bearer ${accessTokenRef.current}`, // 토큰을 인증 헤더로 추가
        },
      });
      setStartDate(apiResponse.data.startDate);
      setEndDate(apiResponse.data.endDate);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  // API 요청으로 축제 정보
  useEffect(() => {
    const initialize = async () => {
      try {
        // Access 토큰 갱신 및 초기화 작업
        await handleLeaveQueue();
        await fetchDateRange();
      } catch (error) {
        console.error("Initialization error:", error);
      }
    };
    // 토큰 재발급이 끝났고 accessToken이 있으면 렌더링
    initialize();
  }, []);

  const reissueAccessToken = async () => {
    try {
      const apiResponse = await axios.post(`/api/refresh-token`, null, {
        headers: {
          Refreshtoken: refreshToken, // 리프레시 토큰을 인증 헤더로 추가
        },
        params: {
          username: userName, // URL 파라미터로 사용자 이름 전달
        },
      });
      const newAccessToken = apiResponse.data.accessToken;
      console.log("accesstoken 재발급");
      setAccessToken(newAccessToken);
      accessTokenRef.current = newAccessToken;
    } catch (error) {
      if (error.response.data.message == "Refresh Token이 만료되었습니다.") {
        setAccessToken("");
        setRefreshToken("");
        setUserName("");
        alert("세션이 만료되었습니다. 다시 로그인 하세요.");
        window.location.href = "/signin";
      }
    }
  };

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
