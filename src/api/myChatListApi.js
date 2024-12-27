import axios from "axios";

// 채팅방 리스트 가져오기
export const getChatRoomList = async (userId) => {
  try {
    const response = await axios.get(`/api/festivals/chatting/list/${userId}`);
    return response.data; // 데이터 반환
  } catch (error) {
    console.error("Error fetching chat room list:", error);
    throw error;
  }
};