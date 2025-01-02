import '../../styles/auth/SignUpPage.css';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // React Router 사용

function SignUpPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [verificationCode, setVerificationCode] = useState(""); // 인증 코드 상태 관리
  const [signupSuccess, setSignupSuccess] = useState(false); // 회원가입 성공 여부
  const [error, setError] = useState(""); 
  const [success, setSuccess] = useState("");
  const navigate = useNavigate(); 
  const API_BASE_URL = process.env.REACT_APP_API_URL || "/api";
 
  const handleChange = (e) => {
    const { name, value } = e.target; 
    setFormData({ ...formData, [name]: value }); 
  };

  const handleSignup = async () => {
    const { name, email, password } = formData;
    
    try {
      console.log("회원가입 요청 데이터:", formData);

      const response = await axios.post(`${API_BASE_URL}/signup`, {
        email,
        password,
      });

      console.log("회원가입 성공 응답:", response.data);
      setSuccess(response.data); 
      setError("");
      setSignupSuccess(true); // 회원가입 성공 여부 true로 설정
    } catch (err) {
      console.error("회원가입 실패:", err.response?.data || err.message);
      setError(err.response?.data?.message || "회원가입에 실패했습니다.");
      setSuccess("");
    }
  };

  const handleVerify = async () => {
    const { name, email } = formData;

    try {
      const response = await axios.post(`${API_BASE_URL}/confirm-signup`, {
          name,
          email,
          code: verificationCode,
      });

      console.log("이메일 인증 성공 응답:", response.data);
      setSuccess("이메일 인증 성공!");
      setError("");

      alert("회원가입되었습니다.");
      navigate("/"); 
    } catch (err) {
      console.error("이메일 인증 실패:", err.response?.data || err.message);
      setError(err.response?.data?.message || "이메일 인증에 실패했습니다.");
      setSuccess("");
    }
  };

  return (
    <div className="Signup-container">
      <h1>회원가입</h1>
      {error && <p style={{ color: "red" }}>{error}</p>} 
      {success && <p style={{ color: "green" }}>{success}</p>} 
      
      <div className="Signup-input-area">
        <label>이메일</label>
        <input
          type="text"
          name="email" 
          placeholder="이메일을 입력해주세요."
          value={formData.email}
          onChange={handleChange}
          disabled={signupSuccess} // 회원가입 성공 시 입력 필드 비활성화
        />
      </div>
      <div className="Signup-input-area">
        <label>비밀번호</label>
        <input
          type="password"
          name="password"
          placeholder="비밀번호를 입력해주세요."
          value={formData.password}
          onChange={handleChange}
          disabled={signupSuccess} // 회원가입 성공 시 입력 필드 비활성화
        />
      </div>
      <div className="Signup-input-area">
        <label>이름</label>
        <input
          type="text"
          name="name" 
          placeholder="이름을 입력해주세요."
          value={formData.name}
          onChange={handleChange}
          disabled={signupSuccess} // 회원가입 성공 시 입력 필드 비활성화
        />
      </div>
      <button 
        className="Signup-button" 
        onClick={handleSignup}
        disabled={signupSuccess} // 회원가입 성공 시 버튼 비활성화
      >
        회원가입
      </button>

      {signupSuccess && ( // 회원가입 성공 시 인증 코드 입력 필드와 버튼 표시
        <div className="Verification-area">
          <h2>이메일 인증</h2>
          <div className="Verification-input-area">
            <label>인증 번호</label>
            <input
              type="text"
              placeholder="인증 번호를 입력해주세요."
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
            />
          </div>
          <button 
            className="Verification-button" 
            onClick={handleVerify}
          >
            인증 확인
          </button>
        </div>
      )}
    </div>
  );
}

export default SignUpPage;