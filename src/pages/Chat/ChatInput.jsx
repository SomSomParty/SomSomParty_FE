import React from 'react';

const ChatInput = () => {
  return (
    <div className="chat-input">
      <input type="text" placeholder="메시지를 입력하세요" />
      <button>전송</button>
    </div>
  );
};

export default ChatInput;