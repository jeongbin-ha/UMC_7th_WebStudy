// src/pages/MovieDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const MovieDetail = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState([]);

  useEffect(() => {
    console.log("movieId:", movieId); // movieId가 올바르게 들어오는지 확인
    const fetchMovieDetails = async () => {
      try {
        const movieResponse = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
          headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlOWJjYzljOWEwNzg2NmIxNGNlMTRjZTRkMmYwNjA3YSIsIm5iZiI6MTczMDE4NzYyNS4xNTgzNDksInN1YiI6IjY3MDY1MmFhYTg4NjE0ZDZiMDhhZTE3OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ATgVtDmPPWz7yW-1uvq4uCCHHKlyx6bcEC-p_qeMZOo',
          },
        });
        setMovie(movieResponse.data);

        const creditsResponse = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits`, {
          headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlOWJjYzljOWEwNzg2NmIxNGNlMTRjZTRkMmYwNjA3YSIsIm5iZiI6MTczMDE4NzYyNS4xNTgzNDksInN1YiI6IjY3MDY1MmFhYTg4NjE0ZDZiMDhhZTE3OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ATgVtDmPPWz7yW-1uvq4uCCHHKlyx6bcEC-p_qeMZOo',
          },
        });
        setCredits(creditsResponse.data.cast);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (!movie) return <div>Loading...</div>;

  return (
    <div style={styles.container}>
      <div style={styles.posterContainer}>
        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} style={styles.poster} />
      </div>
      <div style={styles.detailsContainer}>
        <h1>{movie.title}</h1>
        <p>평균 {movie.vote_average}</p>
        <p>{movie.release_date} | {movie.runtime}분</p>
        <p>{movie.overview}</p>

        <h2>감독/출연</h2>
        <div style={styles.creditsContainer}>
          {credits.map((cast) => (
            <div key={cast.cast_id} style={styles.castCard}>
              <img src={`https://image.tmdb.org/t/p/w92${cast.profile_path}`} alt={cast.name} style={styles.castImage} />
              <p>{cast.name}</p>
              <p>{cast.character}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    padding: '20px',
    color: 'white',
    backgroundColor: '#111',
  },
  posterContainer: {
    marginRight: '20px',
  },
  poster: {
    width: '300px',
    borderRadius: '8px',
  },
  detailsContainer: {
    flex: 1,
  },
  creditsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
  },
  castCard: {
    width: '100px',
    textAlign: 'center',
  },
  castImage: {
    width: '100%',
    borderRadius: '50%',
  },
};

export default MovieDetail;
