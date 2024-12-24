// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Search from './pages/Search';
import MovieCategories from './pages/MovieCategories';
import MovieDetail from './pages/MovieDetail';
//import Ex from './components/Ex'

const App = () => {
  return (
    <Router>
      <div style={styles.appContainer}>
        <Sidebar />
        <div style={styles.mainContent}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/search" element={<Search />} />
            <Route path="/movies" element={<MovieCategories />} />
            <Route path="/movies/category/:category" element={<MovieCategories />} />
            <Route path="/movies/:movieId" element={<MovieDetail />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

const styles = {
  appContainer: {
    display: 'flex',
    alignItems: 'stretch',
    minHeight: '100vh',
  },
  mainContent: {
    flex: 1,
    padding: '20px',
    backgroundColor: '#181818',
    color: '#fff',
  },
};

export default App;

//<Route path="/" element={<Home />} />