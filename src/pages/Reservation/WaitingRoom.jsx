import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const WaitingRoom = () => {
  const { festivalId } = useParams();
  const navigate = useNavigate();
  const [userRank, setUserRank] = useState(null);

  useEffect(() => {
    registerWaitingRoom();
  }, []);

  useEffect(() => {
    const interval = setInterval(fetchUserRank, 400);
    return () => clearInterval(interval);
  }, [userRank]);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      const confirmationMessage = "대기열을 이탈하면 다시 대기해야합니다.";
      event.returnValue = confirmationMessage; // 브라우저에서 경고를 표시
      handleLeaveQueue(); // 페이지를 떠나기 전에 leave 메서드 호출
      return confirmationMessage;
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    const preventGoBack = () => {
      if (window.confirm("뒤로 가시면 대기열에서 삭제됩니다. 가시겠습니까?")) {
        handleLeaveQueue();
        window.history.back();
      } else {
        window.history.pushState(null, "", window.location.href);
      }
    };

    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", preventGoBack);

    return () => {
      window.removeEventListener("popstate", preventGoBack);
    };
  }, []);

  // 대기열에서 유저를 제거하는 함수
  const handleLeaveQueue = async () => {
    try {
      const email = "user10@example.com";
      await axios.delete(
        `/api/queues/festival${festivalId}/users/${email}/leave`
      );
      console.log("Successfully left the wait queue");
    } catch (error) {
      console.error("Error leaving the wait queue:", error);
    }
  };

  const registerWaitingRoom = async () => {
    try {
      const email = "user10@example.com";
      const response = await axios.get(
        `/api/queues/festival${festivalId}/waiting-room/users/${email}`
      );
      console.log("Response:", response.data); // 응답 데이터 확인
      setUserRank(response.data.rank); // userRank 상태 업데이트
    } catch (error) {
      console.error("Error fetching waiting room data:", error);
    }
  };

  const fetchUserRank = async () => {
    try {
      // 유저 임시 설정(로그인 구현 X)
      const email = "user10@example.com";
      const response = await axios.get(
        `/api/queues/festival${festivalId}/users/${email}/rank`
      );
      const { rank } = response.data;
      console.log(response.data);
      if (rank <= 0) {
        // 다시 한번 더 확인
        const response = await axios.get(
          `/api/queues/festival${festivalId}/users/${email}/allowed`
        );
        if (response.data.allowed) {
          navigate(`/reservation/${festivalId}`);
        }
      } else {
        console.log(rank);
        setUserRank(rank);
      }
    } catch (error) {
      console.error("Error fetching user rank:", error);
    }
  };
  return (
    <Container>
      <Circle>
        <Title>입장 대기 중입니다</Title>
        <RankLabel>현재 대기 순번</RankLabel>
        <Rank>
          {userRank !== null ? <span>{userRank}</span> : <div>계산중</div>}
        </Rank>
        <Note>잠시만 기다려주세요</Note>
      </Circle>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 80px;
  justify-content: center;
  align-items: center;
`;

const Circle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  border: 5px solid #cfcfcf;
  border-radius: 50%;
  padding: 90px;
`;

const Title = styled.div`
  font-size: 40px;
  font-weight: 600;
  text-align: left;
  padding: 20px;
`;

const RankLabel = styled.div`
  font-size: 36px;
  font-weight: 500;
  text-align: left;
  padding: 20px;
`;

const Rank = styled.div`
  font-size: 36px;
  font-weight: 500;
  text-align: left;
  color: #1198ff;
`;

const Note = styled.div`
  font-size: 30px;
  font-weight: 500;
  text-align: left;
  margin: 50px;
`;

export default WaitingRoom;
