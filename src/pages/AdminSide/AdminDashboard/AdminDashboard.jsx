import { Link } from 'react-router-dom';
import { FaBars, FaUserCircle, FaCog, FaSignOutAlt, FaRupeeSign, FaSmile, FaShoppingCart, FaCalendarAlt, FaFilter, FaUsers, FaClipboardList, FaChartLine, FaBoxOpen, FaStar, FaClock, FaCheck, FaThList,FaTags,FaChartPie,FaTachometerAlt ,FaEye} from 'react-icons/fa';
import { Line, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { useState , useRef} from 'react';
import DatePicker from 'react-datepicker';
import { IoMdPrint } from "react-icons/io";
import 'react-datepicker/dist/react-datepicker.css';
import AdminHeader from '../../../components/AdminComp/Header/AdminHeader';
import { MdOutlinePreview } from "react-icons/md";
import logo from "../../../assets/logo/logo.webp"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

const salesData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
        {
            label: 'Sales',
            data: [1200, 1900, 3000, 5000, 2300, 3200, 4100, 3800, 4500, 5200, 6100, 7000],
            borderColor: 'rgba(79, 70, 229, 1)',
            backgroundColor: 'rgba(79, 70, 229, 0.1)',
            fill: true,
            tension: 0.3,
        },
    ],
};

