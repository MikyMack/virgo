import { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './header.css';
import logo from '../../assets/logo/logo.webp';
import Navlinks from './Navlinks';
import { Link } from 'react-router-dom';

const MobileNav = ({ isMenuOpen, setIsMenuOpen }) => {
  const [dropdownStates, setDropdownStates] = useState({
    candles: false,
    candleHolders: false,
    waxSachets: false,
    clayDiyas: false,
  });

  const toggleDropdown = (dropdown) => {
    setDropdownStates((prevState) => ({
      ...prevState,
      [dropdown]: !prevState[dropdown],
    }));
  };

  const menuRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      setUser(JSON.parse(userData));
    }

    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen, setIsMenuOpen]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <nav
      ref={menuRef}
      className={`lg:hidden fixed top-0 left-0 w-3/4 h-full bg-white z-30 shadow-lg transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-500 ease-in-out`}
    >
      <div>
        <ul className={`md:hidden bg-white absolute w-full h-full bottom-0 py-14`}>
          <div>
            <img className='w-20 h-20' src={logo} alt='logo' />
            <hr />
          </div>
          <Link to="/" className='flex justify-between items-center pl-3 py-1 hover:text-gray-600 font-bold md:font-normal text-2xl md:text-xl'>Home</Link>
          <Navlinks />
          <Link to="/shop" className='flex justify-between items-center pl-3 py-2 hover:text-gray-600 font-bold md:font-normal text-2xl md:text-xl'>Store</Link>
          <Link to="/blogs" className='pl-3 hover:text-gray-600 font-bold text-2xl'>Articles</Link>
          <hr />
     
        </ul>

        <ul className="space-y-4 text-lg font-semibold uppercase">
          <li>
            <button
              onClick={() => toggleDropdown('candles')}
              className="flex justify-between w-full text-black hover:text-gray-600"
            >
              CANDLES
              <span className='pr-3'>{dropdownStates.candles ? '-' : '+'}</span>
            </button>
            {dropdownStates.candles && (
              <ul className="relative group pl-4 space-y-2 uppercase bg-red-500">
                <li className="text-black hover:text-gray-600">JAR Candles</li>
                <li className="text-black hover:text-gray-600">Decorative Candles</li>
                <li className="text-black hover:text-gray-600">Floating Candles</li>
                <li className="text-black hover:text-gray-600">Mana Collections</li>
                <li className="text-black hover:text-gray-600">Sia Collections</li>
                <li className="text-black hover:text-gray-600">Ritu Collections</li>
                <li className="text-black hover:text-gray-600">Pillar Candles</li>
                <li className="text-black hover:text-gray-600">Embossed Pillar Candle</li>
                <li className="text-black hover:text-gray-600">Plain Pillar Candle</li>
                <li className="text-black hover:text-gray-600">Stick Candles</li>
              </ul>
            )}
          </li>

          <li>
            <button
              onClick={() => toggleDropdown('candleHolders')}
              className="flex justify-between w-full text-black hover:text-gray-600 uppercase"
            >
              Candle Holders
              <span className='pr-3'>{dropdownStates.candleHolders ? '-' : '+'}</span>
            </button>
            {dropdownStates.candleHolders && (
              <ul className="group relative pl-4 space-y-2 uppercase">
                <li className="text-black hover:text-gray-600">Pillar Candle Holders</li>
                <li className="text-black hover:text-gray-600">Stick Candle Holders</li>
                <li className="text-black hover:text-gray-600">Tea Light Holders</li>
              </ul>
            )}
          </li>

          <li>
            <button
              onClick={() => toggleDropdown('waxSachets')}
              className="flex justify-between w-full text-black hover:text-gray-600 uppercase"
            >
              Wax Sachets
              <span className='pr-3'>{dropdownStates.waxSachets ? '-' : '+'}</span>
            </button>
            {dropdownStates.waxSachets && (
              <ul className="group relative pl-4 space-y-2 uppercase">
                <li className="text-black hover:text-gray-600">Assorted Wax Sachets</li>
                <li className="text-black hover:text-gray-600">Oval Wax Sachets</li>
                <li className="text-black hover:text-gray-600">Rectangle Wax Sachets</li>
              </ul>
            )}
          </li>

          <li>
            <button
              onClick={() => toggleDropdown('clayDiyas')}
              className="flex justify-between w-full text-black hover:text-gray-600 uppercase"
            >
              Clay Diyas
              <span className='pr-3'>{dropdownStates.clayDiyas ? '-' : '+'}</span>
            </button>
            {dropdownStates.clayDiyas && (
              <ul className="group relative pl-4 space-y-2">
                <li className="text-black hover:text-gray-600">Wax-Filled Diyas</li>
                <li className="text-black hover:text-gray-600">Clear or Unfilled Diyas</li>
              </ul>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

MobileNav.propTypes = {
  isMenuOpen: PropTypes.bool.isRequired,
  setIsMenuOpen: PropTypes.func.isRequired,
};

export default MobileNav;
