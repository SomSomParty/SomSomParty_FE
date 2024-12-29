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

// 채팅방 나가기
export const leaveChatRoom = async (userId, chatRoomId) => {
  try {
    const response = await axios.delete(
      `/api/festivals/chatting/delete/${userId}`,
      { params: { chatRoomId } } // query parameter로 chatRoomId 전달
    );
    return response.data; // 데이터 반환
  } catch (error) {
    console.error("채팅방 나가기 중 오류:", error);
    throw error;
  }
};