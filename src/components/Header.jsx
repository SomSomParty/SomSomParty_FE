import React, { useContext } from 'react';
import '../styles/Header.css';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

import { AuthContext } from '../context/AuthContext';

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const { accessToken, setAccessToken, setRefreshToken, setUserName } = useContext(AuthContext);

    // 로고 클릭 이벤트 핸들러
    const handleLogoClick = () => {
        if (location.pathname === '/') {
            window.location.reload();
        } else {
            navigate('/');
        }
    };

    const handleLogout = async () => {
        const apiUrl = '/signout'; 

        try {
            console.log("로그아웃 요청 전송");
            
            await axios.post(apiUrl, null, {
                headers: {
                    Authorization: `Bearer ${accessToken}`, // 토큰 추가
                },
            });

            console.log("로그아웃 성공");

            setAccessToken("");
            setRefreshToken("");
            setUserName("");

            alert("로그아웃되었습니다.");
            navigate('/');
        } catch (err) {
            alert("로그아웃에 실패하였습니다. 다시 시도해주세요.");
            console.error("로그아웃 실패:", err.response?.data || err.message);
        }
    };

    return (
        <header className="header">
            <div
                className="logo"
                onClick={handleLogoClick}
            >
                <span>Somsom Party</span>
            </div>
            <div className="auth-buttons">
                {!accessToken && ( // 로그인하지 않은 상태
                    <>
                        <button
                            className="signup-button"
                            onClick={() => navigate('/signup')}
                        >
                            회원가입
                        </button>
                        <button
                            className="login-button"
                            onClick={() => navigate('/signin')}
                        >
                            로그인
                        </button>
                    </>
                )}
                {accessToken && ( // 로그인한 상태
                    <>
                        <button
                            className="logout-button"
                            onClick={handleLogout}
                        >
                            로그아웃
                        </button>
                        <button
                            className="mypage-button"
                            onClick={() => navigate('/mypage')}
                        >
                            마이페이지
                        </button>
                    </>
                )}
            </div>
        </header>
    );
};

export default Header;