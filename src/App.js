import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from "./components/Header";
import MainPage from "./pages/main/MainPage";
import MyPage from "./pages/my/MyPage";
import Reservation from "./pages/Reservation/Reservation"
import ReservationCompleted from './pages/Reservation/ReservationCompleted';
import SignInPage from './pages/auth/SignInPage';
import SignUpPage from './pages/auth/SignUpPage';

import { AuthProvider } from './context/AuthContext';

import { requestPermission } from './fireabse/firebaseConfig';

const App = () => {
  useEffect(() => {
    requestPermission(); // 알림 권한 요청
  }, []);

  return (
    <>
      <AuthProvider>
        <Header />
          <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/mypage" element={<MyPage />} />
              <Route path="/reservation" element={<Reservation />} />
              <Route path="/reservation/completed" element={<ReservationCompleted />} />
              <Route path="/signin" element={<SignInPage />} />
              <Route path="/signup" element={<SignUpPage />} />
          </Routes>
      </AuthProvider>
    </>
  );
};

export default App;