import React from "react";
import styled from "styled-components";

const ReservationCompleted = () => {
  return (
    <Container>
      <ReservationContent>
        <TitleText>예약 완료</TitleText>
        <CheckImage
          src="https://img.icons8.com/?size=100&id=11658&format=png&color=000000"
          alt="체크 이미지"
        />
        <RectangleWrapper>
          <Rectangle />
          <ReservationInfo>예약 정보</ReservationInfo>
        </RectangleWrapper>
        <ConfirmText>확인</ConfirmText>
      </ReservationContent>
    </Container>
  );
};

export default ReservationCompleted;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 1000px;
  width: 100%;
`;

const ReservationContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 600px;
  background-color: #f5f5f5;
  padding: 30px;
  margin: 70px;
  border: 1px solid #cfcfcf;
`;

const TitleText = styled.h1`
  font-size: 40px;
  font-weight: 500;
  margin-bottom: 20px;
`;

const CheckImage = styled.img`
  width: 70px;
  height: 68px;
  margin-bottom: 20px;
`;

const RectangleWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 300px;
  margin-bottom: 20px;
`;

const Rectangle = styled.div`
  position: absolute;
  width: 90%;
  height: 100%;
  background-color: white;
  border: 1px solid #cfcfcf;
`;

const ReservationInfo = styled.p`
  position: relative;
  font-size: 24px;
  font-weight: 500;
  z-index: 1;
  text-align: center;
`;

const ConfirmText = styled.div`
  font-size: 36px;
  font-weight: 500;
  text-align: center;
  cursor: pointer;
  background-color: white;
  width: calc(100% + 60px);
  padding: 15px 0px;
  margin: 20px -30px -30px -30px;
  border-top: 1px solid #cfcfcf;
`;
