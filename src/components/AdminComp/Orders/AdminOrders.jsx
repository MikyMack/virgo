import { useEffect, useState } from 'react';
import { FaUserCircle, FaCog, FaSignOutAlt, FaBars, FaPrint, FaEye, FaDownload } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import AdminHeader from '../Header/AdminHeader';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import logo from '../../../assets/logo/logo.webp'; // Ensure this path is correct

export default function AdminOrders() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [profileMenuOpen, setProfileMenuOpen] = useState(false);
    const [filterPopupOpen, setFilterPopupOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [methodFilter, setMethodFilter] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [ordersPerPage] = useState(5);

    // Manage orders state to allow status updates
    const [orders, setOrders] = useState([
        { id: 1, invoiceNo: 'INV001', orderTime: '2024-08-01 10:00', customerName: 'sara', method: 'Cash', amount: 1000, status: 'Delivered' },
        { id: 2, invoiceNo: 'INV002', orderTime: '2024-07-02 11:00', customerName: 'jijomon', method: 'Card', amount: 2000, status: 'Pending' },
        { id: 3, invoiceNo: 'INV003', orderTime: '2024-08-03 12:00', customerName: 'Ajmalsha', method: 'Credit', amount: 1500, status: 'Processing' },
        { id: 4, invoiceNo: 'INV004', orderTime: '2024-07-04 13:00', customerName: 'Achu', method: 'Cash', amount: 2500, status: 'Cancelled' },
        { id: 5, invoiceNo: 'INV005', orderTime: '2024-06-01 10:00', customerName: 'Soman thankan', method: 'Cash', amount: 1000, status: 'Delivered' },
        { id: 6, invoiceNo: 'INV006', orderTime: '2024-07-02 11:00', customerName: 'Varkichayan lobby', method: 'Card', amount: 2000, status: 'Pending' },
        { id: 7, invoiceNo: 'INV007', orderTime: '2024-07-03 12:00', customerName: 'Muhammad bilal', method: 'Credit', amount: 1500, status: 'Processing' },
        { id: 8, invoiceNo: 'INV008', orderTime: '2024-07-04 13:00', customerName: 'Shaji pappan', method: 'Cash', amount: 2500, status: 'Cancelled' },
        { id: 9, invoiceNo: 'INV009', orderTime: '2024-07-05 14:00', customerName: 'John Doe', method: 'Card', amount: 3000, status: 'Delivered' },
        { id: 10, invoiceNo: 'INV010', orderTime: '2024-07-06 15:00', customerName: 'Jane Smith', method: 'Credit', amount: 3500, status: 'Pending' },
        { id: 11, invoiceNo: 'INV011', orderTime: '2024-07-07 16:00', customerName: 'Robert Johnson', method: 'Cash', amount: 4000, status: 'Processing' },
        { id: 12, invoiceNo: 'INV012', orderTime: '2024-07-08 17:00', customerName: 'Emily Davis', method: 'Card', amount: 4500, status: 'Cancelled' },
    ]);

    // Filter orders based on search and filters
    const filteredOrders = orders.filter(order =>
        (searchTerm === '' || order.customerName.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (statusFilter === '' || order.status === statusFilter) &&
        (methodFilter === '' || order.method === methodFilter) &&
        (startDate === '' || new Date(order.orderTime) >= new Date(startDate)) &&
        (endDate === '' || new Date(order.orderTime) <= new Date(endDate))
    );

    // Reset to page 1 whenever filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, statusFilter, methodFilter, startDate, endDate]);

    // Get current orders
    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
    const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleResetFilters = () => {
        setSearchTerm('');
        setStatusFilter('');
        setMethodFilter('');
        setStartDate('');
        setEndDate('');
        setCurrentPage(1);
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

    const handleViewOrder = (order) => {
        setSelectedOrder(order);
    };

    const handleCloseModal = () => {
        setSelectedOrder(null);
    };

    // Update order status
    const handleStatusChange = (orderId, newStatus) => {
        setOrders(orders.map(order =>
            order.id === orderId ? { ...order, status: newStatus } : order
        ));
    };

    const handlePrintClick = (order) => {
        // Convert logo to base64 to ensure it loads in the print window
        const img = new Image();
        img.src = logo;
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            const base64Logo = canvas.toDataURL('image/webp');

            const printWindow = window.open('', '_blank');
            printWindow.document.write(`
                <html>
                    <head>
                        <title>Invoice ${order.invoiceNo}</title>
                        <style>
                            body { font-family: Arial, sans-serif; padding: 20px; }
                            .invoice-container { max-width: 800px; margin: auto; border: 1px solid #ccc; padding: 20px; }
                            .header { text-align: center; margin-bottom: 20px; }
                            .header img { max-width: 100px; height: auto; }
                            .header h1 { margin: 0; }
                            .details { margin-bottom: 20px; }
                            table { width: 100%; border-collapse: collapse; }
                            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                            th { background-color: #f2f2f2; }
                            @media print {
                                .no-print { display: none; }
                            }
                        </style>
                    </head>
                    <body>
                        <div class="invoice-container">
                            <div class="header">
                                <img src="${base64Logo}" alt="Logo" />
                                <h1>Invoice</h1>
                            </div>
                            <div class="details">
                                <p><strong>Invoice No:</strong> ${order.invoiceNo}</p>
                                <p><strong>Order Time:</strong> ${order.orderTime}</p>
                                <p><strong>Customer Name:</strong> ${order.customerName}</p>
                                <p><strong>Payment Method:</strong> ${order.method}</p>
                                <p><strong>Amount:</strong> ₹${order.amount}</p>
                                <p><strong>Status:</strong> ${order.status}</p>
                            </div>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>${order.customerName}</td>
                                        <td>₹${order.amount}</td>
                                    </tr>
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td><strong>Total</strong></td>
                                        <td><strong>₹${order.amount}</strong></td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                        <script>
                            window.print();
                            window.onafterprint = function() { window.close(); };
                        </script>
                    </body>
                </html>
            `);
            printWindow.document.close();
        };
        img.onerror = () => {
            console.error('Failed to load logo image');
            // Fallback without logo
            const printWindow = window.open('', '_blank');
            printWindow.document.write(`
                <html>
                    <head>
                        <title>Invoice ${order.invoiceNo}</title>
                        <style>
                            body { font-family: Arial, sans-serif; padding: 20px; }
                            .invoice-container { max-width: 800px; margin: auto; border: 1px solid #ccc; padding: 20px; }
                            .header { text-align: center; margin-bottom: 20px; }
                            .header h1 { margin: 0; }
                            .details { margin-bottom: 20px; }
                            table { width: 100%; border-collapse: collapse; }
                            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                            th { background-color: #f2f2f2; }
                            @media print {
                                .no-print { display: none; }
                            }
                        </style>
                    </head>
                    <body>
                        <div class="invoice-container">
                            <div class="header">
                                <h1>Invoice</h1>
                            </div>
                            <div class="details">
                                <p><strong>Invoice No:</strong> ${order.invoiceNo}</p>
                                <p><strong>Order Time:</strong> ${order.orderTime}</p>
                                <p><strong>Customer Name:</strong> ${order.customerName}</p>
                                <p><strong>Payment Method:</strong> ${order.method}</p>
                                <p><strong>Amount:</strong> ₹${order.amount}</p>
                                <p><strong>Status:</strong> ${order.status}</p>
                            </div>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>${order.customerName}</td>
                                        <td>₹${order.amount}</td>
                                    </tr>
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td><strong>Total</strong></td>
                                        <td><strong>₹${order.amount}</strong></td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                        <script>
                            window.print();
                            window.onafterprint = function() { window.close(); };
                        </script>
                    </body>
                </html>
            `);
            printWindow.document.close();
        };
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <div className={`fixed inset-y-0 left-0 w-72 bg-white shadow-xl z-40 ${menuOpen ? 'block' : 'hidden'} md:block`}>
                <AdminHeader menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
            </div>

            {/* Overlay for mobile sidebar */}
            {menuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 md:hidden"
                    onClick={() => setMenuOpen(false)}
                />
            )}

            {/* Main Content */}
            <div className="flex-1 md:ml-72">
                {/* Header */}
                <header className="bg-white shadow-md px-6 py-4 flex items-center justify-between sticky top-0 z-20">
                    <div className="flex items-center gap-4">
                        <button
                            className="md:hidden text-gray-600 hover:text-gray-800 transition-colors"
                            onClick={() => setMenuOpen(true)}
                        >
                            <FaBars size={24} />
                        </button>
                        <h1 className="text-xl md:text-2xl font-bold text-gray-900">Orders Management</h1>
                    </div>
                    <div className="relative">
                        <button
                            className="flex items-center space-x-2 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                            onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                        >
                            <FaUserCircle className="text-2xl text-indigo-600" />
                            <span className="hidden md:inline text-gray-700">Profile</span>
                        </button>
                        {profileMenuOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 border border-gray-200 z-20">
                                <Link to="/admin/settings" className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100">
                                    <FaCog className="text-black" />
                                    <span>Settings</span>
                                </Link>
                                <Link to="/logout" className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100">
                                    <FaSignOutAlt className="text-red-500" />
                                    <span>Logout</span>
                                </Link>
                            </div>
                        )}
                    </div>
                </header>

                {/* Main Content */}
                <main className="p-6 max-w-7xl mx-auto">
                    {/* Filters */}
                    <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
                        <div className="flex items-center justify-between gap-3 flex-wrap">
                            <div className="flex items-center gap-2">
                                <input
                                    type="text"
                                    placeholder="Search by Customer name"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full sm:w-60 px-4 py-2 bg-gray-200 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="relative">
                                    <button
                                        onClick={() => setFilterPopupOpen(!filterPopupOpen)}
                                        className="w-full sm:w-40 px-4 py-2 bg-gray-200 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                                    >
                                        Filter
                                    </button>
                                    {filterPopupOpen && (
                                        <div className="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg p-4 border border-gray-200 z-20">
                                            <div className="space-y-3">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                                    <select
                                                        value={statusFilter}
                                                        onChange={(e) => setStatusFilter(e.target.value)}
                                                        className="w-full px-2 py-1 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors text-sm"
                                                    >
                                                        <option value="">All</option>
                                                        <option value="Delivered">Delivered</option>
                                                        <option value="Pending">Pending</option>
                                                        <option value="Processing">Processing</option>
                                                        <option value="Cancelled">Cancelled</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Method</label>
                                                    <select
                                                        value={methodFilter}
                                                        onChange={(e) => setMethodFilter(e.target.value)}
                                                        className="w-full px-2 py-1 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors text-sm"
                                                    >
                                                        <option value="">All</option>
                                                        <option value="Cash">Cash</option>
                                                        <option value="Card">Card</option>
                                                        <option value="Credit">Credit</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
                                                    <div className="flex flex-col gap-2">
                                                        <div>
                                                            <label className="block text-xs font-medium text-gray-700 mb-1">From</label>
                                                            <input
                                                                type="date"
                                                                value={startDate}
                                                                onChange={(e) => setStartDate(e.target.value)}
                                                                className="w-full px-2 py-1 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors text-sm"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="block text-xs font-medium text-gray-700 mb-1">To</label>
                                                            <input
                                                                type="date"
                                                                value={endDate}
                                                                onChange={(e) => setEndDate(e.target.value)}
                                                                className="w-full px-2 py-1 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors text-sm"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <button
                                    onClick={handleResetFilters}
                                    className="w-full sm:w-40 px-4 py-2 bg-gray-200 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                                >
                                    Reset
                                </button>
                                <button
                                    onClick={handleDownloadPDF}
                                    className="px-4 py-2 bg-indigo-800 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                                    aria-label="Download PDF"
                                >
                                    <FaDownload />
                                </button>
                                <div className="text-sm text-gray-500">
                                    {filteredOrders.length}/{orders.length}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Orders Table */}
                    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice No</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Time</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {currentOrders.length > 0 ? (
                                        currentOrders.map(order => (
                                            <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.invoiceNo}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.orderTime}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.customerName}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.method}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹{order.amount}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <select
                                                        value={order.status}
                                                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                                        className={`px-2 py-1 text-xs rounded-full focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
                                                            order.status === 'Delivered' ? 'bg-green-100 text-green-800 focus:ring-green-500' :
                                                            order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800 focus:ring-yellow-500' :
                                                            order.status === 'Processing' ? 'bg-blue-100 text-blue-800 focus:ring-blue-500' :
                                                            'bg-red-100 text-red-800 focus:ring-red-500'
                                                        }`}
                                                        aria-label={`Status for order ${order.invoiceNo}`}
                                                    >
                                                        <option value="Delivered">Delivered</option>
                                                        <option value="Pending">Pending</option>
                                                        <option value="Processing">Processing</option>
                                                        <option value="Cancelled">Cancelled</option>
                                                    </select>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    <div className="flex space-x-2">
                                                        <button
                                                            className="p-2 text-blue-500 hover:bg-blue-100 rounded-full transition-colors"
                                                            onClick={() => handleViewOrder(order)}
                                                            aria-label={`View order ${order.invoiceNo}`}
                                                        >
                                                            <FaEye />
                                                        </button>
                                                        <button
                                                            className="p-1 text-gray-600 hover:text-gray-900 transition-colors"
                                                            onClick={() => handlePrintClick(order)}
                                                            aria-label={`Print order ${order.invoiceNo}`}
                                                        >
                                                            <FaPrint />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="7" className="px-6 py-4 text-center text-sm text-gray-500">
                                                No orders found
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Pagination */}
                    {filteredOrders.length > ordersPerPage && (
                        <div className="flex items-center justify-between mt-4 bg-white rounded-xl shadow-sm p-4">
                            <div className="text-sm text-gray-700">
                                Showing <span className="font-medium">{indexOfFirstOrder + 1}</span> to{' '}
                                <span className="font-medium">
                                    {Math.min(indexOfLastOrder, filteredOrders.length)}
                                </span>{' '}
                                of <span className="font-medium">{filteredOrders.length}</span> results
                            </div>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => paginate(Math.max(1, currentPage - 1))}
                                    disabled={currentPage === 1}
                                    className={`px-4 py-2 border rounded-lg ${currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                                >
                                    Previous
                                </button>
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                                    <button
                                        key={number}
                                        onClick={() => paginate(number)}
                                        className={`px-4 py-2 border rounded-lg ${currentPage === number ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                                    >
                                        {number}
                                    </button>
                                ))}
                                <button
                                    onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                                    disabled={currentPage === totalPages}
                                    className={`px-4 py-2 border rounded-lg ${currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    )}
                </main>

                {/* Modal for Order Details */}
                {selectedOrder && (
                    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
                        <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Order Details</h2>
                            <div className="space-y-3">
                                <p><span className="font-medium text-gray-700">Invoice No:</span> {selectedOrder.invoiceNo}</p>
                                <p><span className="font-medium text-gray-700">Order Time:</span> {selectedOrder.orderTime}</p>
                                <p><span className="font-medium text-gray-700">Customer:</span> {selectedOrder.customerName}</p>
                                <p><span className="font-medium text-gray-700">Method:</span> {selectedOrder.method}</p>
                                <p><span className="font-medium text-gray-700">Amount:</span> ₹{selectedOrder.amount}</p>
                                <p><span className="font-medium text-gray-700">Status:</span> {selectedOrder.status}</p>
                            </div>
                            <button
                                onClick={handleCloseModal}
                                className="mt-6 w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}