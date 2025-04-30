import img1 from "../../assets/breadcrumps/shopbread.jpg"
import { RxMixerHorizontal } from "react-icons/rx";
import { CandleHoldersData } from "../../constants/constants";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';

import { useState } from "react";
import { IoGridOutline } from "react-icons/io5";
import { MdViewDay } from "react-icons/md";
// import { IoMdClose } from "react-icons/io";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { FaOpencart } from "react-icons/fa";
import { products } from "../../constants/constants.js"
import StarRating from '../Custom bottons/starRating.jsx';
import { FaHeart } from "react-icons/fa";
import { Link } from 'react-router-dom';
import handleHolders from "../../assets/productsmain/CandleHolders.webp"

export default function Candleholders() {
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
    setCurrentPage(0);
  };
  return (
    <section className="font-abc">
      <div className="relative h-1/2 font-abc">
        <img className="w-full h-[300px] md:h-[300px] lg:h-[300px] object-cover" src={img1} alt="breadcrump" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h1 className="text-[30px] lg:text-[60px] md:text-[50px]">CANDLE HOLDERS</h1>
          <p className="text-2xl py-2 pb-4">Decorative Candle Holders</p>
          <p className="text-xl text-secondary">HOME<span className="text-white"> / CANDLE HOLDERS</span></p>
        </div>
      </div>
      <div className="xl:container mx-auto my-10 px-4 text-center">
        <p className="text-lg md:text-xl lg:text-2xl text-gray-700">
          Discover our exclusive collection of candle holders that are perfect for adding a touch of elegance to your home decor. Whether you prefer modern or traditional designs, we have something for everyone. Browse through our selection and find the perfect candle holder to complement your style.
        </p>
      </div>
      {/* Banner */}
      <div className="relative h-1/2 font-abc my-10">
        <img className="w-full full object-contain" src={handleHolders} alt="Candle Holders Banner" />
      </div>
      
      <div className="xl:container flex flex-col">
        {/* categories  */}
        <div className="flex items-center justify-between">
          <Swiper
            spaceBetween={10}
            slidesPerView={2}
            breakpoints={{
              640: {
                slidesPerView: 3,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 10,
              },
              1024: {
                slidesPerView: 6,
                spaceBetween: 10,
              },
            }}
            autoplay={{ delay: 3000 }}
            modules={[Autoplay]}
          >
            {CandleHoldersData.map((holder) => (
              <SwiperSlide key={holder.id}>
                <div className="flex flex-col items-center justify-center p-4 h-full w-full group">
                  <img src={holder.image} alt={holder.title} className="w-20 h-20 object-contain rounded-full cursor-pointer hover:brightness-50 duration-500 my-4" />
                  <h2 className="text-xl cursor-pointer text-gray-700 text-center">{holder.title}</h2>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        {/* filter  */}
        <div className="flex flex-col md:flex-row items-start justify-between py-5 px-2">
          <div className="flex md:flex-row items-center justify-between md:items-center gap-2 w-full md:w-auto mb-4 md:mb-0">
            <div className="flex items-center gap-1 cursor-pointer">
              <h2 className="text-lg">Filter by :</h2>
              <span className="text-2xl"><RxMixerHorizontal /></span>
            </div>
            <div className="md:w-auto">
              <input className="outline-none border-b border-secondary w-full md:w-auto" type="text" placeholder="Search Candle Holders..." />
            </div>
            <div className="flex items-center pl-3 gap-2 ">
              <span className={`cursor-pointer text-2xl hover:text-gray-600 ${isGridView ? "text-black" : "text-gray-600"}`} onClick={() => setIsGridView(true)}><IoGridOutline /></span>
              <span className={`cursor-pointer text-2xl hover:text-gray-600 ${isGridView ? "text-gray-600" : "text-black"}`} onClick={() => setIsGridView(false)}><MdViewDay /></span>
            </div>
          </div>
          <div className="flex md:flex-row items-start justify-between md:items-center gap-2 w-full md:w-auto">
            <div className="md:flex lg:flex hidden gap-2">
              <h2 className="text-xl">Show: </h2>
              <span className="cursor-pointer hover:text-gray-600" onClick={() => handleProductsPerPageChange(10)}>10 / </span>
              <span className="cursor-pointer hover:text-gray-600" onClick={() => handleProductsPerPageChange(20)}>20 / </span>
              <span className="cursor-pointer hover:text-gray-600" onClick={() => handleProductsPerPageChange(30)}>30 / </span>
              <span className="cursor-pointer hover:text-gray-600" onClick={() => handleProductsPerPageChange(50)}>50</span>
            </div>
          

            <div className="flex items-center w-full md:w-auto mb-4 md:mb-0">
              <h2 className="text-lg">Sort by :</h2>
              <select className="text-gray-600 outline-none ml-2">
                <option value="">Price (Low to High)</option>
                <option value="">Price (High to Low)</option>
                <option value="">Newest First</option>
                <option value="">Oldest First</option>
              </select>
            </div>
            <div className="flex items-center md:w-auto">
              <h2 className="text-lg">Show</h2>
              <select className="text-gray-600 outline-none ml-2">
                <option value="">12</option>
                <option value="">24</option>
                <option value="">36</option>
              </select>
            </div>
          </div>
        </div>
        <section className="mx-auto my-10 px-4 font-abc">
          <div className="pt-2">
            <div className="fade show active" role="tabpanel">
              <div className={`grid ${isGridView ? 'grid-cols-2 md:grid-cols-4 lg:grid-cols-5' : 'grid-cols-1 lg:grid-cols-3 md:grid-cols-2'} gap-4`}>
                {currentProducts?.map((product) => (
                  <div key={product.id} className="product-card mb-4 group hover:shadow-md">
                    <div className="relative" key={product.id}>
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
      </div>
    </section>
  )
}
