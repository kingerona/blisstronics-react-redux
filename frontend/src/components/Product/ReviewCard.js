import React from 'react';
import profilePng from '../../images/Profile.png';
import Rating from 'react-rating';
import { AiFillStar } from 'react-icons/ai';

const ReviewCard = ({ review }) => {
  const options = {
    initialRating: review.rating,
    readonly: true,
    fractions: 2,
    emptySymbol: (
      <AiFillStar
        fill="rgba(20,20,20,0.1)"
        size={window.innerWidth < 600 ? 10 : 20}
      />
    ),
    fullSymbol: (
      <AiFillStar fill="tomato" size={window.innerWidth < 600 ? 10 : 20} />
    ),
  };

  return (
    <div className="reviewCard">
      <img src={profilePng} alt="User" />
      <p>{review.name}</p>
      <Rating {...options} />
      <span className="reviewCardComment">{review.comment}</span>
    </div>
  );
};

export default ReviewCard;
