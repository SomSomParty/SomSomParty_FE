import React from 'react';
import '../styles/CardList.css';

const Card = ({ name, startDate, endDate }) => {
    return (
        <div className = "card">
            <div className = "card-image">
                {/*<img src = "image_url" alt = "image description" />*/}
                {/*<span>사진</span>*/}
            </div>
            <div className = "card-content">
                <span className = "event-date">{startDate}  ~  </span>
                <span className = "event-date">{endDate}</span>
                <p className = "event-name">{name}</p>
            </div>
        </div>
    );
};

const CardList = ({ events }) => {
    return (
        <div className = "card-list">
            {events && events.length > 0 ? (
                events.map((event, index) => (
                    <Card
                        key = {index}
                        name = {event.name}
                        startDate = {event.startDate}
                        endDate = {event.endDate}
                    />
                ))
            ) : (
                <p>결과가 없습니다.</p>
            )}
        </div>
    );
};

export default CardList;