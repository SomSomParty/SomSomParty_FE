import '../../styles/auth/SignInPage.css';
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // 페이지 이동을 위한 useNavigate
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext'; // AuthContext import

function SignInPage() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState(""); // 로그인 실패 시 에러 메시지
  const [success, setSuccess] = useState(""); // 성공 메시지 관리

  const { setAccessToken, setRefreshToken, setUserName } = useContext(AuthContext);

  const navigate = useNavigate(); 

  const handleChange = (e) => {
    const { name, value } = e.target; 
    setFormData({ ...formData, [name]: value }); 
  };

  const handleLogin = async () => {
    const { email, password } = formData;
    const apiUrl = '/api/login'; 

    try {
      console.log("로그인 요청 데이터:", formData);

      const response = await axios.post(apiUrl, {
        email, 
        password,
      });

      console.log("로그인 성공 응답:", response.data);
      setSuccess("로그인에 성공하였습니다.");
      setError("");

      // 응답 데이터에서 토큰과 사용자 이름 추출
      const { accessToken, refreshToken, userName } = response.data;

      // AuthContext에 저장
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      setUserName(userName);

      alert('로그인되었습니다!'); 
      navigate('/');
    } catch (err) {
      console.error("로그인 실패:", err.response?.data || err.message);
      setError(err.response?.data?.message || "로그인에 실패했습니다.");
      setSuccess("");
    }
  };

  return (
    <div className="Login-container">
      <h1>로그인</h1>
      {error && <p style={{ color: "red" }}>{error}</p>} 
      {success && <p style={{ color: "green" }}>{success}</p>} 
      
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

export default SignInPage;