import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules'; // Ensure the correct import from 'swiper/modules'
import 'swiper/css';
import 'swiper/css/autoplay';
import img1 from "../../assets/breadcrumps/shopbread.jpg"
import { FaClock } from "react-icons/fa";
import { FaLightbulb } from "react-icons/fa6";
import { GiCandleHolder,GiCandleLight } from "react-icons/gi";
import { GiFlowerPot } from "react-icons/gi";
import { PiCookingPotFill } from "react-icons/pi";

import { useState } from "react";
import { IoGridOutline } from "react-icons/io5";
import { MdViewDay } from "react-icons/md";
import { RxMixerHorizontal } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { FaOpencart } from "react-icons/fa";
import { products } from "../../constants/constants.js"
import StarRating from '../Custom bottons/starRating.jsx';
import { FaHeart } from "react-icons/fa";
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const data = [{
    id: 1,
    icon: <FaClock />,
    title: "Candles",
    products: 12
}, {
    id: 2,
    icon: <FaLightbulb />,
    title: "Candles",
    products: 100
}, {
    id: 3,
    icon: <GiCandleHolder />,
    title: "Candles",
    products: 50
}, {
    id: 4,
    icon: <GiFlowerPot />,
    title: "Candles",
    products: 70
}, {
    id: 5,
    icon: <PiCookingPotFill />,
    title: "Candles",
    products: 80
}, {
    id: 6,
    icon: <GiCandleLight />,
    title: "Candles",
    products: 150
}]

