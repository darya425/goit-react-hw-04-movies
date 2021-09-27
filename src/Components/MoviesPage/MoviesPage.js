import { useState, useEffect } from 'react';
import { Link, useRouteMatch, useLocation, useHistory } from 'react-router-dom';
import * as fetchShelMovies from '../../Services/movies-api';

import BASE_IMAGE_URL from '../../constants';
import cat from '../../img/maybe-it-is-cat.jpg';
import queryString from 'query-string';

import styles from './MoviesPage.module.scss';

const MoviesPage = () => {
  const location = useLocation();
  const history = useHistory();
  const { url } = useRouteMatch();
  const [query, setQuery] = useState('');
  const [movies, setMovie] = useState([]);

  useEffect(() => {
    const searchQuery = queryString.parse(location.search).query;

    if (searchQuery) {
      fetchShelMovies.fetchSearchMovie(searchQuery).then(({ results }) => {
        setMovie(results);
      });
    }
  }, [location.search]);

  const handleChange = e => {
    setQuery(e.currentTarget.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    onQueryChange(query);
    setQuery('');
  };

  const onQueryChange = query => {
    history.push({
      pathname: location.pathname,
      search: `query=${query}`,
    });
  };

  return (
    <>
      <form className={styles.searchForm} onSubmit={handleSubmit}>
        <input
          className={styles.searchFormInput}
          type="text"
          value={query}
          onChange={handleChange}
          autoComplete="off"
          autoFocus
          placeholder="Search movie..."
        />

        <button type="submit" className={styles.searchFormButton}>
          Search
        </button>
      </form>

      <ul className={styles.moviesList}>
        {movies.map(({ poster_path, title, id }) => (
          <li key={id} className={styles.movieItem}>
            <Link to={{ pathname: `${url}/${id}`, state: { from: location } }}>
              <img
                src={
                  poster_path !== null
                    ? `${BASE_IMAGE_URL}/${poster_path}`
                    : cat
                }
                alt={title}
                className={styles.img}
              />
              <h2 className={styles.movieTitle}>{title}</h2>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default MoviesPage;
