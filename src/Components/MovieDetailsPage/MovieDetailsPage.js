import { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import {
  NavLink,
  useRouteMatch,
  useHistory,
  useLocation,
} from 'react-router-dom';
import * as fetchShelMovies from '../../Services/movies-api';
import BASE_IMAGE_URL from '../../constants';

import './MovieDetailsPage.scss';

import Cast from '../Cast';
import Reviews from '../Reviews';

const MovieDetalisPage = () => {
  const location = useLocation();
  const history = useHistory();
  const { url } = useRouteMatch();
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetchShelMovies.fetchMovieById(movieId).then(setMovie);
  }, [movieId]);

  const onGoBack = () => {
    history.push(location?.state?.from ?? './');
  };

  return (
    <>
      {movie && (
        <>
          <button className="btn" type="button" onClick={onGoBack}>
            Back
          </button>
          <div className="wrapper-movie">
            <img
              src={`${BASE_IMAGE_URL}/${movie.poster_path}`}
              alt={movie.title}
              className="movie-img"
            />
            <div className="info-wrapper">
              <h2 className="movie-title">{movie.title}</h2>
              <p className="movie-info">
                Rating: {movie.vote_average} &#11088;
              </p>
              <p className="movie-info">
                Release date:
                <span className="info-text"> {movie.release_date}</span>
              </p>
              <p className="movie-text">{movie.overview}</p>
              <div className="genres-wrapper">
                <h3 className="genres-title">Genres:</h3>
                <ul className="genres">
                  {movie.genres.map(({ id, name }) => (
                    <li key={id} className="genres-item">
                      {name} /
                    </li>
                  ))}
                </ul>
              </div>
              <p className="genres-time">
                Runtime:
                <span className="time-text"> {movie.runtime} min.</span>
              </p>
            </div>
          </div>

          <NavLink
            to={{
              pathname: `${url}/cast`,
              state: { from: location?.state?.from },
            }}
          >
            <h2 className="additional-title">Actors and actresses</h2>
          </NavLink>
          <Route path="/movies/:movieId/cast">
            <Cast />
          </Route>

          <NavLink
            to={{
              pathname: `${url}/reviews`,
              state: { from: location?.state?.from },
            }}
          >
            <h2 className="additional-title">Reviews</h2>
          </NavLink>
          <Route path="/movies/:movieId/reviews">
            <Reviews />
          </Route>
        </>
      )}
    </>
  );
};

export default MovieDetalisPage;