const bestSellingProductsData = {
    labels: ['Product 1', 'Product 2', 'Product 3', 'Product 4'],
    datasets: [
        {
            label: 'Best Selling Products',
            data: [300, 50, 100, 150],
            backgroundColor: ['#4F46E5', '#10B981', '#F59E0B', '#EF4444'],
            hoverBackgroundColor: ['#4338CA', '#059669', '#D97706', '#DC2626'],
            borderWidth: 0,
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
    const printRef = useRef(); // Reference for the printable content

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const toggleProfileMenu = () => {
        setProfileMenuOpen(!profileMenuOpen);
    };

  
    
    const handlePreviewClick = (order) => {
        // Create a new window for previewing the invoice
        const previewWindow = window.open('', '_blank');
        previewWindow.document.write(`
            <html>
                <head>
                    <title>Invoice ${order.invoiceNo}</title>
                    <style>
                        body { font-family: Arial, sans-serif; padding: 20px; background-color: #f9f9f9; }
                        .invoice-container { max-width: 800px; margin: 0 auto; border: 1px solid #ccc; padding: 20px; background-color: #fff; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
                        .header { text-align: center; margin-bottom: 20px; }
                        .header img { max-width: 100px; }
                        .details { margin-bottom: 20px; }
                        .details p { margin: 5px 0; }
                        table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
                        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                        th { background-color: #f2f2f2; font-weight: bold; }
                        tfoot td { font-weight: bold; }
                        .print-button { text-align: center; }
                        .print-button button { padding: 10px 20px; background-color: #4F46E5; color: white; border: none; border-radius: 5px; cursor: pointer; }
                        .print-button button:hover { background-color: #4338CA; }
                    </style>
                </head>
                <body>
                    <div class="invoice-container">
                        <div class="header">
                            <img src="${logo}" alt="Logo" />
                            <h1>Invoice</h1>
                        </div>
                        <div class="details">
                            <p><strong>Invoice No:</strong> ${order.invoiceNo}</p>
                            <p><strong>Order Time:</strong> ${order.orderTime}</p>
                            <p><strong>Customer Name:</strong> ${order.customerName}</p>
                            <p><strong>Payment Method:</strong> ${order.method}</p>
                            <p><strong>Status:</strong> ${order.status}</p>
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>${order.productName}</td>
                                    <td>₹${order.amount}</td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td>Total</td>
                                    <td>₹${order.amount}</td>
                                </tr>
                            </tfoot>
                        </table>
                        <div class="print-button">
                            <button onclick="window.print()">Print Invoice</button>
                        </div>
                    </div>
                </body>
            </html>
        `);
        previewWindow.document.close();
    };

    // Function to handle print click
    const handlePrintClick = (order) => {
        // Create a new window for printing
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
                <head>
                    <title>Invoice ${order.invoiceNo}</title>
                    <style>
                        body { font-family: Arial, sans-serif; padding: 20px; }
                        .invoice-container { max-width: 800px; margin: auto; border: 1px solid #ccc; padding: 20px; }
                        .header { text-align: center; margin-bottom: 20px; }
                        .header img { max-width: 100px; }
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
                            <img src="${logo}" alt="Logo" />
                            <h1>Invoice</h1>
                        </div>
                        <div class="details">
                            <p><strong>Invoice No:</strong> ${order.invoiceNo}</p>
                            <p><strong>Order Time:</strong> ${order.orderTime}</p>
                            <p><strong>Customer Name:</strong> ${order.customerName}</p>
                            <p><strong>Payment Method:</strong> ${order.method}</p>
                            <p><strong>Status:</strong> ${order.status}</p>
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>${order.productName}</td>
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
    return (
        <div className="flex font-sans h-screen bg-gray-50">
            <AdminHeader></AdminHeader>

            {/* Scrollable Main Content */}
            <main className="flex-1 h-full overflow-y-auto ml-0 md:ml-64 bg-gray-50">
                {/* Header with Glass Effect */}
                <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b border-gray-200">
                    <div className="flex items-center justify-between p-4">
                        <div className="flex items-center">
                            <button className="md:hidden mr-4 text-gray-600" onClick={toggleMenu}>
                                <FaBars className="text-xl" />
                            </button>
                            <h1 className="text-xl md:text-2xl font-semibold text-black ">Dashboard Overview</h1>
                        </div>
                        <div className="relative">
                            <button 
                                className="flex items-center space-x-2 p-2 rounded-full bg-gray-300 transition-colors"
                                onClick={toggleProfileMenu}
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
                                    <Link to="/admin/AdminSignin" className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100">
                                        <FaSignOutAlt className="text-red-700" /> 
                                        <span>Logout</span>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                {/* Dashboard Content */}
                <div className="p-5 md:p-8">
                    {/* Summary Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                            <div className="flex items-center space-x-4">
                                <div className="p-3 rounded-lg bg-indigo-50 text-green-500">
                                    <FaRupeeSign className="text-xl" />
                                </div>
                                <div>
                                    <h2 className="text-sm font-medium text-gray-500">Revenue</h2>
                                    <p className="text-xl font-semibold">₹10,000</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                            <div className="flex items-center space-x-4">
                                <div className="p-3 rounded-lg bg-red-50 text-red-600">
                                    <FaShoppingCart className="text-xl" />
                                </div>
                                <div>
                                    <h2 className="text-sm font-medium text-gray-500">Expense</h2>
                                    <p className="text-xl font-semibold">₹5,000</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                            <div className="flex items-center space-x-4">
                                <div className="p-3 rounded-lg bg-yellow-50 text-yellow-600">
                                    <FaSmile className="text-xl" />
                                </div>
                                <div>
                                    <h2 className="text-sm font-medium text-gray-500">Happy Clients</h2>
                                    <p className="text-xl font-semibold">200</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Date Filter */}
                    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 mb-8">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div className="flex flex-wrap gap-2">
                                <button className="px-4 py-2 text-sm font-medium rounded-lg bg-indigo-600 text-white">Today</button>
                                <button className="px-4 py-2 text-sm font-medium rounded-lg border bg-indigo-600 text-white">Week</button>
                                <button className="px-4 py-2 text-sm font-medium rounded-lg border bg-indigo-600 text-white">Month</button>
                                <button className="px-4 py-2 text-sm font-medium rounded-lg border bg-indigo-600 text-white">Year</button>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-2">
                                    <FaCalendarAlt className="text-gray-400" />
                                    <DatePicker 
                                        selected={startDate} 
                                        onChange={(date) => setStartDate(date)} 
                                        className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                </div>
                                <button className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50">
                                    <FaFilter className="text-gray-400" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {[
                            { icon: <FaUsers className="text-xl text-blue-500" />, title: "Customers", value: "150" },
                            { icon: <FaClipboardList className="text-xl text-purple-500" />, title: "Orders", value: "150" },
                            { icon: <FaChartLine className="text-xl text-green-500" />, title: "Avg Sale", value: "₹100" },
                            { icon: <FaBoxOpen className="text-xl text-orange-500" />, title: "Avg Item Sale", value: "5" },
                            { icon: <FaRupeeSign className="text-xl text-green-500" />, title: "Total Sale", value: "₹10,000" },
                            { icon: <FaUsers className="text-xl text-blue-500" />, title: "Visitors", value: "500" },
                            { icon: <FaBoxOpen className="text-xl text-orange-500" />, title: "Total Products", value: "200" },
                            { icon: <FaStar className="text-xl text-yellow-500" />, title: "Top Selling Item", value: "Product 1" },
                        ].map((item, index) => (
                            <div key={index} className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                                <div className="flex items-center space-x-4">
                                    <div className="p-3 rounded-lg bg-opacity-20" style={{ backgroundColor: `${item.icon.props.className.includes('blue') ? 'rgba(59, 130, 246, 0.1)' : 
                                                                                      item.icon.props.className.includes('purple') ? 'rgba(168, 85, 247, 0.1)' :
                                                                                      item.icon.props.className.includes('green') ? 'rgba(16, 185, 129, 0.1)' :
                                                                                      item.icon.props.className.includes('orange') ? 'rgba(249, 115, 22, 0.1)' :
                                                                                      item.icon.props.className.includes('yellow') ? 'rgba(234, 179, 8, 0.1)' : 'rgba(59, 130, 246, 0.1)'}`}}>
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h2 className="text-sm font-medium text-gray-500">{item.title}</h2>
                                        <p className="text-xl font-semibold">{item.value}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Order Status Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {[
                            { icon: <FaClipboardList className="text-xl text-purple-500" />, title: "Total Orders", value: "150" },
                            { icon: <FaClock className="text-xl text-yellow-500" />, title: "Orders Pending", value: "65" },
                            { icon: <FaCog className="text-xl text-blue-500" />, title: "Orders Processing", value: "236" },
                            { icon: <FaCheck className="text-xl text-green-500" />, title: "Orders Delivered", value: "100" },
                        ].map((item, index) => (
                            <div key={index} className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                                <div className="flex items-center space-x-4">
                                    <div className="p-3 rounded-lg bg-opacity-20" style={{ backgroundColor: `${item.icon.props.className.includes('purple') ? 'rgba(168, 85, 247, 0.1)' :
                                                                                      item.icon.props.className.includes('yellow') ? 'rgba(234, 179, 8, 0.1)' :
                                                                                      item.icon.props.className.includes('blue') ? 'rgba(59, 130, 246, 0.1)' :
                                                                                      'rgba(16, 185, 129, 0.1)'}`}}>
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h2 className="text-sm font-medium text-gray-500">{item.title}</h2>
                                        <p className="text-xl font-semibold">{item.value}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Recent Orders Table */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
                        <div className="p-5 border-b border-gray-200">
                            <h2 className="text-lg font-semibold text-gray-800">Recent Orders</h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice No</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Time</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {recentOrders.map(order => (
                                        <tr key={order.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.invoiceNo}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.orderTime}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.customerName}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.productName}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.method}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹{order.amount}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 py-1 text-xs font-semibold rounded-full 
                                                    ${order.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                                                      order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                                                      'bg-blue-100 text-blue-800'}`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <select className="text-sm border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                                                    <option value="cancel">Cancel</option>
                                                    <option value="pending">Pending</option>
                                                    <option value="delivered">Delivered</option>
                                                    <option value="processing">Processing</option>
                                                </select>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex space-x-2">
                                                    <button className="p-1.5 rounded-md bg-indigo-100 text-indigo-600 hover:bg-indigo-200"  
                                                    onClick={() => handlePreviewClick(order)}>
                                                        <MdOutlinePreview />
                                                    </button>
                                                    <button className="p-1.5 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200"
                                                    onClick={() => handlePrintClick(order)}>
                                                        <IoMdPrint />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Charts Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-semibold text-gray-800">Sales Data</h2>
                                <select className="text-sm border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                                    <option>Last 12 Months</option>
                                    <option>Last 6 Months</option>
                                    <option>Last 30 Days</option>
                                </select>
                            </div>
                            <div className="h-64">
                                <Line 
                                    data={salesData} 
                                    options={{
                                        responsive: true,
                                        maintainAspectRatio: false,
                                        plugins: {
                                            legend: {
                                                position: 'top',
                                            },
                                        },
                                    }}
                                />
                            </div>
                        </div>
                        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-semibold text-gray-800">Best Selling Products</h2>
                            </div>
                            <div className="h-64">
                                <Doughnut 
                                    data={bestSellingProductsData} 
                                    options={{
                                        responsive: true,
                                        maintainAspectRatio: false,
                                        plugins: {
                                            legend: {
                                                position: 'bottom',
                                            },
                                        },
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}