import React, {useState, useEffect, useRef, useContext} from "react";
import "./ChatRoom.css";
import { getChatMessages } from "../../api/chatApi"; // 메시지 가져오는 API 호출 함수
import { Stomp } from "@stomp/stompjs";

const ChatRoom = ({ chat, messages: initialMessages }) => {
  const userId = Number(localStorage.getItem("userId"));
  const userNickname = localStorage.getItem("userNickname");
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [lastEvaluatedSendTime, setLastEvaluatedSendTime] = useState(null);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const [stompClient, setStompClient] = useState(null); // Stomp client 상태
  const stompClientRef = useRef(null);

  const socketUrl = "wss://somsomparty.store/ws-chat"; // WebSocket 서버 URL

  // 시간 형식 변환 함수
  const formatTime = (epochSeconds) => {
    const date = new Date(epochSeconds * 1000);
    return date.toLocaleString("ko-KR", {
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // 메시지 초기화 및 시간순 정렬
  useEffect(() => {
    if (Array.isArray(initialMessages)) {
      const formattedMessages = initialMessages
        .map((message) => ({
          ...message,
          isMyMessage: message.senderId === userId,
        }))
        .sort((a, b) => a.sendTime - b.sendTime); // 시간순 정렬
      setMessages(formattedMessages);

      if (initialMessages.length > 0) {
        setLastEvaluatedSendTime(
          initialMessages[initialMessages.length - 1].sendTime
        );
      }
    }
  }, [initialMessages]);

  // WebSocket 연결
  useEffect(() => {
    const client = Stomp.over(() => new WebSocket(socketUrl));    
    client.reconnectDelay = 5000;
  
    client.connect({ userId: userId, chatRoomId: chat.id }, () => {
      console.log("웹소켓 연결 성공");
  
      client.subscribe(`/topic/chat/chatRoomId${chat.id}`, (message) => {
        const newMessage = JSON.parse(message.body);
        if (newMessage.senderId === userId) return;
  setMessages((prevMessages) => {
    const isDuplicate = prevMessages.some(
      (msg) =>
        msg.sendTime === newMessage.sendTime &&
        msg.senderId === newMessage.senderId
    );
    if (isDuplicate) return prevMessages;

    return [
      ...prevMessages,
      { ...newMessage, isMyMessage: newMessage.senderId === userId },
    ];
        });
      });
    });
  
    setStompClient(client);
    stompClientRef.current = client;
  
    return () => {
      if (stompClientRef.current) {
        // 헤더를 포함한 DISCONNECT 요청
        stompClientRef.current.disconnect(
          () => {
            console.log("웹소켓 연결 종료");
          },
          { userId: userId, chatRoomId: chat.id } // 헤더 추가
        );
      }
    };
  }, [chat.id]);

  // 스크롤을 항상 최신 메시지에 고정
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 이전 메시지 로드
  const loadPreviousMessages = async () => {
    if (loading || !lastEvaluatedSendTime) return; // 이미 로딩 중이거나 더 가져올 메시지가 없으면 종료
    setLoading(true);

    const currentScrollHeight = messagesContainerRef.current.scrollHeight;
    const currentScrollTop = messagesContainerRef.current.scrollTop;

    try {
      const previousMessages = await getChatMessages(
          chat.id,
          lastEvaluatedSendTime,
          userId
      );
      if (previousMessages.messages?.length > 0) {
        const formattedMessages = previousMessages.messages.map((message) => ({
          ...message,
          isMyMessage: message.senderId === userId,
        }));
        setMessages((prev) => [...formattedMessages, ...prev]);
        setLastEvaluatedSendTime(previousMessages.lastEvaluatedSendTime);

        setTimeout(() => {
          const newScrollHeight = messagesContainerRef.current.scrollHeight;
          messagesContainerRef.current.scrollTop =
            newScrollHeight - currentScrollHeight + currentScrollTop;
        }, 0);
      }
    } catch (error) {
      console.error("이전 메시지를 가져오는 중 오류:", error);
    } finally {
      setLoading(false);
    }
  };

  // 스크롤 이벤트 핸들러
  const handleScroll = () => {
    if (messagesContainerRef.current.scrollTop === 0) {
      loadPreviousMessages();
    }
  };

  // 메시지 전송
  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const messageData = {
      senderId: userId,
      senderName: userNickname,
      content: newMessage,
      sendTime: Math.floor(Date.now() / 1000),
      chatRoomId: chat.id,
    };
    console.log(messageData.sendTime)
    const localMessage = {
      ...messageData,
      isMyMessage: true,
    };
    setMessages((prevMessages) => [...prevMessages, localMessage]);

    if (stompClient && stompClient.connected) {
      stompClient.send("/publish/chat.send", {}, JSON.stringify(messageData));
      setNewMessage("");
    } else {
      console.error("WebSocket 연결이 유효하지 않습니다.");
    }
  };

  if (!chat) {
    return <div className="placeholder">채팅방을 선택하세요.</div>;
  }

  return (
    <div className="chat-room-container">
      <div className="chat-room-header">{chat.title}</div>
      <div
        className="chat-room-messages"
        onScroll={handleScroll}
        ref={messagesContainerRef}
      >
        {messages.map((message, index) => (
          <div
            key={index}
            className={`chat-message ${
              message.isMyMessage ? "my-message" : "other-message"
            }`}
          >
            {!message.isMyMessage && (
              <span className="chat-message-sender">{message.senderName}</span>
            )}
            <div
              className={`chat-message-content ${
                message.isMyMessage ? "my-message" : "other-message"
              }`}
            >
              {message.content}
              <span className="message-time">
                {formatTime(message.sendTime)}
              </span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="chat-input-container">
        <input
          type="text"
          className="chat-input"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="메시지를 입력하세요"
        />
        <button className="send-button" onClick={handleSendMessage}>
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 21l21-9L2 3v7l15 2-15 2v7z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ChatRoom;