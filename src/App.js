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

import SignInPage from './pages/auth/SignInPage';
import SignUpPage from './pages/auth/SignUpPage';

import { AuthProvider } from './context/AuthContext';
// import { requestPermission } from './fireabse/firebaseConfig';

const App = () => {
  return (
    <>
      <AuthProvider>
        <Header />
          <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/mypage" element={<MyPage />} />
              <Route path="/reservation/:festivalId" element={<Reservation />} />
              <Route path="/reservation/completed" element={<ReservationCompleted />} />
              <Route path="/festival-detail/:id" element={<FestivalPage />} />
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/chat-room" element={<ChatRoom />} />
              <Route path="/signin" element={<SignInPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/waiting-room/:festivalId" element={<WaitingRoom />} />
          </Routes>
      </AuthProvider>
    </>
  );
};

export default App;