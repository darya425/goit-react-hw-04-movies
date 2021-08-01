import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as fetchShelMovies from '../../Services/movies-api';
import NotFoundView from '../NotFoundView';

import './Reviews.scss';

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
        <div className="review-wrapper">
          <ul className="review">
            {reviews.map(({ id, author, content }) => (
              <li key={id} className="review-item">
                <h3 className="review-name">
                  &#128526;
                  {author}
                </h3>
                <p className="review-content">{content}</p>
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
