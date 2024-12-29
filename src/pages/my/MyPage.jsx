import { useNavigate } from 'react-router-dom';
import React, {useContext, useEffect, useState} from 'react';
import CardList from '../../components/CardList';
import axios from 'axios';
import '../../styles/CardList.css';
import '../../styles/my/MyPage.css';
import {AuthContext} from "../../context/AuthContext";

const MyPage = () => {
    const [events, setEvents] = useState([]);
    const [error, setError] = useState(null);
    const [lastId, setLastId] = useState(0);
    const [limit] = useState(8);
    const [hasMore, setHasMore] = useState(true);
    const navigate = useNavigate();
    const {accessToken} = useContext(AuthContext);

    // 예약 목록 가져오기
    const fetchReservationList = async () => {
        setError(null);
        if (!hasMore) return;

        try {
            const response = await axios.get('/api/reservations', {
                params: {
                    lastId: lastId,
                    limit: limit,
                },
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            const { reservations, hasNext } = response.data;

            setEvents((prevEvents) => [
                ...prevEvents,
                ...reservations.map((reservation) => ({
                    id: reservation.id,
                    name: reservation.festivalInfo.name,
                    reservationDate: `${reservation.reservationDate[0]}.${String(reservation.reservationDate[1]).padStart(2, '0')}.${String(reservation.reservationDate[2]).padStart(2, '0')}`,
                    festivalDate: `${reservation.festivalDate[0]}.${String(reservation.festivalDate[1]).padStart(2, '0')}.${String(reservation.festivalDate[2]).padStart(2, '0')}`
                })),
            ]);

            setLastId(response.data.lastId != null ? response.data.lastId : reservations[reservations.length - 1].id);
            setHasMore(hasNext);
        } catch (err) {
            setError('예약 목록을 불러오는 중 문제가 발생했습니다.');
        }
    };

    useEffect(() => {
        fetchReservationList();
    }, []);

    // 카드 클릭 시 이벤트 처리
    const handleEventClick = (eventId) => {
        navigate(`/festival?id=${eventId}`); // `/festival` 경로로 이동
    };

    return (
        <div className="my-page-container">
            <div className="my-page-header">
                <p
                    className="my-page-link"
                    onClick={() => navigate('/chat')}
                >
                    내 채팅방
                </p>
                <p className="my-page-title">내 예약 조회</p>
            </div>
            {events.length > 0 ? (
                <>
                    <CardList events={events} />
                    {hasMore && (
                        <button className="more-button" onClick={fetchReservationList}>
                            더 보기
                        </button>
                    )}
                </>
            ) : (
                <p>예약 내역이 없습니다.</p>
            )}
        </div>
    );
};

export default MyPage;