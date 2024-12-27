import React, {useEffect, useState} from 'react';
import CardList from '../../components/CardList';
import axios from 'axios';
import '../../styles/CardList.css';
import '../../styles/my/MyPage.css';

const MyPage = () => {
    const [events, setEvents] = useState([]);
    const [error, setError] = useState(null);
    const [lastId, setLastId] = useState(0);
    const [limit] = useState(8);
    const [hasMore, setHasMore] = useState(true);

    // 예약 목록 가져오기
    const fetchReservationList = async () => {
        setError(null);
        if (!hasMore) return;

        try {
            // TODO: 로그인한 유저 정보로 변경하기
            const response = await axios.get('/api/reservations', {
                params: {
                    userId: 1,
                    lastId: lastId,
                    limit: limit,
                },
            });

            const { reservations, hasNext } = response.data;

            setEvents((prevEvents) => [
                ...prevEvents,
                ...reservations.map((reservation) => ({
                    id: reservation.id,
                    name: reservation.festivalInfo.name,
                    reservationDate: reservation.reservationDate,
                    // festivalDate: reservation.festivalDate
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

    return (
        <div className="my-page-container">
            <p className="my-page-title">내 예약 조회</p>
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