import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from "./components/Header";
import MainPage from "./pages/main/MainPage";
import MyPage from "./pages/my/MyPage";
import Reservation from "./pages/Reservation/Reservation"
import ReservationCompleted from './pages/Reservation/ReservationCompleted';

const App = () => {
  return (
      <>
        <Header />
          <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/mypage" element={<MyPage />} />
              <Route path="/reservation" element={<Reservation />} />
              <Route path="/reservation/completed" element={<ReservationCompleted />} />
          </Routes>
      </>
  );
};

export default App;