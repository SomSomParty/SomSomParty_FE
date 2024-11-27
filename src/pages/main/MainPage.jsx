import React, {useEffect, useState} from 'react';
import CardList from '../../components/CardList';
import '../../styles/CardList.css';
import '../../styles/main/MainPage.css';
import { useNavigate } from 'react-router-dom';

const MainPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);

    // 임의의 이벤트 목록
    const mockEvents = [
        { id: 1, name: '태안 빛축제', date: '2024-12-31', organizer: '충청남도 태안군' },
        { id: 4, name: '낭만등불축제', date: '2025-04-30', organizer: '경기도 남양주시' },
        { id: 4, name: '안산별빛마을 애니멀 & 하트빌리지 빛축제', date: '2024-12-31', organizer: '경기도 안산시' },
        { id: 5, name: '무주반딧불축제', date: '2024-09-08', organizer: '전북특졀자치도 무주군' },
        { id: 5, name: '마노르블랑 핑크뮬리축제', date: '2024-11-30', organizer: '제주도 서귀포시' }
    ];

    // 검색어 입력 시 상태 업데이트
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    // 엔터 키를 눌렀을 때 검색 결과 가져오기
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            filterEvents();
        }
    };

    // 검색어에 맞는 이벤트 필터링
    const filterEvents = () => {
        const filteredEvents = mockEvents.filter(event =>
            event.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setEvents(filteredEvents);
    };

    // 검색 버튼 클릭 시 결과 가져오기
    const handleSearchClick = () => {
        filterEvents();
    };

    // 검색어에 따라 이벤트 필터링
    useEffect(() => {
        if (searchQuery === '') {
            setEvents(mockEvents); // 검색어가 비어 있으면 모든 이벤트를 표시
        }
    }, [searchQuery]);


    return (
        <div className = "main">
            <div className = "search-container">
                <input
                    type = "text"
                    className = "search-input"
                    placeholder = "축제를 검색하세요"
                    value = {searchQuery}
                    onChange = {handleSearchChange}
                    onKeyDown = {handleKeyPress}
                />
                <button className = "search-button" onClick = {handleSearchClick}>
                    <img src = "/searchIcon.png" alt = "Search" className = "search-icon" />
                </button>
            </div>
            {loading && <p>검색 결과를 불러오고 있습니다.</p>}
            <CardList events = {events} />
        </div>
    );
};

export default MainPage;