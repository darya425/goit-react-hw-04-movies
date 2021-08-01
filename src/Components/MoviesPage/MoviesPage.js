import { useState, useEffect } from 'react';
import { Link, useRouteMatch, useLocation } from 'react-router-dom';
import * as fetchShelMovies from '../../Services/movies-api';
import { defaultUrl, key } from '../../params.json';

import './MoviesPage.scss';

const MoviesPage = () => {
  const location = useLocation();
  const { url } = useRouteMatch();
  const [searchQuery, setSearchQuery] = useState('');
  const [query, setQuery] = useState('');
  const [movies, setMovie] = useState([]);

  useEffect(() => {
    if (searchQuery === '') {
      return;
    }

    fetchShelMovies
      .fetchSearchMovie(searchQuery)
      .then(({ results }) => setMovie(results));
  }, [searchQuery]);

  const handleChange = e => {
    setQuery(e.currentTarget.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    setSearchQuery(query);
    setQuery('');
  };

  return (
    <>
      <form className="searchForm" onSubmit={handleSubmit}>
        <input
          className="searchForm-input"
          type="text"
          value={query}
          onChange={handleChange}
          autoComplete="off"
          autoFocus
          placeholder="Search movie..."
        />

        <button type="submit" className="searchForm-button">
          Search
        </button>
      </form>
      <ul className="list">
        {movies.map(({ poster_path, title, id }) => (
          <li key={id} className="item">
            <Link to={{ pathname: `${url}/${id}`, state: { from: location } }}>
              <img
                src={
                  poster_path !== null
                    ? `${defaultUrl}/${poster_path}?api_key=${key}`
                    : 'https://cdn.pixabay.com/photo/2018/01/28/14/25/kot-3113797_960_720.jpg'
                }
                alt={title}
                className="img"
              />
              <p className="text">{title}</p>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default MoviesPage;
