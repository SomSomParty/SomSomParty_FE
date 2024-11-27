import React from 'react';
import '../styles/Header.css';
import { useNavigate, useLocation } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // 로고 클릭 이벤트 핸들러
    const handleLogoClick = () => {
        if (location.pathname === '/') {
            window.location.reload();
        } else {
            navigate('/');
        }
    };

    return (
        <header className = "header">
            <div
                className = "logo"
                onClick = {handleLogoClick}
            >
                <span>Somsom Party</span>
            </div>
            <div className = "auth-buttons">
                <button 
                    className = "login-button"
                    onClick= {() => navigate('/login')}
                >
                    로그인
                </button>
                <button className = "logout-button">로그아웃</button>
                <button
                    className = "mypage-button"
                    onClick = {() => navigate('/mypage')}
                >
                    마이페이지
                </button>
            </div>
        </header>
    );
};

export default Header;
