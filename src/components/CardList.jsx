import React from 'react';
import '../styles/CardList.css';

const Card = ({ name, date, organizer, onClick }) => {
    return (
        <div className="card" onClick={onClick}> {/* 클릭 이벤트 추가 */}
            <div className="card-image">
                <span>사진</span>
            </div>
            <div className="card-content">
                <p className="event-date">{date}</p>
                <p className="event-name">{name}</p>
                <p className="event-organizer">{organizer}</p>
            </div>
        </div>
    );
};

const CardList = ({ events, onEventClick }) => {
    return (
        <div className="card-list">
            {events && events.length > 0 ? (
                events.map((event) => (
                    <Card
                        key={event.id} // 각 이벤트의 고유 ID를 key로 사용
                        name={event.name}
                        date={event.date}
                        organizer={event.organizer}
                        onClick={() => onEventClick(event.id)} // 클릭 이벤트 처리
                    />
                ))
            ) : (
                <p>결과가 없습니다.</p>
            )}
        </div>
    );
};

export default CardList;