import '../../styles/auth/LoginPage.css';
import React, { useState } from 'react';

function LoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target; 
    setFormData({ ...formData, [name]: value }); 
  };

  const handleLogin = () => {
    console.log('로그인 데이터:', formData);
 
  };

  return (
    <div className="Login-container">
      <h1>로그인</h1>
      <div className="Login-input-area">
        <label>이메일</label>
        <input
          type="text"
          name="email" 
          placeholder="이메일을 입력해주세요."
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div className="Login-input-area">
        <label>비밀번호</label>
        <input
          type="password"
          name="password"
          placeholder="비밀번호를 입력해주세요."
          value={formData.password}
          onChange={handleChange}
        />
      </div>
        <button className="Login-button" onClick={handleLogin}>
          로그인
        </button>
    </div>
  );
}

export default LoginPage;