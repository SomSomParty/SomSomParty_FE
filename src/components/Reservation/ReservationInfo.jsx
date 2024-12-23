import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const ReservationInfo = ({ selectedDate, maxCapacity }) => {
  const [number, setNumber] = useState(1);
  const navigate = useNavigate();

  const handleMinus = () => {
    if (number > 1) {
      setNumber(number - 1);
    }
  };

  const handlePlus = () => {
    if (number < maxCapacity) {
      setNumber(number + 1);
    }
  };

  const handleNext = () => {
    navigate("/reservation/completed");
  };

  return (
    <Container>
      <ReservationContainer>
        <ReservationText>예약하기</ReservationText>
        <ContentWrapper>
          <RectangleWrapper>
            <Rectangle />
            <DateText x="20" y="33">
              {selectedDate}
            </DateText>
          </RectangleWrapper>

          <MaxText>최대 예약 가능 인원: {maxCapacity}</MaxText>
          <SelectContainer>
            <SelectText>인원을 선택하세요.</SelectText>
            <CounterWrapper>
              <Minus onClick={handleMinus}>-</Minus>
              <Number>{number}</Number>
              <Plus onClick={handlePlus}>+</Plus>
            </CounterWrapper>
          </SelectContainer>
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

const SelectContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SelectText = styled.div`
  font-size: 28px;
  font-weight: 500;
  text-align: left;
`;

const CounterWrapper = styled.div`
  display: flex;
  background-color: white;
  & > * {
    margin: 0;
    padding: 5px 15px; /* 필요한 padding 값 */
    box-sizing: border-box;
    border: 1px solid #cfcfcf;
  }
`;

const Minus = styled.p`
  font-size: 30px;
  font-weight: 500;
  cursor: pointer;
`;

const Plus = styled.p`
  font-size: 30px;
  font-weight: 500;
  cursor: pointer;
`;

const Number = styled.p`
  font-size: 30px;
  font-weight: 500;
  width: 50px;
`;

const MaxText = styled.div`
  font-size: 28px;
  font-weight: 500;
  text-align: left;
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
