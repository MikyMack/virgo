import { useState } from 'react'
import "./imageMagnifier.css";
import PropTypes from 'prop-types';

export default function ImageMagnifier({ imageUrl }) {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [showMagnifier, setShowMagnifier] = useState(false);
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

    const handleMouseHover = (e) => {
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;
        setPosition({ x, y });
        setCursorPosition({ x: e.clientX - left, y: e.clientY - top });
    }

    return (
        <div className='img-magnifier-container' onMouseEnter={() => setShowMagnifier(true)} onMouseLeave={() => setShowMagnifier(false)} onMouseMove={handleMouseHover}>
            <img className=' w-full h-auto  object-contain' src={imageUrl} alt='' />
            {showMagnifier &&
                <div style={{ position: "absolute", left: `${cursorPosition.x - 100}px`, top: `${cursorPosition.y - 100}px`, pointerEvents: "none" }}>
                    <div className='magnifier-image' style={{ backgroundImage: `url(${imageUrl})`, backgroundPosition: `${position.x}% ${position.y}%`, }}>

                    </div>
                </div>
            }

        </div>
    )
}

ImageMagnifier.propTypes = {
  imageUrl: PropTypes.string.isRequired,
};
