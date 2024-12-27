import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from "./components/Header";
import MainPage from "./pages/main/MainPage";
import MyPage from "./pages/my/MyPage";
import Reservation from "./pages/Reservation/Reservation"
import ReservationCompleted from './pages/Reservation/ReservationCompleted';
import FestivalPage from './pages/Festival/FestivalDetail/FestivalPage';
import ChatPage from './pages/Chat/ChatPage';



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
              <Route path="/reservation" element={<Reservation />} />
              <Route path="/reservation/completed" element={<ReservationCompleted />} />
              <Route path="/festival" element={<FestivalPage />} />
              <Route path="/chat" element={<ChatPage />} />
          </Routes>
      </>
  );
};

export default App;