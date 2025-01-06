
import { FaLongArrowAltRight } from "react-icons/fa";
import PropTypes from 'prop-types';

const SampleNextArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      className="w-10 h-10 rounded-full text-white bg-black bg-opacity-40 hover:bg-opacity-100 duration-300 cursor-pointer flex justify-center items-center z-10 absolute top-[45%] right-0"
      onClick={onClick}
    >
      <span className="text-xl">
        <FaLongArrowAltRight />
      </span>
    </div>
  );
};
SampleNextArrow.propTypes = {
    onClick: PropTypes.func.isRequired,
  };
  
export default SampleNextArrow;
