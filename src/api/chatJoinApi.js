import axios from "./axiosConfig";

// 채팅방 참여 API
export const joinChatRoom = async (chatRoomId, userId) => {
  try {
    const response = await axios.post(`/chatting/${chatRoomId}/join`, {}, {
      params: { userId },
    });
    return response.data; // 반환된 chatRoomId
  } catch (error) {
    console.error("채팅방 참여 중 에러 발생:", error);
    throw error;
  }
};

// 채팅방 진입 API
export const enterChatRoom = async (chatRoomId, userId, lastEvaluatedSendTime = null) => {
  try {
    const response = await axios.get(`/chatting/${chatRoomId}`, {
      params: {
        userId,
        lastEvaluatedSendTime, // 서버로부터 받은 값을 전달
        limit: 10, // 메시지 페이지 당 개수
      },
    });
    console.log("API 응답 데이터:", response.data);
    console.log("API 응답 메시지:", response.data.messages);
    return response.data; // 반환된 메시지 데이터
  } catch (error) {
    console.error("채팅방 진입 중 에러 발생:", error);
    throw error;
  }
};