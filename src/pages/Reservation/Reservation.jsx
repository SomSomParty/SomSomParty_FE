import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Calendar from '../../components/Reservation/Calendar';
import ReservationInfo from '../../components/Reservation/ReservationInfo';
const Reservation = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [maxCapacity, setMaxCapacity] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    
    // API 요청으로 축제 정보
    useEffect(() => {
        const fetchDateRange = async () => {
        const apiResponse = {
            start_date: "2024-11-01", // 예제: 2024년 10월 1일
            end_date: "2025-01-10", // 예제: 2024년 11월 10일
            max_capacity: 4,
        };
        setStartDate(apiResponse.start_date);
        setEndDate(apiResponse.end_date);
        setMaxCapacity(apiResponse.max_capacity);
        setIsLoading(false);
        };

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
            <Calendar onDateSelect={handleDateChange} startDate={startDate} endDate={endDate}/>
            <ReservationInfo selectedDate={selectedDate} maxCapacity={maxCapacity}/>
        </Container>
    );
}

const Container = styled.div`
  display: flex;
  padding: 30px;
  gap: 100px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export default Reservation;