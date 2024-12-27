import React from 'react';
import FestivalImage from './FestivalImage';
import FestivalCard from './FestivalCard';
import FestivalButton from './FestivalButton';
import './FestivalDetail.css';
const FestivalPage = () => {
  return (
    <div className="festival-page-container">
      <h1 className="festival-page-title">축제 상세 페이지</h1>
      <FestivalImage />
      <FestivalCard
        title="축제 이름"
        date="2024년 11월 13일"
        recruitPeriod="2024년 11월 15일 ~ 2024년 11월 30일"
        limit="n명"
        description="관련 설명입니다. 축제에 대한 설명을 작성하세요."
      />
      <div className="festival-page-buttons">
        <FestivalButton label="채팅방 입장하기" />
        <FestivalButton label="예약하기" />
      </div>
    </div>
  );
};

export default FestivalPage;