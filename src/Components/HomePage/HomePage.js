import { useState, useEffect } from 'react';
import { Link, useRouteMatch, useLocation } from 'react-router-dom';
import * as fetchShelMovies from '../../Services/movies-api';
import BASE_IMAGE_URL from '../../constants';

import './HomePage.scss';

const HomePage = () => {
  const location = useLocation();
  const { url } = useRouteMatch();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchShelMovies.fetchTrendingMovies().then(({ results }) => {
      setMovies([...results]);
    });
  }, []);

  return (
    <ul className="list">
      {movies.map(({ backdrop_path, title, id }) => (
        <li key={id} className="item">
          <Link
            to={{ pathname: `${url}movies/${id}`, state: { from: location } }}
          >
            <img
              src={`${BASE_IMAGE_URL}/${backdrop_path}`}
              alt={title}
              className="img"
            />
            <p className="text">{title}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default HomePage;
