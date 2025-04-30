import { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './header.css';
import logo from '../../assets/logo/logo.webp';
import Navlinks from './Navlinks';
import { Link } from 'react-router-dom';

const MobileNav = ({ isMenuOpen, setIsMenuOpen }) => {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
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
      <div className="">
        <ul className={`lg:hidden bg-white absolute w-full h-full bottom-0 py-14 `}>
          <div className="flex items-center justify-between px-3 py-2">
            <img className='w-20 h-20' src={logo} alt='logo' />
            {user ? (
              <div
                className="relative flex items-center space-x-2"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                ref={dropdownRef}
              >
                <img src={user.photoURL} alt={user.displayName} className="w-10 rounded-full cursor-pointer" />
                {dropdownOpen && (
                  <div className="absolute top-full mt-2 right-0 bg-white shadow-lg rounded-md">
                    <button className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left" onClick={handleLogout}>
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/register" className='pl-3 py-2 hover:text-gray-600 font-bold text-2xl'>
                Login / Register
              </Link>
            )}
          </div>
          <hr />
          <Link to="/" className='flex justify-between items-center pl-3 py-1 hover:text-gray-600 font-bold md:font-normal text-2xl md:text-xl'>home</Link>
          <Navlinks />
          <Link to="/shop" className='flex justify-between items-center pl-3 py-2 hover:text-gray-600 font-bold md:font-normal text-2xl md:text-xl'>store</Link>
          <Link to="/blogs" className='flex justify-between items-center pl-3 py-2 hover:text-gray-600 font-bold md:font-normal text-2xl md:text-xl'>articles</Link>
          <hr />
     
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
