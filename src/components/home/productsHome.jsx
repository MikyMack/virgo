import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';

import { LiaRupeeSignSolid } from "react-icons/lia";
import { FaOpencart } from "react-icons/fa";
import "./productsHome.css";
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { products } from "../../constants/constants.js"
import { FaHeart } from "react-icons/fa";
import StarRating from '../Custom bottons/starRating.jsx';

const ProductsHome = () => {
    const [activeTab, setActiveTab] = useState('all');
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
    const [wishlistItems, setWishlistItems] = useState([]);
    const [selectedImages, setSelectedImages] = useState({});

    const handleAddToCart = (product, quantity) => {
        setCartItems((prevCart) => {
            const existingProduct = prevCart.find(item => item.id === product.id);
            if (existingProduct) {
                alert(`${product.title} is already Added to the Cart Successfully!..`);
                return prevCart;
            } else {
                const updatedCart = [...prevCart, { ...product, quantity }];
                localStorage.setItem("cart", JSON.stringify(updatedCart));
                alert(`${product.title} Added to the Cart Successfully!..`);
                return updatedCart;
            }
        });
    };

    const handleImageOptionClick = (productId, image) => {
        setSelectedImages(prevImages => ({ ...prevImages, [productId]: image }));
    };

    const handleImageClick = (productId) => {
        navigate(`/ProductDetails/${productId}`);
    };

    const handleMoveToWishlist = (product) => {
        if (wishlistItems.find(item => item.id === product.id)) {
            alert(`${product.title} is already Added to the Wishlist Successfully!..`);
        } else {
            const updatedWishlist = [...wishlistItems, product];
            setWishlistItems(updatedWishlist);
            localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
            alert(`${product.title} Added to the Wishlist Successfully!..`);
        }
    };

    const filteredProducts = activeTab === 'all' ? products.slice(0, 10) : products.filter(product => product.type === activeTab).slice(0, 10);

    return (
        <section className="xl:container mx-auto my-10 px-4 font-abc">
            <h2 className="text-center font-bold text-2xl md:text-[40px] text-uppercase mb-10 text-gray-700">
                Best Selling Products
            </h2>

            <ul
                className="mb-10 text-uppercase justify-center items-center text-center text-xl lg:text-2xl space-x-9"
                id="collections-tab"
                role="tablist"
            >
                <li className="nav-item" role="presentation">
                    <a
                        className={`cursor-pointer ${activeTab === 'all' ? 'active-tab' : ''}`}
                        onClick={() => setActiveTab('all')}
                    >
                        All
                    </a>
                </li>
                <li className="nav-item" role="presentation">
                    <a
                        className={`nav-link cursor-pointer ${activeTab === 'featured' ? 'active-tab' : ''}`}
                        onClick={() => setActiveTab('featured')}
                    >
                        Featured
                    </a>
                </li>
                <li className="nav-item" role="presentation">
                    <a
                        className={`nav-link cursor-pointer ${activeTab === 'bestseller' ? 'active-tab' : ''}`}
                        onClick={() => setActiveTab('bestseller')}
                    >
                        Best Seller
                    </a>
                </li>
                <li className="nav-item" role="presentation">
                    <a
                        className={`nav-link cursor-pointer ${activeTab === 'sales' ? 'active-tab' : ''}`}
                        onClick={() => setActiveTab('sales')}
                    >
                        Sales
                    </a>
                </li>
            </ul>

            <div className="pt-2">
                <div className="fade show active" role="tabpanel">
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
                        {filteredProducts?.map((product) => (
                            <div key={product.id} className="product-card mb-4 group hover:shadow-lg rounded-2xl shadow-xl">
                                <div className="relative">
                                    <img
                                        loading="lazy"
                                        src={selectedImages[product.id] || product.images[0]}
                                        alt={product.title}
                                        className="w-full h-auto object-cover cursor-pointer"
                                        onClick={() => handleImageClick(product.id)}
                                    />
                                    <button 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleAddToCart(product, 1);
                                        }}
                                        className="absolute flex items-center justify-center bottom-0 left-1/2 w-full transform -translate-x-1/2 translate-y-full group-hover:translate-y-0 border-0 text-uppercase font-medium bg-[#b8ccc6] text-gray-900 py-2 xs:px-2 sm:px-2 md:px-4 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:text-white">
                                        Add To Cart
                                        <span className="text-gray-900 pl-3">
                                            <FaOpencart />
                                        </span>
                                    </button>
                                </div>
                                <div className="relative p-2 sm:p-4 flex flex-col justify-between">
                                    <div>
                                        <p className="text-gray-500 text-sm sm:text-base">{product.category}</p>
                                        <h6 className="text-base sm:text-lg font-medium">
                                            <Link to="product1_simple.html">{product.title}</Link>
                                        </h6>
                                        <div className="flex items-center justify-between text-lg sm:text-xl font-medium">
                                            <div className='flex items-center'>
                                                <span>
                                                    <LiaRupeeSignSolid />
                                                        </span>
                                                {product.price}
                                            </div>
                                           <div className="flex space-x-2 items-center">
                                                {product.images.map((image, index) => (
                                                    <img
                                                        key={index}
                                                        src={image}
                                                        alt={product.title}
                                                        className="w-6 h-6 rounded-full border border-gray-300 cursor-pointer"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleImageOptionClick(product.id, image);
                                                        }}
                                                    />
                                                ))}
                                        </div>
                                    </div>
                                      </div>
                                    <div className="flex items-center justify-between mt-1 px-2">
                                        <button
                                            title="Add To Wishlist"
                                            className="bg-transparent border-0"
                                            onClick={() => handleMoveToWishlist(product)}
                                        >
                                            <FaHeart className='text-xl text-red-400 hover:text-red-700' />
                                        </button>
                                        <div>
                                            <StarRating rating={4} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductsHome;
