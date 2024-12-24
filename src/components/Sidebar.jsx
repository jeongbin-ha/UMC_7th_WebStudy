import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div style={styles.sidebar}>
      <Link to="/" style={styles.logo}>YONGCHA</Link>
      <nav>
        <Link to="/search" style={styles.link}>🔍 찾기</Link>
        <Link to="/movies" style={styles.link}>🎬 영화</Link> {/* 영화 버튼 경로를 /movies로 설정 */}
      </nav>
    </div>
  );
};

const styles = {
  sidebar: {
    width: '200px',
    backgroundColor: '#111',
    color: '#fff',
    padding: '20px',
    //height: '100%',
  },
  logo: {
    fontSize: '24px',
    color: '#e50914',
    fontWeight: 'bold',
    marginBottom: '20px',
    textDecoration: 'none',
  },
  link: {
    display: 'block',
    marginBottom: '10px',
    color: '#fff',
    textDecoration: 'none',
  },
};

export default Sidebar;
