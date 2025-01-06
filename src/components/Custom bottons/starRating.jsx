import { IoMdStar } from "react-icons/io";
import PropTypes from 'prop-types';

export default function StarRating({ totalStars = 5, rating = 0 }) {
  return (
    <div className="flex">
      {Array.from({ length: totalStars }, (_, index) => (
        <IoMdStar
          key={index}
          className={`cursor-pointer text-2xl ${index < rating ? 'text-yellow-700' : 'text-gray-300'}`}
        />
      ))}
    </div>
  );
}

StarRating.propTypes = {
  totalStars: PropTypes.number,
  rating: PropTypes.number
};
