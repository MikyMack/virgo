import { Link } from 'react-router-dom';
import { FaBars, FaUserCircle, FaCog, FaSignOutAlt, FaRupeeSign, FaSmile, FaShoppingCart, FaCalendarAlt, FaFilter, FaUsers, FaClipboardList, FaChartLine, FaBoxOpen, FaStar, FaClock, FaCheck } from 'react-icons/fa';
import { Line, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import { IoMdPrint } from "react-icons/io";
import 'react-datepicker/dist/react-datepicker.css';
import AdminHeader from '../../../components/AdminComp/Header/AdminHeader';
import { MdOutlinePreview } from "react-icons/md";
import bgim from "../../../assets/banner/dashboarbg.jpg"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

const salesData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
        {
            label: 'Sales',
            data: [1200, 1900, 3000, 5000, 2300, 3200, 4100, 3800, 4500, 5200, 6100, 7000],
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: true,
        },
    ],
};

const bestSellingProductsData = {
    labels: ['Product 1', 'Product 2', 'Product 3', 'Product 4'],
    datasets: [
        {
            label: 'Best Selling Products',
            data: [300, 50, 100, 150],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
            hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
        },
    ],
};

const recentOrders = [
    { id: 1, invoiceNo: 'INV001', orderTime: '2023-01-01 10:00', customerName: 'John Doe', productName: 'Product 1', method: 'Credit Card', amount: '100', status: 'Completed' },
    { id: 2, invoiceNo: 'INV002', orderTime: '2023-01-02 11:00', customerName: 'Jane Smith', productName: 'Product 2', method: 'PayPal', amount: '200', status: 'Pending' },
    { id: 3, invoiceNo: 'INV003', orderTime: '2023-01-03 12:00', customerName: 'Alice Johnson', productName: 'Product 3', method: 'Credit Card', amount: '150', status: 'Processing' },
];

