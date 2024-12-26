import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const ReservationInfo = ({ festivalId, selectedDate }) => {
  const navigate = useNavigate();
  console.log(festivalId);

  const handleNext = async () => {
    // 로그인 시 이메일 하드 코딩 변경 예정
    try {
      const apiResponse = await axios.post("/api/reservations", {
        userId: 1,
        festivalId: festivalId,
        festivalDate: selectedDate
      });
      navigate("/reservation/completed");
    } catch (error) {
      alert(error.response.data.message);
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
