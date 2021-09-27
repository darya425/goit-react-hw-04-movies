import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as fetchShelMovies from '../../Services/movies-api';

import NotFoundView from '../NotFoundView';

import styles from './Reviews.module.scss';

const Reviews = () => {
  const { movieId } = useParams();
  const [reviews, setReview] = useState([]);

  useEffect(() => {
    fetchShelMovies
      .fetchReviews(movieId)
      .then(({ results }) => setReview(results));
  }, [movieId]);

  return (
    <>
      {reviews.length !== 0 ? (
        <div className={styles.reviewWrapper}>
          <ul className={styles.review}>
            {reviews.map(({ id, author, content }) => (
              <li key={id} className={styles.reviewItem}>
                <h3 className={styles.reviewTitle}>
                  &#128526;
                  {author}
                </h3>
                <p className={styles.reviewContent}>{content}</p>
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

export default Reviews;
