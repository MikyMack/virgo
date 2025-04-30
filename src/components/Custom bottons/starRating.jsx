import { IoMdStar } from "react-icons/io";
import PropTypes from 'prop-types';
import { useState } from 'react';

export default function StarRating({ totalStars = 5, rating = 4 }) {
  const [userRating, setUserRating] = useState(rating);

  return (
    <div className="flex justify-end">
      {Array.from({ length: totalStars }, (_, index) => (
        <IoMdStar
          key={index}
          onClick={() => setUserRating(index + 1)}
          className={`cursor-pointer text-2xl ${index < userRating ? 'text-yellow-500' : 'text-gray-300'}`}
        />
      ))}
    </div>
  );
}

StarRating.propTypes = {
  totalStars: PropTypes.number,
  rating: PropTypes.number
};
