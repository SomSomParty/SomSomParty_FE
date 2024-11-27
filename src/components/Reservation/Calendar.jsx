import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Calendar = ({ onDateSelect, startDate, endDate }) => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [dates, setDates] = useState([]);

  const handleDateClick = (day) => {
    const selectedFullDate = new Date(currentYear, currentMonth, day, 12).toISOString().split("T")[0]; 
    console.log(selectedFullDate);
    onDateSelect(selectedFullDate);
};


  // 연도와 월에 따른 날짜 계산
  useEffect(() => {
    const getDatesInMonth = (year, month) => {
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);
      const daysInMonth = lastDay.getDate();
      const startDay = firstDay.getDay(); // 월의 첫 번째 날짜가 시작하는 요일

      let datesArray = [];

      // 이전 달 날짜
      for (let i = startDay - 1; i >= 0; i--) {
        const prevMonthDate = new Date(year, month, -i);
        datesArray.push({ date: prevMonthDate.getDate(), isCurrentMonth: false, fullDate: prevMonthDate });
      }

      // 이번 달 날짜
      for (let i = 1; i <= daysInMonth; i++) {
        const fullDate = new Date(year, month, i);
        datesArray.push({ date: i, isCurrentMonth: true, fullDate });
      }

      // 다음 달 날짜
      const totalDays = startDay + daysInMonth;
      const remainingDays = 42 - totalDays; // 캘린더 최대 6주(42일)
      for (let i = 1; i <= remainingDays; i++) {
        const nextMonthDate = new Date(year, month + 1, i);
        datesArray.push({ date: i, isCurrentMonth: false, fullDate: nextMonthDate });
      }

      return datesArray;
    };

    setDates(getDatesInMonth(currentYear, currentMonth));
  }, [currentYear, currentMonth]);

  // 이전 달로 이동
  const handlePrevMonth = () => {
    const prevMonth = new Date(currentYear, currentMonth - 1);

    if (startDate && new Date(currentYear, currentMonth, 1) <= new Date(startDate)) {
      return;
    }

    setCurrentMonth(prevMonth.getMonth());
    setCurrentYear(prevMonth.getFullYear());
  };

  // 다음 달로 이동
  const handleNextMonth = () => {
    const nextMonth = new Date(currentYear, currentMonth + 1);

    if (endDate && new Date(currentYear, currentMonth + 1) > new Date(endDate)) {
      return;
    }

    setCurrentMonth(nextMonth.getMonth());
    setCurrentYear(nextMonth.getFullYear());
  };

  const shouldShowPrevButton = new Date(currentYear, currentMonth, 1) >= new Date(startDate);
  const shouldShowNextButton = new Date(currentYear, currentMonth, 1) <= new Date(endDate);

  const isWithinRange = (fullDate) => {
    const start = new Date(startDate).setHours(0, 0, 0, 0);
    const end = new Date(endDate).setHours(0, 0, 0, 0);
    return fullDate >= start && fullDate <= end;
  };

  return (
    <Container>
      <Header>
          <PrevButton onClick={handlePrevMonth} shouldShow={shouldShowPrevButton}>{'<'}</PrevButton>
          <MonthLabel>{currentYear}년 {currentMonth + 1}월</MonthLabel>
          <NextButton onClick={handleNextMonth} shouldShow={shouldShowNextButton}>{'>'}</NextButton>
      </Header>

      <Dates>
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <Day key={day}>{day}</Day>
        ))}
        {dates.map((item, index) => (
          item.isCurrentMonth ? (
            <Day
              key={index}
              onClick={() => handleDateClick(item.date)}
              isWithinRange={isWithinRange(item.fullDate)}
            >
              {item.date}
            </Day>
          ) : (
            <PrevMonth key={index}>{item.date}</PrevMonth>
          )
        ))}
      </Dates>
    </Container>
  );
};

export default Calendar;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 1000px;
  width: 100%;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 20px;
`;

const MonthLabel = styled.span`
  flex-grow: 1;
  text-align: center;
  font-size: 20px;
`;

const PrevButton = styled.button`
  display: ${({ shouldShow }) => (shouldShow ? 'inline' : 'none')};
  font-size: 24px;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const NextButton = styled.button`
  display: ${({ shouldShow }) => (shouldShow ? 'inline' : 'none')};
  font-size: 24px;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const Dates = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  padding: 20px;
  width: 100%;
`;

const Day = styled.div`
  font-size: 18px;
  text-align: center;
  color: ${({ isWithinRange }) => (isWithinRange ? "#000" : "#6e7781")};
  background-color: ${({ isWithinRange }) => (isWithinRange ? "#E0E0E0" : "transparent")};
  flex: 1;
  padding: 10px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: 1px solid #CFCFCF;
  border-right: none;
  border-bottom: none;
`;

const PrevMonth = styled(Day)`
  opacity: 0.5;
  background: #F0F0F0;
  cursor: default;
`;