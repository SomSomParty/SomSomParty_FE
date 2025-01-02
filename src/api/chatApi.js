import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL || "/api";

export const getChatMessages = async (chatRoomId, lastEvaluatedSendTime, userId) => {
  const response = await axios.get(`${API_BASE_URL}/festivals/chatting/${chatRoomId}`, {
    params: { lastEvaluatedSendTime, userId },
  });
  return response.data; // 메시지 데이터 반환
};