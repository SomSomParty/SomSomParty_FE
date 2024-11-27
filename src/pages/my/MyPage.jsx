import React, {useState} from 'react';
import CardList from '../../components/CardList';
import '../../styles/CardList.css';
import '../../styles/my/MyPage.css';

const MyPage = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);  // true로 변경하기

    // 임의의 이벤트 목록
    const mockEvents = [
        { id: 1, name: '태안 빛축제', date: '2024-12-31', organizer: '충청남도 태안군' },
        { id: 4, name: '낭만등불축제', date: '2025-04-30', organizer: '경기도 남양주시' },
        { id: 4, name: '안산별빛마을 애니멀 & 하트빌리지 빛축제', date: '2024-12-31', organizer: '경기도 안산시' },
        { id: 5, name: '무주반딧불축제', date: '2024-09-08', organizer: '전북특졀자치도 무주군' },
        { id: 5, name: '마노르블랑 핑크뮬리축제', date: '2024-11-30', organizer: '제주도 서귀포시' }
    ];

    return (
        <div className = "my-page-container">
            <p className = "my-page-title">내 예약 조회</p>
            {loading ? (
                <p>예약 내역을 가져오고 있습니다.</p>
            ) : (
                <CardList events = {mockEvents} />
            )}
        </div>
    );
};

export default MyPage;