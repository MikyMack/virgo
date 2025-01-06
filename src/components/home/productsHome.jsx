import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';


import { LiaRupeeSignSolid } from "react-icons/lia";
import { FaOpencart } from "react-icons/fa";
import "./productsHome.css";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { products } from "../../constants/constants.js"
import { FaHeart } from "react-icons/fa";
import StarRating from '../Custom bottons/starRating.jsx';



const ProductsHome = () => {
    const [activeTab, setActiveTab] = useState('all');

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
                        data-bs-toggle="tab"
                        role="tab"
                        aria-controls="collections-tab-2"
                        aria-selected="true"
                    >
                        Featured
                    </a>
                </li>
                <li className="nav-item" role="presentation">
                    <a
                        className={`nav-link cursor-pointer ${activeTab === 'bestseller' ? 'active-tab' : ''}`}
                        onClick={() => setActiveTab('bestseller')}
                        data-bs-toggle="tab"
                        role="tab"
                        aria-controls="collections-tab-3"
                        aria-selected="true"
                    >
                        Best Seller
                    </a>
                </li>
                <li className="nav-item" role="presentation">
                    <a
                        className={`nav-link cursor-pointer ${activeTab === 'sales' ? 'active-tab' : ''}`}
                        onClick={() => setActiveTab('sales')}
                        data-bs-toggle="tab"
                        role="tab"
                        aria-controls="collections-tab-4"
                        aria-selected="true"
                    >
                        Sales
                    </a>
                </li>
            </ul>

            <div className="pt-2">
                <div className="fade show active" role="tabpanel">
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
                        {filteredProducts?.map((product) => (
                            <div key={product.id} className="product-card mb-4 group hover:shadow-md">
                                <Link to='/productdetails'>
                                <div className="relative" key={product.id}>
                                    {/* Implement Swiper with autoplay on hover */}
                                    <Swiper
                                        className="swiper-container"
                                        spaceBetween={10}
                                        slidesPerView={1}
                                        autoplay={false} 
                                        modules={[Autoplay]}
                                        onSwiper={(swiper) => {
                                            if (swiper) {
                                                const swiperContainer = swiper.el;
                                                swiperContainer.addEventListener('mouseenter', () => {
                                                    if (swiper.autoplay) {
                                                        swiper.autoplay.start();
                                                    }
                                                });
                                                swiperContainer.addEventListener('mouseleave', () => {
                                                    if (swiper.autoplay) {
                                                        swiper.autoplay.stop();
                                                    }
                                                });
                                            }
                                        }}
                                    >
                                        {product?.images.map((image, index) => (
                                            <SwiperSlide key={index}>
                                                <img
                                                    loading="lazy"
                                                    src={image}
                                                    alt={product.title}
                                                    className="w-full h-auto object-cover"
                                                />
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                    {/* Add to Cart button */}
                                    <button className="absolute flex items-center justify-center bottom-0 left-1/2 w-full transform -translate-x-1/2 translate-y-full group-hover:translate-y-0 border-0 text-uppercase font-medium bg-[#b8ccc6] text-gray-900 py-2 xs:px-2 sm:px-2 md:px-4 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:text-white">
                                        Add To Cart
                                        <span className="text-gray-900 pl-3">
                                            <FaOpencart />
                                        </span>
                                    </button>
                                </div>
                                </Link>
                                {/* Product details */}
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

                                            <div>
                                                <div className="flex space-x-2 items-center">
                                                    {product.colors.map((color, index) => (
                                                        <span
                                                            key={index}
                                                            className="w-4 h-4 rounded-full cursor-pointer"
                                                            style={{ backgroundColor: color }}
                                                        ></span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        {/* Product color variants */}

                                    </div>
                                    <div className="flex items-center justify-between mt-1 px-2">
                                        <button
                                            title="Add To Wishlist"
                                            className="bg-transparent border-0"
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

                    <div className="text-center mt-4">
                        <Link to='/shop' className="text-lg text-uppercase font-medium cursor-pointer">
                            See All Products
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductsHome;
