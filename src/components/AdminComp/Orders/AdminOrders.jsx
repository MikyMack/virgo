import { useState } from 'react';
import { FaUserCircle, FaCog, FaSignOutAlt, FaBars, FaPrint, FaEye, FaDownload } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import AdminHeader from '../Header/AdminHeader';
import bgim from "../../../assets/banner/dashboarbg.jpg"
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default function AdminOrders() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [profileMenuOpen, setProfileMenuOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [orderLimit, setOrderLimit] = useState('');
    const [methodFilter, setMethodFilter] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const orders = [
        { id: 1, invoiceNo: 'INV001', orderTime: '2024-08-01 10:00', customerName: 'sara', method: 'Cash', amount: 1000, status: 'Delivered' },
        { id: 2, invoiceNo: 'INV002', orderTime: '2024-07-02 11:00', customerName: 'jijomon', method: 'Card', amount: 2000, status: 'Pending' },
        { id: 3, invoiceNo: 'INV003', orderTime: '2024-08-03 12:00', customerName: 'Ajmalsha', method: 'Credit', amount: 1500, status: 'Processing' },
        { id: 4, invoiceNo: 'INV004', orderTime: '2024-07-04 13:00', customerName: 'Achu', method: 'Cash', amount: 2500, status: 'Cancelled' },
        { id: 5, invoiceNo: 'INV001', orderTime: '2024-06-01 10:00', customerName: 'Soman thankan', method: 'Cash', amount: 1000, status: 'Delivered' },
        { id: 6, invoiceNo: 'INV002', orderTime: '2024-07-02 11:00', customerName: 'Varkichayan', method: 'Card', amount: 2000, status: 'Pending' },
        { id: 7, invoiceNo: 'INV003', orderTime: '2024-07-03 12:00', customerName: 'Muhammad bilal', method: 'Credit', amount: 1500, status: 'Processing' },
        { id: 8, invoiceNo: 'INV004', orderTime: '2024-07-04 13:00', customerName: 'Shaji pappan', method: 'Cash', amount: 2500, status: 'Cancelled' },
    ];

    const filteredOrders = orders.filter(order =>
        (searchTerm === '' || order.customerName.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (statusFilter === '' || order.status === statusFilter) &&
        (methodFilter === '' || order.method === methodFilter) &&
        (startDate === '' || new Date(order.orderTime) >= new Date(startDate)) &&
        (endDate === '' || new Date(order.orderTime) <= new Date(endDate))
    );

    const handleResetFilters = () => {
        setSearchTerm('');
        setStatusFilter('');
        setOrderLimit('');
        setMethodFilter('');
        setStartDate('');
        setEndDate('');
    };

    const handleDownloadPDF = () => {
        const doc = new jsPDF();
        doc.text('Orders Report', 14, 16);
        doc.autoTable({
            head: [['Invoice No', 'Order Time', 'Customer Name', 'Method', 'Amount (₹)', 'Status']],
            body: filteredOrders.map(order => [order.invoiceNo, order.orderTime, order.customerName, order.method, order.amount, order.status]),
            startY: 20,
        });
        doc.save('orders_report.pdf');
    };

    return (
        <div className="flex flex-col md:flex-row font-abc">
            <div className='md:w-1/3 lg:w-1/3 xl:w-1/5'>
                <AdminHeader menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
            </div>
            <div className="w-full p-5 py-10" style={{ backgroundImage: `url(${bgim})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <header className="flex items-center justify-between mb-5 md:mb-10">
                    <h1 className="text-2xl md:text-3xl font-bold text-white">Orders Management</h1>
                    <div className="relative">
                        <button className="flex items-center space-x-2 text-white hover:text-gray-300" onClick={() => setProfileMenuOpen(!profileMenuOpen)}>
                            <FaUserCircle className="text-2xl" />
                            <span>Profile</span>
                        </button>
                        {profileMenuOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                                <Link to="/admin/settings" className="flex items-center space-x-2 px-4 py-2 text-gray-800 hover:bg-gray-100">
                                    <FaCog /> <span>Settings</span>
                                </Link>
                                <Link to="/logout" className="flex items-center space-x-2 px-4 py-2 text-gray-800 hover:bg-gray-100">
                                    <FaSignOutAlt /> <span>Logout</span>
                                </Link>
                            </div>
                        )}
                    </div>
                    <button className="md:hidden text-gray-800" onClick={() => setMenuOpen(!menuOpen)}>
                        <FaBars />
                    </button>
                </header>
                <header className="flex flex-col md:flex-col mb-5">
                    <div className="space-y-2 md:space-y-0 md:space-x-2 flex flex-col md:flex-row items-center justify-between">
                        <input type="text" placeholder="Search by customer name" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="border-b outline-none p-2 rounded w-full md:w-auto" />
                        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="border-b outline-none p-2 rounded w-full md:w-auto">
                            <option value="">Status</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Pending">Pending</option>
                            <option value="Processing">Processing</option>
                            <option value="Cancelled">Cancelled</option>
                        </select>
                        <select value={orderLimit} onChange={(e) => setOrderLimit(e.target.value)} className="border-b outline-none p-2 rounded w-full md:w-auto">
                            <option value="">Order Limits</option>
                            <option value="5">Last 5 days</option>
                            <option value="7">Last 7 days</option>
                            <option value="15">Last 15 days</option>
                            <option value="30">Last 30 days</option>
                        </select>
                        <select value={methodFilter} onChange={(e) => setMethodFilter(e.target.value)} className="border-b outline-none p-2 rounded w-full md:w-auto">
                            <option value="">All Methods</option>
                            <option value="Cash">Cash</option>
                            <option value="Card">Card</option>
                            <option value="Credit">Credit</option>
                        </select>

                        <div className='flex items-center justify-center'>
                            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="border-b outline-none p-2 rounded" />
                            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="border-b outline-none p-2 rounded ml-2" />
                            <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded ml-2" onClick={handleResetFilters}>Reset Filters</button>
                        </div>
                        <button className="bg-green-700 text-white px-4 py-2 rounded flex items-center gap-2 w-full md:w-auto" onClick={handleDownloadPDF}>
                            <FaDownload /> Download all orders
                        </button>
                    </div>

                    <hr />
                </header>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr>
                                <th className="py-2 px-4">Invoice No</th>
                                <th className="py-2 px-4">Order Time</th>
                                <th className="py-2 px-4">Customer Name</th>
                                <th className="py-2 px-4">Method</th>
                                <th className="py-2 px-4">Amount (₹)</th>
                                <th className="py-2 px-4">Status</th>
                                <th className="py-2 px-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredOrders?.map(order => (
                                <tr key={order.id}>
                                    <td className="border px-4 py-2 text-center">{order.invoiceNo}</td>
                                    <td className="border px-4 py-2 text-center">{order.orderTime}</td>
                                    <td className="border px-4 py-2 text-center">{order.customerName}</td>
                                    <td className="border px-4 py-2 text-center">{order.method}</td>
                                    <td className="border px-4 py-2 text-center">{order.amount}</td>
                                    <td className="border px-4 py-2 text-center">
                                        <select value={order.status} onChange={() => { }} className="border-b outline-none p-2 rounded">
                                            <option value="Delivered">Delivered</option>
                                            <option value="Pending">Pending</option>
                                            <option value="Processing">Processing</option>
                                            <option value="Cancelled">Cancelled</option>
                                        </select>
                                    </td>
                                    <td className="border px-4 py-2 text-center">
                                        <button className="text-blue-500 hover:text-blue-700 px-2 py-1 rounded text-xl"><FaEye /></button>
                                        <button className="text-gray-500 hover:text-gray-700 px-2 py-1 rounded text-xl"><FaPrint /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
