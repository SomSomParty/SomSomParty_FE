import React from 'react';
import '../styles/CardList.css';

const Card = ({ name, startDate, endDate, reservationDate, festivalDate }) => {
    return (
        <div className = "card">
            <div className = "card-image">
                {/*<img src = "image_url" alt = "image description" />*/}
                {/*<span>사진</span>*/}
            </div>
            <div className = "card-content">
                {startDate && endDate ? (
                    <>
                        <span className="event-date">{startDate} ~ </span>
                        <span className="event-date">{endDate}</span>
                    </>
                ) : (
                    <>
                        <span className="event-date">축제일: {festivalDate}</span><br/>
                        <span className="event-date">예매일: {reservationDate}</span>
                    </>
                )}
                <p className = "event-name">{name}</p>
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
                        key = {index}
                        name = {event.name}
                        startDate = {event.startDate}
                        endDate = {event.endDate}
                        reservationDate = {event.reservationDate}
                        festivalDate = {event.festivalDate}
                    />
                ))
            ) : (
                <p>결과가 없습니다.</p>
            )}
        </div>
    );
};

export default CardList;