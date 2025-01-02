import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CardList from '../../components/CardList';
import '../../styles/CardList.css';
import '../../styles/main/MainPage.css';

const MainPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [events, setEvents] = useState([]);
    const [error, setError] = useState(null);
    const [lastId, setLastId] = useState(0);
    const [limit] = useState(8);
    const [hasMore, setHasMore] = useState(true);
    const navigate = useNavigate(); // 페이지 이동을 위한 navigate
    const API_BASE_URL = process.env.REACT_APP_API_URL || "/api";

    console.log(API_BASE_URL);
    // 축제 목록 가져오기
    const fetchFestivalList = async () => {
        setError(null);
        if (!hasMore) return;

        try {
            const endpoint = searchQuery.trim() ? `${API_BASE_URL}/festivals/search` : `${API_BASE_URL}/festivals`;
            const params = searchQuery.trim()
            ? { lastId, limit: limit, keyword: searchQuery }
            : { lastId, limit: limit };

            const response = await axios.get(endpoint, { params });
            const { festivals, hasNext } = response.data;
            setEvents((prevEvents) => [
                ...prevEvents,
                ...festivals.map((festival) => ({
                    festivalId: festival.id,
                    name: festival.name,
                    startDate: festival.startDate.replace(/-/g, '.'),
                    endDate: festival.endDate.replace(/-/g, '.'),
                })),
            ]);
            setLastId(response.data.lastId != null ? response.data.lastId : festivals[festivals.length - 1]?.id || 0);
            setHasMore(hasNext);
        } catch (err) {
            setError('축제 목록을 불러오는 중 문제가 발생했습니다.');
        }
    };

    // 초기 데이터 로드
    useEffect(() => {
        fetchFestivalList();
    }, []);

    // 축제 카드 클릭 시 상세 페이지로 이동
    const handleEventClick = (eventId) => {
        console.log(eventId);
        navigate(`/festival-detail/${eventId}`); // `/festival` 경로로 이동
    };

    // 검색어 입력 시 상태 업데이트
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    // 엔터 키 입력 시 검색 실행
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            fetchSearchResults();
        }
    };

    // 검색 버튼 클릭 시 검색 실행
    const handleSearchClick = () => {
        fetchSearchResults();
    };

    // 검색 결과 가져오기
    const fetchSearchResults = async () => {
        setError(null);
        if (!searchQuery.trim()) {
            setLastId(0);
            setHasMore(true);
            setEvents([]); // 기존 데이터를 초기화
            fetchFestivalList(); // 검색어가 비어있다면 기본 축제 목록 로드
            return;
        }

        try {
            const response = await axios.get(`${API_BASE_URL}/festivals/search`, {
                params: { lastId: 0, limit: limit, keyword: searchQuery },
            });
            const { festivals, hasNext } = response.data;
            setEvents(
                festivals.map((festival) => ({
                    festivalId: festival.id,
                    name: festival.name,
                    startDate: festival.startDate.replace(/-/g, '.'),
                    endDate: festival.endDate.replace(/-/g, '.'),
                }))
            );
            setLastId(response.data.lastId != null ? response.data.lastId : festivals[festivals.length - 1]?.id || 0);
            setHasMore(hasNext);
        } catch (err) {
            setError('검색 결과를 불러오는 중 문제가 발생했습니다.');
        }
    };

    return (
        <div className="main">
            <div className="search-container">
                <input
                    type="text"
                    className="search-input"
                    placeholder="축제를 검색하세요"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    onKeyDown={handleKeyPress}
                />
                <button className="search-button" onClick={handleSearchClick}>
                    <img src="/searchIcon.png" alt="Search" className="search-icon" />
                </button>
            </div>
            <CardList events={events} onEventClick={handleEventClick} />
            {hasMore && (
                <button className="more-button" onClick={fetchFestivalList}>
                    더 보기
                </button>
            )}
            {error && <div className="error-message">{error}</div>}
        </div>
    );
};

export default MainPage;