export default function Shop() {
    const [showFilters, setShowFilters] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage, setProductsPerPage] = useState(10);
    const [isGridView, setIsGridView] = useState(true); // State to toggle between grid and list view

    // Calculate the current products to display
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Change products per page
    const handleProductsPerPageChange = (number) => {
        setProductsPerPage(number);
        setCurrentPage(1);
    };

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 1440,
                settings: {
                    slidesToShow: 6,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 425,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 375,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
        ]
    };

    return (
        <section className='overflow-hidden'>
            <div className="relative h-1/2font-abc">
                <img className="w-full h-[300px] md:h-[350px] lg:h-[350px] object-cover" src={img1} alt="shop" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                    <h1 className="text-[30px] lg:text-[60px] md:text-[50px] pb-2">Shop</h1>
                    <div className="hidden xl:flex items-center justify-center">
                        {data.map((item) => (
                            <div key={item.id} className="flex items-center justify-between p-10">
                                <div className="">
                                    <span className="text-[50px]">{item.icon}</span>
                                </div>
                                <div className="flex flex-col items-center justify-center ml-3">
                                    <h2 className="nav-item uppercase text-2xl cursor-pointer">{item.title}</h2>
                                    <p className="text-xl text-gray-400">{item.products} Products</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="xl:hidden w-full">
                        <Slider {...sliderSettings}>
                            {data.map((item) => (
                                <div key={item.id}>
                                    <div className="flex items-center justify-center m-10">
                                        <div className="">
                                            <span className="text-[30px] md:text-[50px]">{item.icon}</span>
                                        </div>
                                        <div className="flex flex-col items-center justify-center ml-3">
                                            <h2 className="nav-item uppercase text-lg md:text-2xl cursor-pointer">{item.title}</h2>
                                            <p className="text-lg md:text-xl text-gray-400">{item.products}<span>Products</span></p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
            </div>
            <div className="xl:container font-abc lg:py-16 md:py-14 py-6 px-4"> 
                <div className="flex justify-between"> 
                    <div className="flex">
                        <h2 className="text-gray-600 cursor-pointer">Home<span className="text-black px-2"> / </span> </h2>
                        <h2 className="text-xl font-semibold"> Shop</h2>
                    </div>
                    <div className="flex gap-2">
                        <div className="md:flex lg:flex hidden gap-2">
                            <h2 className="text-xl">Show: </h2>
                            <span className="cursor-pointer hover:text-gray-600" onClick={() => handleProductsPerPageChange(10)}>10 / </span>
                            <span className="cursor-pointer hover:text-gray-600" onClick={() => handleProductsPerPageChange(20)}>20 / </span>
                            <span className="cursor-pointer hover:text-gray-600" onClick={() => handleProductsPerPageChange(30)}>30 / </span>
                            <span className="cursor-pointer hover:text-gray-600" onClick={() => handleProductsPerPageChange(50)}>50</span>
                        </div>
                        <div className="flex items-center pl-3 gap-2 ">
                            <span className={`cursor-pointer text-2xl hover:text-gray-600 ${isGridView ? "text-black" : "text-gray-600"}`} onClick={() => setIsGridView(true)}><IoGridOutline /></span>
                            <span className={`cursor-pointer text-2xl hover:text-gray-600 ${isGridView ? "text-gray-600" : "text-black"}`} onClick={() => setIsGridView(false)}><MdViewDay /></span>
                        </div>
                        <div className="flex items-center px-3 gap-3 hover:text-gray-700 cursor-pointer" onClick={() => setShowFilters(!showFilters)}>
                            <span className="text-3xl duration-500">{showFilters ? <IoMdClose /> : <RxMixerHorizontal />}</span>
                            <h2 className="text-xl">Filters</h2>
                        </div>
                    </div>
                </div>
                {showFilters && (
                    <div className=" bg-white w-full mt-4 p-4 shadow-lg rounded-lg">
                        <div className="flex flex-col md:flex-row items-center gap-4">
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold mb-2 text-center">Sort By</h3>
                                <select className="w-full p-2 border border-gray-300 rounded-md outline-none">
                                    <option value="default">Default</option>
                                    <option value="price-popu">Popularity</option>
                                    <option value="price-rate">Average rating</option>
                                    <option value="price-new">Newness</option>
                                    <option value="price-asc">Price: Low to High</option>
                                    <option value="price-desc">Price: High to Low</option>
                                </select>
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold mb-2 text-center">Price Filter</h3>
                                <select className="w-full p-2 border border-gray-300 rounded-md outline-none">
                                    <option value="all">All</option>
                                    <option value="0-500">0-500</option>
                                    <option value="500-1000">500-1000</option>
                                    <option value="1000-5000">1000-5000</option>
                                </select>
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold mb-2 text-center">Filter by Color</h3>
                                <div className="flex gap-2 items-center justify-center">
                                    <span className="w-6 h-6 bg-red-500 rounded-full cursor-pointer"></span>
                                    <span className="w-6 h-6 bg-blue-500 rounded-full cursor-pointer"></span>
                                    <span className="w-6 h-6 bg-green-500 rounded-full cursor-pointer"></span>
                                    <span className="w-6 h-6 bg-yellow-500 rounded-full cursor-pointer"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <section className="xl:container mx-auto my-10 px-4 font-abc">
                <div className="pt-2">
                    <div className="fade show active" role="tabpanel">
                        <div className={`grid ${isGridView ? 'grid-cols-2 md:grid-cols-4 lg:grid-cols-5' : 'grid-cols-1 lg:grid-cols-3 md:grid-cols-2'} gap-4`}>
                            {currentProducts?.map((product) => (
                                <div key={product.id} className="product-card mb-4 group hover:shadow-md">
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
                                                    <a>
                                                        <img
                                                            loading="lazy"
                                                            src={image}
                                                            alt={product.title}
                                                            className="w-full h-auto object-cover"
                                                        />
                                                    </a>
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

                                    {/* Product details */}
                                    <div className="relative lg:px-4 py-2  text-center">
                                        <div >
                                            <p className="text-gray-500 text-sm sm:text-base">{product.category}</p>
                                            <h6 className="mb-2 text-base sm:text-lg font-medium">
                                                <Link>{product.title}</Link>
                                            </h6>
                                            <div className="flex items-center justify-between text-lg sm:text-xl font-medium">
                                                <div className='flex items-center'>
                                                    <span>
                                                        <LiaRupeeSignSolid />
                                                    </span>
                                                    {product.price}
                                                </div>

                                                <div>
                                                    <div className="flex space-x-2 mt-2">
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
                                        <div className="flex items-center justify-between mt-4">
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
                        {/* Pagination */}
                        <div className="flex justify-center mt-4">
                            {Array.from({ length: Math.ceil(products.length / productsPerPage) }, (_, index) => (
                                <button
                                    key={index + 1}
                                    onClick={() => paginate(index + 1)}
                                    className={`px-4 py-2 mx-1 border hover:bg-secondary hover:text-white ${currentPage === index + 1 ? 'bg-secondary text-white' : 'bg-white text-gray-800'}`}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </div>
                    </div>

                </div>
            </section>
        </section>
    )
}
