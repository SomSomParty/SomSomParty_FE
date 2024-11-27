import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from "./components/Header";
import MainPage from "./pages/main/MainPage";
import MyPage from "./pages/my/MyPage";

const App = () => {
  return (
      <>
        <Header />
          <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/mypage" element={<MyPage />} />
          </Routes>
      </>
  );
};

export default App;