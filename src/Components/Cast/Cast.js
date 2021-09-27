import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as fetchShelMovies from '../../Services/movies-api';
import BASE_IMAGE_URL from '../../constants';
import NotFoundView from '../NotFoundView';

import styles from './Cast.module.scss';

const Cast = () => {
  const { movieId } = useParams();
  const [casts, setCasts] = useState([]);

  useEffect(() => {
    fetchShelMovies.fetchCastById(movieId).then(({ cast }) => {
      setCasts(cast.filter(cast => !cast.profile_path === false));
    });
  }, [movieId]);

  return (
    <>
      {casts.length ? (
        <div className={styles.wrapperInfo}>
          <ul className={styles.additional}>
            {casts.map(({ cast_id, name, profile_path }) => (
              <li key={cast_id} className={styles.additionalItem}>
                <img
                  src={`${BASE_IMAGE_URL}/${profile_path}`}
                  alt={name}
                  className={styles.additionalImg}
                />
                <h3 className={styles.additionalName}>{name}</h3>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <NotFoundView />
      )}
    </>
  );
};

export default Cast;
