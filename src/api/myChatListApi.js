import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL || "/api";

// 채팅방 리스트 가져오기
export const getChatRoomList = async (accessToken) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/festivals/chatting/list`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    return response.data; // 데이터 반환
  } catch (error) {
    console.error("Error fetching chat room list:", error);
    throw error;
  }
};

// 채팅방 나가기
export const leaveChatRoom = async (accessToken, chatRoomId) => {
  try {
    const response = await axios.delete(
      `${API_BASE_URL}/festivals/chatting/delete`,
        { params: { chatRoomId }, headers: { Authorization: `Bearer ${accessToken}`} } // query parameter로 chatRoomId 전달
    );
    return response.data; // 데이터 반환
  } catch (error) {
    console.error("채팅방 나가기 중 오류:", error);
    throw error;
  }
};