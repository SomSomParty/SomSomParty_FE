import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const ReservationCompleted = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <ReservationContent>
        <CheckImage
          src="https://img.icons8.com/?size=100&id=11658&format=png&color=000000"
          alt="체크 이미지"
        />
        <TitleText>예약이 확정되었습니다.</TitleText>
        <ConfirmText onClick={() => navigate('/mypage')}>확인</ConfirmText>
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
  width: 500px;
  background-color: #f5f5f5;
  padding: 30px;
  margin: 70px;
  border: 1px solid #cfcfcf;
`;

const CheckImage = styled.img`
  width: 70px;
  height: 68px;
  padding: 40px 30px;
`;

const TitleText = styled.h1`
  font-size: 40px;
  font-weight: 500;
  padding-bottom: 120px;
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
