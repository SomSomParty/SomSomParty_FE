import '../../styles/auth/LoginPage.css';

function LoginPage() {
  return (
    <div className="Login-container">
      <h1>로그인</h1>
      <div className="Login-input-area">
        <label>이메일</label>
        <input type="text" placeholder="이메일을 입력해주세요."></input>
      </div>
      <div className="Login-input-area">
        <label>비밀번호</label>
        <input type="password" placeholder="비밀번호를 입력해주세요."></input>
      </div>
      <div className="Login-button">
        로그인
      </div>
    </div>
  );
}

export default LoginPage;