export default function AdminDashboard() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [profileMenuOpen, setProfileMenuOpen] = useState(false);
    const [startDate, setStartDate] = useState(new Date());

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const toggleProfileMenu = () => {
        setProfileMenuOpen(!profileMenuOpen);
    };

    return (
        <div className="flex flex-col md:flex-row font-abc">
            <div className='md:w-1/3 lg:w-1/3 xl:w-1/5'>
                <AdminHeader menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
            </div>
            <main className="w-full h-full p-5 md:p-10 bg-gray-100" style={{ backgroundImage: `url(${bgim})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <header className="flex items-center justify-between mb-5 md:mb-10">
                    <h1 className="text-2xl md:text-3xl font-bold text-white">Admin Dashboard</h1>
                    <div className="relative">
                        <button className="flex items-center space-x-2 text-white hover:text-gray-300" onClick={toggleProfileMenu}>
                            <FaUserCircle className="text-2xl" />
                            <span>Profile</span>
                        </button>
                        {profileMenuOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                                <Link to="/admin/settings" className="flex items-center space-x-2 px-4 py-2 text-gray-800 hover:bg-gray-100">
                                    <FaCog /> <span>Settings</span>
                                </Link>
                                <Link to="/admin/AdminSignin" className="flex items-center space-x-2 px-4 py-2 text-gray-800 hover:bg-gray-100">
                                    <FaSignOutAlt /> <span>LogIn</span>
                                </Link>
                            </div>
                        )}
                    </div>
                    <button className="md:hidden text-gray-800" onClick={toggleMenu}>
                        <FaBars />
                    </button>
                </header>
                <section className="space-y-5 md:space-y-10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
                        <div className="bg-white p-5 rounded shadow flex items-center space-x-3 hover:scale-95 duration-100">
                            <FaRupeeSign className=" text-white bg-green-400 text-4xl p-2 rounded-md" />
                            <div>
                                <h2 className="text-lg md:text-xl font-semibold">Revenue</h2>
                                <p className="text-xl md:text-2xl">₹10,000</p>
                            </div>
                        </div>
                        <div className="bg-white p-5 rounded shadow flex items-center space-x-3 hover:scale-95 duration-100">
                            <FaShoppingCart className="text-white bg-red-400 text-4xl p-2 rounded-md" />
                            <div>
                                <h2 className="text-lg md:text-xl font-semibold">Expense</h2>
                                <p className="text-xl md:text-2xl">₹5,000</p>
                            </div>
                        </div>
                        <div className="bg-white p-5 rounded shadow flex items-center space-x-3 hover:scale-95 duration-100">
                            <FaSmile className="text-white bg-yellow-700 text-4xl p-2 rounded-md" />
                            <div>
                                <h2 className="text-lg md:text-xl font-semibold">Happy Clients</h2>
                                <p className="text-xl md:text-2xl">200</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="flex space-x-3 mb-3 md:mb-0">
                            <button className="bg-white p-2 rounded shadow hover:bg-gray-100">Today</button>
                            <button className="bg-white p-2 rounded shadow hover:bg-gray-100">Week</button>
                            <button className="bg-white p-2 rounded shadow hover:bg-gray-100">Month</button>
                            <button className="bg-white p-2 rounded shadow hover:bg-gray-100">Year</button>
                        </div>
                        <div className="flex items-center space-x-3">
                            <FaCalendarAlt className="text-2xl text-white " />
                            <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} className="outline-none p-2 rounded shadow bg-white" />
                            <FaFilter className="text-2xl text-white" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
                        <div className="bg-white p-5 rounded shadow flex items-center space-x-3 hover:scale-95 duration-100">
                            <FaUsers className="text-2xl text-blue-500" />
                            <div>
                                <h2 className="text-lg md:text-xl font-semibold">Customers</h2>
                                <p className="text-xl md:text-2xl">150</p>
                            </div>
                        </div>
                        <div className="bg-white p-5 rounded shadow flex items-center space-x-3 hover:scale-95 duration-100">
                            <FaClipboardList className="text-2xl text-purple-500" />
                            <div>
                                <h2 className="text-lg md:text-xl font-semibold">Orders</h2>
                                <p className="text-xl md:text-2xl">150</p>
                            </div>
                        </div>
                        <div className="bg-white p-5 rounded shadow flex items-center space-x-3 hover:scale-95 duration-100">
                            <FaChartLine className="text-2xl text-green-500" />
                            <div>
                                <h2 className="text-lg md:text-xl font-semibold">Avg Sale</h2>
                                <p className="text-xl md:text-2xl">₹100</p>
                            </div>
                        </div>
                        <div className="bg-white p-5 rounded shadow flex items-center space-x-3 hover:scale-95 duration-100">
                            <FaBoxOpen className="text-2xl text-orange-500" />
                            <div>
                                <h2 className="text-lg md:text-xl font-semibold">Avg Item Sale</h2>
                                <p className="text-xl md:text-2xl">5</p>
                            </div>
                        </div>
                        <div className="bg-white p-5 rounded shadow flex items-center space-x-3 hover:scale-95 duration-100">
                            <FaRupeeSign className="text-2xl text-green-500" />
                            <div>
                                <h2 className="text-lg md:text-xl font-semibold">Total Sale</h2>
                                <p className="text-xl md:text-2xl">₹10,000</p>
                            </div>
                        </div>
                        <div className="bg-white p-5 rounded shadow flex items-center space-x-3 hover:scale-95 duration-100">
                            <FaUsers className="text-2xl text-blue-500" />
                            <div>
                                <h2 className="text-lg md:text-xl font-semibold">Visitors</h2>
                                <p className="text-xl md:text-2xl">500</p>
                            </div>
                        </div>
                        <div className="bg-white p-5 rounded shadow flex items-center space-x-3 hover:scale-95 duration-100">
                            <FaBoxOpen className="text-2xl text-orange-500" />
                            <div>
                                <h2 className="text-lg md:text-xl font-semibold">Total Products</h2>
                                <p className="text-xl md:text-2xl">200</p>
                            </div>
                        </div>
                        <div className="bg-white p-5 rounded shadow flex items-center space-x-3 hover:scale-95 duration-100">
                            <FaStar className="text-2xl text-yellow-500" />
                            <div>
                                <h2 className="text-lg md:text-xl font-semibold">Top Selling Item</h2>
                                <p className="text-xl md:text-2xl">Product 1</p>
                            </div>
                        </div>
                    </div>
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6'>
                        <div className="bg-white p-5 rounded shadow flex items-center space-x-3 hover:scale-95 duration-100">
                            <FaClipboardList className="text-2xl text-purple-500" />
                            <div>
                                <h2 className="text-lg md:text-xl font-semibold">Total Orders</h2>
                                <p className="text-xl md:text-2xl">150</p>
                            </div>
                        </div>
                        <div className="bg-white p-5 rounded shadow flex items-center space-x-3 hover:scale-95 duration-100">
                            <FaClock className="text-2xl text-yellow-500" />
                            <div>
                                <h2 className="text-lg md:text-xl font-semibold">Orders Pending</h2>
                                <p className="text-xl md:text-2xl">65</p>
                            </div>
                        </div>
                        <div className="bg-white p-5 rounded shadow flex items-center space-x-3 hover:scale-95 duration-100">
                            <FaCog className="text-2xl text-blue-500" />
                            <div>
                                <h2 className="text-lg md:text-xl font-semibold">Orders Processing</h2>
                                <p className="text-xl md:text-2xl">236</p>
                            </div>
                        </div>
                        <div className="bg-white p-5 rounded shadow flex items-center space-x-3 hover:scale-95 duration-100">
                            <FaCheck className="text-2xl text-green-500" />
                            <div>
                                <h2 className="text-lg md:text-xl font-semibold">Orders Delivered</h2>
                                <p className="text-xl md:text-2xl">100</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-5 rounded shadow overflow-x-auto">
                        <h2 className="text-lg md:text-xl font-semibold mb-5">Recent Orders</h2>
                        <table className="w-full">
                            <thead>
                                <tr>
                                    <th className="text-left">Invoice No</th>
                                    <th className="text-left">Order Time</th>
                                    <th className="text-left">Customer Name</th>
                                    <th className="text-left">Product Name</th>
                                    <th className="text-left">Method</th>
                                    <th className="text-left">Amount</th>
                                    <th className="text-left">Status</th>
                                    <th className="text-left">Action</th>
                                    <th className="text-left">Invoice</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentOrders.map(order => (
                                    <tr key={order.id}>
                                        <td>{order.invoiceNo}</td>
                                        <td>{order.orderTime}</td>
                                        <td>{order.customerName}</td>
                                        <td>{order.productName}</td>
                                        <td>{order.method}</td>
                                        <td>₹{order.amount}</td>
                                        <td>{order.status}</td>
                                        <td>
                                            <select className="rounded outline-none">
                                                <option value="cancel">Cancel</option>
                                                <option value="pending">Pending</option>
                                                <option value="delivered">Delivered</option>
                                                <option value="processing">Processing</option>
                                            </select>
                                        </td>
                                        <td>
                                            <button className="p-1 bg-blue-400 hover:bg-blue-600 text-white rounded"><MdOutlinePreview /></button>
                                            <button className="ml-1 p-1 bg-blue-400 hover:bg-blue-600 text-white rounded"><IoMdPrint /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="lg:w-full bg-white p-5 rounded shadow">
                        <h2 className="text-lg md:text-xl font-semibold mb-5">Sales Data</h2>
                        <div className="flex flex-col lg:flex-row">
                            <div className="lg:w-2/3">
                                <Line data={salesData} />
                            </div>
                            <div className="lg:w-1/3 mt-5 lg:mt-0">
                                <h2 className="text-lg md:text-xl font-semibold mb-5">Best Selling Products</h2>
                                <Doughnut data={bestSellingProductsData} />
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
