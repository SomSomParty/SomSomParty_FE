import axios from "./axiosConfig";

export const getChatMessages = async (chatRoomId, lastEvaluatedSendTime, userId) => {
  const response = await axios.get(`/chatting/${chatRoomId}`, {
    params: { lastEvaluatedSendTime, userId },
  });
  return response.data; // 메시지 데이터 반환
};