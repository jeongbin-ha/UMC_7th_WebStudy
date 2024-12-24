// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [userName, setUserName] = useState(null); // 유저 이름 상태
  const [hoveredButton, setHoveredButton] = useState(null);

  // 현재 페이지 경로를 확인하여 로그인 또는 회원가입 페이지인지 확인
  const isSignupPage = location.pathname === '/signup';
  const isLoginPage = location.pathname === '/login';

  // 유저 정보 불러오기 함수
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('AccessToken');
      if (token) {
        try {
          const response = await fetch('http://localhost:3000/user/me', {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (response.ok) {
            const data = await response.json();
            setUserName(data.email.split('@')[0]); // 이메일 '@' 앞부분을 유저 이름으로 설정
          }
        } catch (error) {
          console.error('유저 정보 불러오기 오류:', error);
        }
      }
    };
    fetchUserData();
  }, []);

  // 로그아웃 함수
  const handleLogout = () => {
    localStorage.removeItem('AccessToken');
    localStorage.removeItem('RefreshToken');
    setUserName(null); // 유저 정보 초기화
    navigate('/');
  };

  const styles = {
    navbar: {
      display: 'flex',
      justifyContent: 'flex-end',
      padding: '10px 20px',
      backgroundColor: '#222',
    },
    button: {
      marginLeft: '10px',
      padding: '10px 20px',
      borderRadius: '5px',
      textDecoration: 'none',
      color: '#fff',
    },
    loginButton: {
      backgroundColor: isLoginPage ? '#e50914' : isSignupPage ? '#222' : hoveredButton === 'login' ? '#0056b3' : '#e50914',
      cursor: 'pointer',
    },
    signupButton: {
      backgroundColor: isSignupPage ? '#e50914' : isLoginPage ? '#222' : hoveredButton === 'signup' ? '#0056b3' : '#e50914',
      cursor: 'pointer',
    },
    logoutButton: {
      backgroundColor: '#e50914',
      color: '#fff',
      padding: '10px 20px',
      borderRadius: '5px',
      border: 'none',
      cursor: 'pointer',
    },
    userNameText: {
      color: '#fff',
      marginRight: '10px',
    },
  };

  return (
    <div style={styles.navbar}>
      {userName ? (
        // 유저가 로그인한 경우 유저 이름과 로그아웃 버튼 표시
        <>
          <span style={styles.userNameText}>{userName}님 반갑습니다.</span>
          <button onClick={handleLogout} style={styles.logoutButton}>로그아웃</button>
        </>
      ) : (
        // 유저가 로그인하지 않은 경우 로그인/회원가입 버튼 표시
        <>
          <Link
            to="/login"
            style={{ ...styles.button, ...styles.loginButton }}
            onMouseEnter={() => setHoveredButton('login')}
            onMouseLeave={() => setHoveredButton(null)}
          >
            로그인
          </Link>
          <Link
            to="/signup"
            style={{ ...styles.button, ...styles.signupButton }}
            onMouseEnter={() => setHoveredButton('signup')}
            onMouseLeave={() => setHoveredButton(null)}
          >
            회원가입
          </Link>
        </>
      )}
    </div>
  );
};

export default Navbar;
