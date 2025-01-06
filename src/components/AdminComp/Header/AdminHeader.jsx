import PropTypes from 'prop-types';
import { FaChartPie, FaBoxOpen, FaTags, FaClipboardList, FaTachometerAlt, FaTimes, FaUsers, FaThList } from 'react-icons/fa';
import { IoMdLogOut } from "react-icons/io";
import logo from "../../../assets/logo/logo.webp"
import { Link } from 'react-router-dom';
export default function AdminHeader({menuOpen,setMenuOpen}) {
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };
  return (
    <div className='font-abc'>
          <nav className={`w-full xl:px-6 px-1 bg-gray-900 h-screen text-white p-5 ${menuOpen ? 'block' : 'hidden'} md:block`}>
                <div className="flex items-center justify-center py-10">
                    <img src={logo} alt="Logo" className="h-20 w-20" />
                    <button className="md:hidden text-white" onClick={toggleMenu}>
                        <FaTimes />
                    </button>
                </div>
                <ul className="space-y-6 w-full">
                    <hr className="border-[#b8ccc6]" />
                    <li>
                        <Link to="/admin/dashboard" className="flex items-center space-x-2 hover:text-gray-400">
                            <FaTachometerAlt className='text-yellow-600' /> <span>Dashboard</span>
                        </Link>
                    </li>
                    <hr className="border-[#b8ccc6]" />
                    <li>
                        <Link to="/admin/products" className="flex items-center space-x-2 hover:text-gray-400">
                            <FaBoxOpen className='text-green-500' /> <span>Products</span>
                        </Link>
                    </li>
                    <hr className="border-[#b8ccc6]" />
                    <li>
                        <Link to="/admin/category" className="flex items-center space-x-2 hover:text-gray-400">
                            <FaThList className='text-red-500' /> <span>Categories</span>
                        </Link>
                    </li>
                    <hr className="border-[#b8ccc6]" />
                    <li>
                        <Link to="/admin/orders" className="flex items-center space-x-2 hover:text-gray-400">
                            <FaClipboardList className='text-blue-600' /> <span>Orders</span>
                        </Link>
                    </li>
                    <hr className="border-[#b8ccc6]" />
                    <li>
                        <Link to="/admin/customers" className="flex items-center space-x-2 hover:text-gray-400">
                            <FaUsers className='text-pink-400' /> <span>Customers</span>
                        </Link>
                    </li>
                    <hr className="border-[#b8ccc6]"/>
                    <li>
                        <Link to="/admin/coupons" className="flex items-center space-x-2 hover:text-gray-400">
                            <FaTags /> <span>Coupons</span>
                        </Link>
                    </li>
                    <hr className="border-[#b8ccc6]" />
                    <li>
                        <Link to="/admin/banners" className="flex items-center space-x-2 hover:text-gray-400">
                            <FaChartPie className='text-purple-400' /> <span>Banners</span>
                        </Link>
                    </li>
                    <hr className="border-[#b8ccc6]" />
                    <li>
                        <Link to="/logout" className="flex items-center space-x-2 hover:text-gray-400">
                            <IoMdLogOut className='text-red-800' /> <span>Logout</span>
                        </Link>
                    </li>
                    <hr className="border-[#b8ccc6]" />
                </ul>
            </nav>
    </div>
  )
}

AdminHeader.propTypes = {
    menuOpen: PropTypes.bool.isRequired,
    setMenuOpen: PropTypes.func.isRequired,
};