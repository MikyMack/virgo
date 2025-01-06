import { Link } from 'react-router-dom';
import './header.css';
import Navlinks from './Navlinks';

const DesktopNav = () => {
  return (
    <nav className='bg-white'>
      <div className='flex items-center font-abc font-medium justify-around'>
        <ul className='md:flex hidden lowercase items-center gap-8 font-abc'>
          <Navlinks />
          <Link to="/shop">
          <li className='cursor-pointer hover:text-gray-600'>Shop</li>
          </Link>
          <Link to="/blogs">
          <li className='cursor-pointer hover:text-gray-600'>Articles</li>
          </Link>
          
        </ul>
      </div>
    </nav>
  );
};

export default DesktopNav;
