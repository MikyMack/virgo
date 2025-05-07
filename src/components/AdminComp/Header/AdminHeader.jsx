import PropTypes from 'prop-types';
import { FaChartPie, FaBoxOpen, FaTags, FaClipboardList, FaTachometerAlt, FaUsers, FaThList, FaCog, FaSignOutAlt, FaTimes } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../../assets/logo/logo.webp';
import { adminLogout } from '../../../actions/adminactions/authactions/Login';

export default function AdminSidebar({ menuOpen, setMenuOpen }) {
    const navigate= useNavigate();

    const handleLogout =()=>{
        adminLogout();
        navigate('/admin/AdminSignin/');
      }

    return (
        <div className={`fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-indigo-300 to-purple-300 text-white shadow-xl transform ${menuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out z-50`}>
            
            {/* Logo & Close Button */}
            <div className="flex items-center justify-center px-5 py-5">
                <img src={logo} alt="Logo" className="h-20 w-20" />
                <button className="md:hidden text-white" onClick={() => setMenuOpen(false)}>
                    <FaTimes className="text-2xl" />
                </button>
            </div>

            {/* Navigation Links */}
            <nav className="mt-5 pb-20 h-full overflow-y-auto">
                <ul className="space-y-2 px-4">
                    <li>
                        <Link to="/admin/dashboard" className="flex items-center space-x-3 p-3 rounded-lg bg-indigo-700 bg-opacity-30 transition hover:bg-indigo-800">
                            <FaTachometerAlt className="text-yellow-500" />
                            <span>Dashboard</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/products" className="flex items-center space-x-3 p-3 rounded-lg bg-indigo-700 bg-opacity-30 transition hover:bg-indigo-800">
                            <FaBoxOpen className="text-green-500" />
                            <span>Products</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/category" className="flex items-center space-x-3 p-3 rounded-lg bg-indigo-700 bg-opacity-30 transition hover:bg-indigo-800">
                            <FaThList className="text-pink-500" />
                            <span>Categories</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/orders" className="flex items-center space-x-3 p-3 rounded-lg bg-indigo-700 bg-opacity-30 transition hover:bg-indigo-800">
                            <FaClipboardList className="text-purple-500" />
                            <span>Orders</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/customers" className="flex items-center space-x-3 p-3 rounded-lg bg-indigo-700 bg-opacity-30 transition hover:bg-indigo-800">
                            <FaUsers className="text-blue-400" />
                            <span>Customers</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/coupons" className="flex items-center space-x-3 p-3 rounded-lg bg-indigo-700 bg-opacity-30 transition hover:bg-indigo-800">
                            <FaTags className="text-white" />
                            <span>Coupons</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/banners" className="flex items-center space-x-3 p-3 rounded-lg bg-indigo-700 bg-opacity-30 transition hover:bg-indigo-800">
                            <FaChartPie className="text-purple-500" />
                            <span>Banners</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/settings" className="flex items-center space-x-3 p-3 rounded-lg bg-indigo-700 bg-opacity-30 transition hover:bg-indigo-800">
                            <FaCog className="text-black" />
                            <span>Settings</span>
                        </Link>
                    </li>
                    <li>
                        <button
                            onClick={handleLogout}
                            className="flex items-center space-x-3 p-3 rounded-lg bg-indigo-700 bg-opacity-30 transition hover:bg-indigo-800 w-full text-left"
                        >
                            <FaSignOutAlt className="text-red-500" />
                            <span>Logout</span>
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

AdminSidebar.propTypes = {
    menuOpen: PropTypes.bool.isRequired,
    setMenuOpen: PropTypes.func.isRequired,
};