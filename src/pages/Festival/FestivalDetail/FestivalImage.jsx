import React from 'react';

const FestivalImage = () => {
  return (
    <div style={styles.imageContainer}>
      <div style={styles.image}>사진</div>
    </div>
  );
};

const styles = {
  imageContainer: {
    marginBottom: '20px',
    textAlign: 'center',
  },
  image: {
    width: '300px',
    height: '200px',
    backgroundColor: '#ddd',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '16px',
    color: '#666',
    borderRadius: '10px',
  },
};

export default FestivalImage;