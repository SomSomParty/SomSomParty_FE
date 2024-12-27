import React from 'react';
import { useLocation } from 'react-router-dom';
import FestivalImage from './FestivalImage';
import FestivalCard from './FestivalCard';
import FestivalButton from './FestivalButton';
import './FestivalDetail.css';

const mockEvents = [
  { id: 1, name: '태안 빛축제', date: '2024-12-31', organizer: '충청남도 태안군' },
  { id: 4, name: '낭만등불축제', date: '2025-04-30', organizer: '경기도 남양주시' },
  { id: 4, name: '안산별빛마을 애니멀 & 하트빌리지 빛축제', date: '2024-12-31', organizer: '경기도 안산시' },
  { id: 5, name: '무주반딧불축제', date: '2024-09-08', organizer: '전북특졀자치도 무주군' },
  { id: 5, name: '마노르블랑 핑크뮬리축제', date: '2024-11-30', organizer: '제주도 서귀포시' }
];

const FestivalPage = () => {
  const location = useLocation();

  // URL에서 `id` 쿼리 파라미터 추출
  const searchParams = new URLSearchParams(location.search);
  const eventId = parseInt(searchParams.get('id'), 10); // 숫자로 변환

  // mockEvents에서 해당 `id`에 맞는 데이터 찾기
  const event = mockEvents.find((e) => e.id === eventId);

  if (!event) {
    return <p>해당 축제를 찾을 수 없습니다.</p>; // 유효하지 않은 `id` 처리
  }

  return (
    <div className="festival-page-container">
      <h1 className="festival-page-title">{event.name}</h1>
      <FestivalImage />
      <FestivalCard
        title={event.name}
        date={event.date}
        recruitPeriod={event.recruitPeriod}
        limit={event.limit}
        description={event.description}
      />
      <div className="festival-page-buttons">
        <FestivalButton label="채팅방 입장하기" />
        <FestivalButton label="예약하기" />
      </div>
    </div>
  );
};

export default FestivalPage;