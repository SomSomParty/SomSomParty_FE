import React from 'react';

const ChatInput = () => {
  const handleSendMessage = () => {
    console.log('메시지를 보냈습니다!');
  };

  return (
    <div className="chat-input-container">
      <input
        type="text"
        className="chat-input"
        placeholder="메시지를 입력하세요"
      />
      <button className="send-button" onClick={handleSendMessage}>
        전송
      </button>
    </div>
  );
};

export default ChatInput;