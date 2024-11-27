import React from 'react';
import '../styles/CardList.css';

const Card = ({ name, date, organizer }) => {
    return (
        <div className = "card">
            <div className = "card-image">
                {/*<img src = "image_url" alt = "image description" />*/}
                <span>사진</span>
            </div>
            <div className = "card-content">
                <p className = "event-date">{date}</p>
                <p className = "event-name">{name}</p>
                <p className = "event-organizer">{organizer}</p>
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
                        date = {event.date}
                        organizer = {event.organizer}
                    />
                ))
            ) : (
                <p>결과가 없습니다.</p>
            )}
        </div>
    );
};

export default CardList;