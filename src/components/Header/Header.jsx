import { useState, useEffect, useRef } from 'react';
import logo from '../../assets/logo/logo.webp';
import { FiMenu } from 'react-icons/fi';
import { CiSearch, CiSquareRemove, CiUser, CiShoppingCart, CiHeart, CiBoxList } from 'react-icons/ci';
import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav';
import './header.css';
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import profile from "../../assets/icons/profile.jpg";

export default function Header() {
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [recentSearches, setRecentSearches] = useState([]);
  const [showCategories, setShowCategories] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const searchRef = useRef(null);
  const inputRef = useRef(null);
  const headerRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    setUser(loggedInUser);
    const updateCounts = () => {
      try {
        const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        const wishlistItems = JSON.parse(localStorage.getItem('wishlist')) || [];
        const searches = JSON.parse(localStorage.getItem('recentSearches')) || [];
        setCartCount(cartItems.reduce((total, item) => total + (item.quantity || 1), 0));
        setWishlistCount(wishlistItems.length);
        setRecentSearches(searches);
      } catch (error) {
        console.error('Error reading localStorage:', error);
      }
    };

    updateCounts();

    const handleStorageChange = (e) => {
      if (['cart', 'wishlist', 'recentSearches'].includes(e.key)) {
        updateCounts();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    const originalSetItem = localStorage.setItem;
    localStorage.setItem = function (key, value) {
      originalSetItem.apply(this, arguments);
      if (['cart', 'wishlist', 'recentSearches'].includes(key)) {
        updateCounts();
      }
    };

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      localStorage.setItem = originalSetItem;
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearch(false);
      }
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    };

    if (showSearch || showProfileDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showSearch, showProfileDropdown]);

  useEffect(() => {
    if (showSearch && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showSearch]);

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchTerm.trim()) {
      const updatedSearches = [
        searchTerm,
        ...recentSearches.filter(item => item !== searchTerm).slice(0, 4)
      ];
      localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
      setRecentSearches(updatedSearches);
      setShowSearch(false);
      window.location.href = `/search?q=${encodeURIComponent(searchTerm)}`;
    }
  };

  const clearRecentSearches = () => {
    localStorage.removeItem('recentSearches');
    setRecentSearches([]);
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 2000,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    pauseOnHover: false,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 1, infinite: true, dots: false } },
      { breakpoint: 768, settings: { slidesToShow: 1, slidesToScroll: 1, initialSlide: 1 } },
      { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } }
    ]
  };

  return (
    <div className="relative">
      {/* Announcement Bar */}
      <div className='bg-[#717274] text-white uppercase lg:py-2 py-1'>
        <Slider {...settings}>
          <div className="flex items-center justify-center text-center">
            <h2 className='sm:text-xs md:text-sm'>USE code first10 flat20% off on your first order</h2>
          </div>
          <div className="flex items-center justify-center text-center">
            <h2 className='sm:text-xs md:text-sm'>Free shipping on all prepaid orders | cod available</h2>
          </div>
        </Slider>
      </div>

      {/* Main Header */}
      <header className="mx-auto flex flex-col items-center justify-between py-1 px-6 border-b border-gray-200 xl:container font-abc" ref={headerRef}>
        <div className="w-full flex items-center justify-between mb-4">
          {/* Logo and Search */}
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center">
              <img src={logo} alt="Brand Logo" className="h-16 w-auto" />
            </Link>

            <div className="hidden lg:block relative">
              <div
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-all"
                onClick={() => setShowSearch(true)}
              >
                <CiSearch className="w-5 h-5 text-gray-900" />
              </div>
            </div>
          </div>

          {/* Center Logo Text */}
          <div className="flex-1 flex justify-center items-center">
            <span className="text-4xl font-bold bg-gradient-to-r from-gray-800 via-gray-600 to-gray-800 bg-clip-text text-transparent tracking-tighter"
              style={{
                fontFamily: "'Playfair Display', serif",
                letterSpacing: '-0.03em',
                fontWeight: 900,
                color: '#1px 1px 2px rgba(0,0,0,0.1)',
              }}>
              VIRGO
            </span>
          </div>

          {/* Mobile Menu */}
          <div className="flex items-center lg:hidden space-x-4">
            <div
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-all"
              onClick={() => setShowSearch(true)}
            >
              <CiSearch className="w-5 h-5 text-gray-700" />
            </div>

            <FiMenu
              className="text-gray-700 hover:text-black w-8 h-8 cursor-pointer"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            />
          </div>

          {/* Account and Cart */}
          <div className="flex space-x-6 items-center font-semibold">
            <div className="hidden lg:flex space-x-6 items-center">
              {!user ? (
                <Link to="/register">
                  <div className="flex space-x-2">
                    <p className="text-gray-700 hover:text-black font-semibold cursor-pointer">
                      LOGIN
                    </p>
                    <span className="text-gray-400">/</span>
                    <p className="text-gray-700 hover:text-black font-semibold cursor-pointer">
                      REGISTER
                    </p>
                  </div>
                </Link>
              ) : (
                <Link to="/profile" className="flex items-center gap-2">
                  <img
                    src={user.avatar || profile}
                    alt="Profile"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <p className="text-gray-700 hover:text-black font-semibold cursor-pointer">
                    PROFILE
                  </p>
                </Link>
              )}

              {/* Profile Icon with Monochromatic Dropdown */}
              <div className="relative profile-dropdown-container" ref={dropdownRef}>
                <div
                  className="w-10 h-10 flex items-center justify-center cursor-pointer"
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                >
                  <CiUser className="text-gray-800 hover:text-black w-8 h-8" />
                </div>
                {showProfileDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-900/95 shadow-lg rounded-lg z-[100] border border-gray-700/30 profile-dropdown animate-fadeIn">
                    <Link
                      to="/profile"
                      className="flex items-center justify-between px-4 py-2 text-sm text-white hover:bg-gray-700/40 transition-colors"
                      onClick={() => setShowProfileDropdown(false)}
                    >
                      <div className="flex items-center gap-2">
                        <CiUser className="w-5 h-5" />
                        <span>My Profile</span>
                      </div>
                    </Link>
                    <Link
                      to="/orders"
                      className="flex items-center justify-between px-4 py-2 text-sm text-white hover:bg-gray-700/40 transition-colors"
                      onClick={() => setShowProfileDropdown(false)}
                    >
                      <div className="flex items-center gap-2">
                        <CiBoxList className="w-5 h-5" />
                        <span>Orders</span>
                      </div>
                    </Link>
                    <Link
                      to="/wishlist"
                      className="flex items-center justify-between px-4 py-2 text-sm text-white hover:bg-gray-700/40 transition-colors"
                      onClick={() => setShowProfileDropdown(false)}
                    >
                      <div className="flex items-center gap-2">
                        <CiHeart className="w-5 h-5" />
                        <span>Wishlist</span>
                      </div>
                      {wishlistCount > 0 && (
                        <span className="bg-blue-gray-500 text-white text-xs rounded-full px-1.5 py-0.5">
                          {wishlistCount}
                        </span>
                      )}
                    </Link>
                    <Link
                      to="/cart"
                      className="flex items-center justify-between px-4 py-2 text-sm text-white hover:bg-gray-700/40 transition-colors"
                      onClick={() => setShowProfileDropdown(false)}
                    >
                      <div className="flex items-center gap-2">
                        <CiShoppingCart className="w-5 h-5" />
                        <span>Cart</span>
                      </div>
                      {cartCount > 0 && (
                        <span className="bg-blue-gray-500 text-white text-xs rounded-full px-1.5 py-0.5">
                          {cartCount}
                        </span>
                      )}
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="header-sticky w-full">
          <DesktopNav />
          <MobileNav isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        </div>
      </header>

      {/* Enhanced Search Overlay - Scrollbar removed */}
      {showSearch && (
        <div
          className="fixed inset-0 bg-white bg-opacity-95 z-50 pt-32 px-4 overflow-hidden"
          ref={searchRef}
        >
          <div className="max-w-3xl mx-auto h-[calc(100vh-8rem)] overflow-y-auto">
            {/* Search Input */}
            <div className="relative border-b-2 border-black pb-3">
              <CiSearch className="absolute left-0 top-1 w-6 h-6 text-gray-500" />
              <input
                type="text"
                placeholder="Search for products, categories..."
                className="w-full pl-10 pr-12 py-2 text-lg bg-transparent focus:outline-none placeholder-gray-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleSearch}
                ref={inputRef}
                autoComplete="off"
              />
              <button
                onClick={() => setShowSearch(false)}
                className="absolute right-0 top-1 text-gray-500 hover:text-black transition-colors"
              >
                <CiSquareRemove className="w-6 h-6" />
              </button>
            </div>

            {/* Search Content */}
            <div className="mt-8">
              {/* Recent Searches */}
              {recentSearches.length > 0 && !searchTerm && (
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-sm font-medium uppercase tracking-wider">Recent Searches</h3>
                    <button
                      onClick={clearRecentSearches}
                      className="text-xs text-gray-500 hover:text-black"
                    >
                      Clear All
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((search, index) => (
                      <button
                        key={index}
                        onClick={() => setSearchTerm(search)}
                        className="px-3 py-1.5 bg-gray-100 rounded-full text-sm hover:bg-gray-200 transition-colors"
                      >
                        {search}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Categories */}
              <div className="mb-8">
                <h3
                  className="text-sm font-medium uppercase tracking-wider mb-4 cursor-pointer flex items-center"
                  onClick={() => setShowCategories(!showCategories)}
                >
                  Categories
                  <span className="ml-2 text-xs">{showCategories ? '−' : '+'}</span>
                </h3>
                {showCategories && (
                  <div className="grid grid-cols-2 gap-3">
                    {['Candles', 'Candle Holder', ' Sachets', 'Charms & Melts', 'Diyas','Table Tops'].map(category => (
                      <Link
                        key={category}
                        to={`/category/${category.toLowerCase().replace(' ', '-')}`}
                        className="text-sm hover:text-black transition-colors py-1"
                        onClick={() => setShowSearch(false)}
                      >
                        {category}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Search Results */}
              {searchTerm && (
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider mb-4">
                    Results for "{searchTerm}"
                  </div>

                  <div className="space-y-4">
                    {[
                      { id: 1, name: 'Vanilla Dream Candle', category: 'Signature Candles' },
                      { id: 2, name: 'Rose Petal Candle', category: 'Floral Collection' },
                      { id: 3, name: 'Sandalwood Diffuser', category: 'Reed Diffusers' },
                      { id: 4, name: 'Lavender Room Spray', category: 'Home Fragrance' }
                    ]
                      .filter(item =>
                        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        item.category.toLowerCase().includes(searchTerm.toLowerCase())
                      )
                      .map(item => (
                        <Link
                          key={item.id}
                          to={`/product/${item.id}`}
                          className="block py-2 hover:bg-gray-50 -mx-2 px-2 transition-colors"
                          onClick={() => setShowSearch(false)}
                        >
                          <div className="font-medium">{item.name}</div>
                          <div className="text-xs text-gray-500 mt-1">{item.category}</div>
                        </Link>
                      ))}
                  </div>

                  <Link
                    to="/shop"
                    className="inline-block mt-6 text-sm font-medium uppercase tracking-wider border-b border-black pb-1 hover:text-black transition-colors"
                    onClick={() => setShowSearch(false)}
                  >
                    View All Products
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}