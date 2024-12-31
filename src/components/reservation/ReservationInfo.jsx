import axios from "axios";
import React, { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../../context/AuthContext";

const ReservationInfo = ({ festivalId, selectedDate }) => {
  const navigate = useNavigate();
  const {
    accessToken,
    setAccessToken,
    refreshToken,
    setRefreshToken,
    userName,
    setUserName,
  } = useContext(AuthContext);
  const accessTokenRef = useRef(accessToken);

  const handleNext = async () => {
    try {
      await axios.post(
        "/api/reservations",
        {
          festivalId: festivalId,
          festivalDate: selectedDate,
        },
        {
          headers: {
            Authorization: `Bearer ${accessTokenRef.current}`,
          },
        }
      );
      navigate("/reservation/completed");
    } catch (error) {
      if (error.response.data == "토큰 검증에 실패했습니다.") {
        const status = await reissueAccessToken();
        if (status === true) {
          console.log(status);
          await handleNext();
        }
      } else {
        alert(error.response.data.message);
      }
    }
  };

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
      return true;
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
  return (
    <Container>
      <ReservationContainer>
        <ReservationText>예약하기</ReservationText>
        <ContentWrapper>
          <RectangleWrapper>
            <Rectangle />
            <DateText x="20" y="33">
              {selectedDate ? selectedDate : "날짜를 선택하세요"}
            </DateText>
          </RectangleWrapper>
        </ContentWrapper>
        <NextText onClick={handleNext}>다음</NextText>
      </ReservationContainer>
    </Container>
  );
};

export default ReservationInfo;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 450px;
  width: 100%;
`;

const ReservationContainer = styled.div`
  background-color: #f0f0f0;
  border: 1px solid #cfcfcf;
  padding: 20px;
  margin-top: 20px;
`;

const ReservationText = styled.div`
  font-size: 30px;
  font-weight: 500;
  text-align: left;
  margin-bottom: 20px;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const RectangleWrapper = styled.svg`
  display: inline-flex;
  flex-direction: column;
  width: 100%;
  min-width: 400px;
  height: 50px;
`;

const Rectangle = styled.rect`
  width: 100%;
  height: 100%;
  fill: white;
  stroke: #cfcfcf;
  stroke-width: 0.5;
`;

const DateText = styled.text`
  font-size: 25px;
  font-weight: 400;
`;

const NextText = styled.div`
  font-size: 36px;
  font-weight: 500;
  text-align: center;
  cursor: pointer;
  background-color: white;
  padding: 10px;
  margin: 300px -20px -20px -20px;
`;
