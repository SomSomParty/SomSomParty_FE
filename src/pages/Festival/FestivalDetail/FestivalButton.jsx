import React from 'react';

const FestivalButton = ({ label, onClick }) => {
  return (
    <button style={styles.button} onClick={onClick}>
      {label}
    </button>
  );
};

const styles = {
  button: {
    padding: '10px 20px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    backgroundColor: '#fff',
    fontSize: '16px',
    cursor: 'pointer',
    margin: '0 10px',
    transition: 'background-color 0.3s ease',
  },
};

export default FestivalButton;