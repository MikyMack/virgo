import { useState } from 'react';
import logo from '../../assets/logo/logo.webp';
import { HiOutlineShoppingCart } from 'react-icons/hi2';
import { FiMenu } from 'react-icons/fi';
import { CiSearch, CiHeart } from 'react-icons/ci';
import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav';
import './header.css';
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div>
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
      <header className="mx-auto flex flex-col items-center justify-between py-1 px-6 border-b border-gray-200 xl:container font-abc">
        <div className="w-full flex items-center justify-between mb-4">
          {/* Mobile Menu Icon */}
          <div className="flex items-center lg:hidden">
            <FiMenu
              className="text-gray-700 hover:text-black w-8 h-8 cursor-pointer"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            />
          </div>

          {/* Search Input */}
          <div className="hidden lg:flex items-center w-1/4">
            <input
              type="text"
              placeholder="Search"
              className="w-full px-4 py-2 border-b border-gray-300 rounded-md outline-none"
            />
            <CiSearch className="text-gray-700 hover:text-black w-6 h-6 ml-2 cursor-pointer" />
          </div>

          {/* Logo */}
          <Link to="/" className="flex items-center justify-center w-full">
            <img src={logo} alt="Woodmart" className="h-20 w-auto" />
          </Link>

          {/* Register/Sign In */}
          <div className="flex space-x-6 items-center font-semibold">
            <div className="hidden lg:flex space-x-6 items-center">
              <Link to="/register">
                <div className="flex space-x-2">
                  <p className="text-gray-700 hover:text-black font-semibold cursor-pointer">
                    Login
                  </p>
                  <span className="text-gray-400">/</span>
                  <p className="text-gray-700 hover:text-black font-semibold cursor-pointer">
                    Register
                  </p>
                </div>
              </Link>
              <Link to="/wishlist">
                <CiHeart className="text-gray-700 hover:text-black w-8 h-8 cursor-pointer" />
              </Link>
            </div>
            <Link to='/cart'>
              <div className="relative">
                <HiOutlineShoppingCart className="text-gray-700 hover:text-black w-8 h-8 cursor-pointer" />
                <span className="absolute top-0 left-5 bg-secondary text-white text-xs rounded-full px-1.5 py-0.5">
                  0
                </span>
              </div>
            </Link>
          </div>
        </div>
        <div className="header-sticky w-full">
          <DesktopNav />
          <MobileNav isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        </div>
      </header>
    </div>
  );
}
