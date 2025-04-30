import { Link } from 'react-router-dom';
import './header.css';
import Navlinks from './Navlinks';

const DesktopNav = () => {
  return (
    
    <nav className='bg-white'>
      <div className='flex items-center font-abc font-semibold justify-around'>
        <ul className='md:flex hidden lowercase items-center gap-8'>
          <Navlinks />
          <Link to="/shop">
            <li className='cursor-pointer text-gray-700 hover:text-black transition-all'>SHOP</li>
          </Link>
          <Link to="/blogs">
            <li className='cursor-pointer text-gray-700 hover:text-black transition-all'>Articles</li>
          </Link>
        </ul>
      </div>
    </nav>
  );
};

export default DesktopNav;
