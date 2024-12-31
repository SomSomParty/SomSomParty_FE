import axios from "axios";

// 채팅방 참여 API
export const joinChatRoom = async (chatRoomId, accessToken) => {
  try {
    const response = await axios.post(`/api/festivals/chatting/${chatRoomId}/join`, null, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
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
    const response = await axios.get(`/api/festivals/chatting/${chatRoomId}`, {
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