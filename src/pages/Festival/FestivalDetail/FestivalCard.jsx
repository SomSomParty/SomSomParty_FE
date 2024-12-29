import React from 'react';

const FestivalCard = ({ title, date, recruitPeriod, limit, description }) => {
  return (
    <div style={styles.card}>
      <h2 style={styles.title}>{title}</h2>
      <p><strong>일시:</strong> {date}</p>
      <p><strong>모집일:</strong> {recruitPeriod}</p>
      <p><strong>제한 인원:</strong> {limit}</p>
      <p>{description}</p>
    </div>
  );
};

const styles = {
  card: {
    textAlign: 'left',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '10px',
    backgroundColor: '#f9f9f9',
    marginBottom: '20px',
  },
  title: {
    fontSize: '20px',
    marginBottom: '10px',
  },
};

export default FestivalCard;