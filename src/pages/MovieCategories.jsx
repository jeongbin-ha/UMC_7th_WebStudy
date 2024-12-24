// src/pages/MovieCategories.jsx
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import MovieCard from '../components/MovieCard';

const categoriesData = [
  {
    name: '현재 상영중인',
    path: 'now-playing',
    apiEndpoint: 'https://api.themoviedb.org/3/movie/now_playing',
    image: 'https://wallpapercave.com/wp/wp13143874.jpg',
  },
  {
    name: '인기있는',
    path: 'popular',
    apiEndpoint: 'https://api.themoviedb.org/3/movie/popular',
    image: 'https://images6.alphacoders.com/134/thumb-1920-1348900.jpeg',
  },
  {
    name: '높은 평가를 받은',
    path: 'top-rated',
    apiEndpoint: 'https://api.themoviedb.org/3/movie/top_rated',
    image: 'https://images5.alphacoders.com/584/thumb-1920-584539.jpg',
  },
  {
    name: '개봉 예정중인',
    path: 'upcoming',
    apiEndpoint: 'https://api.themoviedb.org/3/movie/upcoming',
    image: 'https://e0.pxfuel.com/wallpapers/617/942/desktop-wallpaper-emirates-stadium-arsenal-stadium.jpg',
  },
];

const MovieCategories = () => {
  const { category } = useParams();
  const [movies, setMovies] = useState([]);
  const selectedCategory = categoriesData.find(cat => cat.path === category);

  useEffect(() => {
    if (selectedCategory) {
      const fetchMovies = async () => {
        try {
          const response = await axios.get(selectedCategory.apiEndpoint, {
            params: { language: 'en-US', page: 1 },
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlOWJjYzljOWEwNzg2NmIxNGNlMTRjZTRkMmYwNjA3YSIsIm5iZiI6MTczMDE4NzYyNS4xNTgzNDksInN1YiI6IjY3MDY1MmFhYTg4NjE0ZDZiMDhhZTE3OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ATgVtDmPPWz7yW-1uvq4uCCHHKlyx6bcEC-p_qeMZOo',
            },
          });
          setMovies(response.data.results);
        } catch (error) {
          console.error('Error fetching movies:', error);
        }
      };
      fetchMovies();
    }
  }, [selectedCategory]);

  if (!category) {
    return (
      <div>
        <h2 style={styles.title}>카테고리</h2>
        <div style={styles.categoryContainer}>
          {categoriesData.map((cat) => (
            <Link to={`/movies/category/${cat.path}`} key={cat.name} style={styles.categoryCard}>
              <div
                style={{
                  ...styles.categoryImage,
                  backgroundImage: `url(${cat.image})`,
                }}
              />
              <span style={styles.categoryName}>{cat.name}</span>
            </Link>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div style={styles.moviesContainer}>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

const styles = {
  title: {
    fontSize: '24px',
    marginBottom: '20px',
  },
  categoryContainer: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  categoryCard: {
    width: '200px',
    textAlign: 'center',
    textDecoration: 'none',
    color: 'white',
  },
  categoryImage: {
    width: '100%',
    height: '120px',
    backgroundColor: '#333',
    borderRadius: '8px',
    marginBottom: '10px',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  categoryName: {
    fontSize: '18px',
  },
  moviesContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
};

export default MovieCategories;
