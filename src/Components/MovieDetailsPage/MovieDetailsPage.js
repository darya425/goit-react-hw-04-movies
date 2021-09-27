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

import Cast from '../Cast';
import Reviews from '../Reviews';
import BASE_IMAGE_URL from '../../constants';
import cat from '../../img/maybe-it-is-cat.jpg';

import styles from './MovieDetailsPage.module.scss';

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
        <div className={styles.wrapper}>
          <button className={styles.btn} type="button" onClick={onGoBack}>
            Back
          </button>
          <div className={styles.wrapperMovieDetails}>
            <img
              src={
                movie.poster_path !== null
                  ? `${BASE_IMAGE_URL}/${movie.poster_path}`
                  : cat
              }
              alt={movie.title}
              className={styles.detailsImg}
            />
            <div className={styles.infoWrapper}>
              <h2 className={styles.infoTitle}>{movie.title}</h2>
              <p className={styles.detailsInfo}>
                Rating: {movie.vote_average} &#11088;
              </p>
              <p className={styles.detailsInfo}>
                Release date:
                <span className={styles.detailsText}>
                  {' '}
                  {movie.release_date}
                </span>
              </p>
              <p className={styles.infoText}>{movie.overview}</p>
              <div className={styles.genresWrapper}>
                <h3 className={styles.genresTitle}>Genres:</h3>
                <ul className={styles.genres}>
                  {movie.genres.map(({ id, name }) => (
                    <li key={id} className={styles.genresItem}>
                      {name} /
                    </li>
                  ))}
                </ul>
              </div>
              <p className={styles.genresTime}>
                Runtime:
                <span className={styles.timeText}> {movie.runtime} min.</span>
              </p>
            </div>
          </div>

          <div className={styles.wrappierDetails}>
            <h2 className={styles.infoTitle}>More about the film:</h2>
            <NavLink
              to={{
                pathname: `${url}/cast`,
                state: { from: location?.state?.from },
              }}
            >
              <h2 className={styles.additionalTitle}>Actors and actresses</h2>
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
              <h2 className={styles.additionalTitle}>Viewer reviews</h2>
            </NavLink>
            <Route path="/movies/:movieId/reviews">
              <Reviews />
            </Route>
          </div>
        </div>
      )}
    </>
  );
};

export default MovieDetalisPage;
