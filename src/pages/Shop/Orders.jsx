import { useState } from "react";
import { Link } from 'react-router-dom';
import { FaBox, FaClock, FaShoppingBag } from "react-icons/fa";
import { LiaRupeeSignSolid } from "react-icons/lia";
import img1 from "../../assets/breadcrumps/shopbread.jpg"; // Add your order banner image
import { products } from "../../constants/constants.js";



const Orders = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 8;

    // Sample orders data with real product IDs
    const orders = [
        { 
            id: 'ORD123456',
            date: '2024-03-15',
            status: 'Delivered',
            items: [1, 3, 5], // Product IDs from your constants
            total: 2499
        },
        { 
            id: 'ORD123457',
            date: '2024-03-14',
            status: 'Processing',
            items: [2, 4], 
            total: 1799
        },
        // Add more orders as needed...
    ];

    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

    // Function to get product details by ID
    const getProductDetails = (productId) => {
        return products.find(product => product.id === productId);
    };

    return (
        <section className="overflow-hidden">
            <div className="relative h-1/2font-abc">
                <img className="w-full h-[300px] md:h-[350px] lg:h-[350px] object-cover" src={img1} alt="orders" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                    <h1 className="text-[30px] lg:text-[60px] md:text-[50px] pb-2">My Orders</h1>
                    <p className="text-lg">Your order history and details</p>
                </div>
            </div>

            <section className="xl:container mx-auto my-10 px-4 font-abc">
                <div className="pt-2">
                    <div className="fade show active" role="tabpanel">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {currentOrders.map((order) => (
                                <div key={order.id} className="order-card mb-4 group hover:shadow-md hover:scale-105 transition-transform bg-white rounded-xl p-4 shadow-lg">
                                    <div className="flex items-center justify-between border-b pb-3">
                                        <div>
                                            <h3 className="text-lg font-bold text-black">Order #{order.id}</h3>
                                            <p className="text-sm text-gray-500 flex items-center">
                                                <FaClock className="mr-2" />
                                                {order.date}
                                            </p>
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-sm ${
                                            order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 
                                            order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' : 
                                            'bg-red-100 text-red-800'
                                        }`}>
                                            {order.status}
                                        </span>
                                    </div>

                                    <div className="mt-4">
                                        <div className="flex flex-wrap gap-2">
                                            {order.items.map((productId) => {
                                                const product = getProductDetails(productId);
                                                return product ? (
                                                    <img
                                                        key={product.id}
                                                        src={product.images[0]}
                                                        alt={product.title}
                                                        className="w-20 h-20 object-cover rounded-lg border-2 border-gray-100"
                                                    />
                                                ) : null;
                                            })}
                                        </div>
                                        <div className="mt-2">
                                            <p className="font-semibold text-black flex items-center">
                                                <FaShoppingBag className="mr-2" />
                                                {order.items.length} items
                                            </p>
                                            <p className="text-black text-lg flex items-center">
                                                <LiaRupeeSignSolid className="mr-1" />
                                                {order.total}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-4 flex justify-between items-center">
                                        <Link 
                                            to={`/order-details/${order.id}`}
                                            className="px-4 py-2 bg-[#b8ccc6] text-black rounded-lg hover:bg-[#9db3ad] transition-colors flex items-center"
                                        >
                                            View Details
                                            <FaBox className="ml-2" />
                                        </Link>
                                        <button className="px-4 py-2 border border-black rounded-lg hover:bg-black hover:text-white transition-colors">
                                            Re-order
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-center mt-4">
                            {Array.from({ length: Math.ceil(orders.length / ordersPerPage) }, (_, index) => (
                                <button
                                    key={index + 1}
                                    onClick={() => setCurrentPage(index + 1)}
                                    className={`px-4 py-2 mx-1 border hover:bg-secondary hover:text-white ${
                                        currentPage === index + 1 ? 'bg-secondary text-white' : 'bg-white text-gray-800'
                                    }`}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </section>
    );
};