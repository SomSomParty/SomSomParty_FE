import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from "./components/Header";
import MainPage from "./pages/main/MainPage";
import MyPage from "./pages/my/MyPage";
import Reservation from "./pages/reservation/Reservation"
import ReservationCompleted from './pages/reservation/ReservationCompleted';
import WaitingRoom from "./pages/reservation/WaitingRoom";
import FestivalPage from './pages/Festival/FestivalDetail/FestivalPage';
import ChatPage from './pages/Chat/ChatPage';
import ChatRoom from './pages/Chat/ChatRoom';

import { requestPermission } from './fireabse/firebaseConfig';

const App = () => {
  useEffect(() => {
    requestPermission();
  }, []);
  return (
      <>
        <Header />
          <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/mypage" element={<MyPage />} />
              <Route path="/reservation/:festivalId" element={<Reservation />} />
              <Route path="/reservation/completed" element={<ReservationCompleted />} />
              <Route path="/festival" element={<FestivalPage />} />
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/chat-room" element={<ChatRoom />} />
              <Route path="/waiting-room/:festivalId" element={<WaitingRoom />} />
          </Routes>
      </>
  );
};

export default App;