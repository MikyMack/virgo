import { useState } from "react";
import { products } from "../../constants/constants";
import { Link } from "react-router-dom";
import ImageMagnifier from "../Custom bottons/ImageMagnifier";
import { FaMinus, FaPlus, FaOpencart, FaHeart } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css/autoplay';
import 'swiper/css';
import StarRating from "../Custom bottons/starRating";

export default function ProductDetails() {
  const [selectedImage, setSelectedImage] = useState(products[0].images[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeSection, setActiveSection] = useState(null);
  const [selectedColor, setSelectedColor] = useState(products[0].colors[0]);

  const handleImageHover = (image) => {
    setSelectedImage(image);
  };

  const handleQuantityChange = (type) => {
    setQuantity((prevQuantity) => {
      if (type === "increment") {
        return prevQuantity + 1;
      } else if (type === "decrement" && prevQuantity > 1) {
        return prevQuantity - 1;
      }
      return prevQuantity;
    });
  };

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  return (
    <div className="xl:container mx-auto p-4 font-abc">
      {/* Breadcrumbs */}
      <nav className="py-6" aria-label="breadcrumb">
        <ol className="list-reset flex text-gray-700">
          <li>
            <Link to="/" className="text-gray-900 hover:text-gray-600">Home</Link>
          </li>
          <li>
            <span className="mx-2">/</span>
          </li>
          <li>
            <Link to="/productdetails" className="text-gray-600 hover:text-gray-900">Product Details</Link>
          </li>
        </ol>
      </nav>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Side - Images */}
        <div className="w-full lg:w-1/2">
          <div className="main-image mb-4">
            <ImageMagnifier imageUrl={selectedImage} />
          </div>
          <div className="flex overflow-hidden">
            {products[0].images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Thumbnail ${index}`}
                className="w-20 h-20 object-contain cursor-pointer p-1"
                onMouseEnter={() => handleImageHover(image)}
              />
            ))}
          </div>
        </div>

        {/* Right Side - Product Details */}
        <div className="w-full h-full border-2 border-secondary lg:w-1/2 p-4 bg-gray-50">
          <h1 className="text-3xl font-bold mb-2 text-secondary">{products[0].title}</h1>
          <p className="text-2xl text-gray-700 mb-4 font-semibold">₹{products[0].price}</p>
          <p className="mb-4 text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            scelerisque leo nec magna fermentum, a facilisis lorem tincidunt.
          </p>
          <div className="flex items-center mb-4">
            <button onClick={() => handleQuantityChange("decrement")} className="bg-gray-300 text-gray-700 px-2 py-1 rounded-l">
              <FaMinus />
            </button>
            <span className="border border-gray-300 px-3 py-1 text-center">{quantity}</span>
            <button onClick={() => handleQuantityChange("increment")} className="bg-gray-300 text-gray-700 px-2 py-1 rounded-r">
              <FaPlus />
            </button>
          </div>
          <hr />
          <div className="flex items-center py-4">
            <button className="bg-secondary text-white px-4 py-2 rounded mr-2 hover:bg-[#89aaa0]">Add to Cart</button>
            <button className="border border-gray-300 px-4 py-2 rounded hover:bg-secondary hover:text-white">Add to Wishlist</button>
          </div>
          <div className="flex items-center mb-4">
            <span className="text-gray-500 font-semibold flex items-center gap-2">Total Price: <span className="text-xl text-gray-700">₹{products[0].price * quantity}</span> </span>
          </div>
          <hr />
          {/* Color Variants */}
          <div className="py-4">
            <h2 className="text-2xl font-bold mb-2 text-gray-600">Color Variants</h2>
            <div className="flex space-x-2">
              {products[0].colors.map((color, index) => (
                <div
                  key={index}
                  className={`w-8 h-8 rounded-full cursor-pointer ${selectedColor === color ? 'border-2 border-black' : ''}`}
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedColor(color)}
                />
              ))}
            </div>
          </div>
          <hr />
          {/* Specifications */}
          <div className="py-4">
            <h2 className="flex items-center text-2xl font-bold mb-2 cursor-pointer text-gray-600" onClick={() => toggleSection("specifications")}>Specifications<IoMdArrowDropdown /> </h2>
            {activeSection === "specifications" && (
              <ul className="list-disc list-inside text-xl text-gray-600">
                <li>Material: Wood</li>
                <li>Dimensions: 12 x 12 x 2</li>
                <li>Weight: 1.5 lbs</li>
              </ul>
            )}
          </div>
          <hr />
          {/* Care and Maintenance */}
          <div className="py-4">
            <h2 className="flex items-center text-2xl font-bold mb-2 cursor-pointer text-gray-600" onClick={() => toggleSection("care")}>Care and Maintenance<IoMdArrowDropdown /></h2>
            {activeSection === "care" && (
              <p className="text-gray-600 text-xl">
                Wipe with a dry cloth. Avoid using harsh chemicals or abrasive
                materials.
              </p>
            )}
          </div>
          <hr />
          {/* Warranty */}
          <div className="py-4">
            <h2 className="flex items-center text-2xl font-bold mb-2 cursor-pointer text-gray-600" onClick={() => toggleSection("warranty")}>Warranty<IoMdArrowDropdown /></h2>
            {activeSection === "warranty" && (
              <p className="text-gray-600 text-xl">1-year limited warranty.</p>
            )}
          </div>
          <hr />
          {/* Q&A */}
          <div className="py-4">
            <h2 className="flex items-center text-2xl font-bold mb-2 cursor-pointer text-gray-600" onClick={() => toggleSection("qa")}>Q&A<IoMdArrowDropdown /></h2>
            {activeSection === "qa" && (
              <p className="text-gray-600 text-xl">
                Have a question?{" "}
                <Link to="/contact" className="text-blue-500">
                  Contact us
                </Link>
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-center md:py-10 py-4">Related Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {products.slice(1, 6).map((product) => (
            <div key={product.id} className="product-card mb-4 group hover:shadow-md">
              <Link to='/productdetails'>
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
                        <img
                          loading="lazy"
                          src={image}
                          alt={product.title}
                          className="w-full h-auto object-cover"
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                  <button className="absolute flex items-center justify-center bottom-0 left-1/2 w-full transform -translate-x-1/2 translate-y-full group-hover:translate-y-0 border-0 text-uppercase font-medium bg-[#b8ccc6] text-gray-900 py-2 xs:px-2 sm:px-2 md:px-4 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:text-white">
                    Add To Cart
                    <span className="text-gray-900 pl-3">
                      <FaOpencart />
                    </span>
                  </button>
                </div>
              </Link>
              <div className="relative px-2 sm:p-4 flex flex-col justify-between">
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
      </div>

      {/* Similar Products */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-center md:py-10 py-4">Similar Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {products.slice(5, 10).map((product) => (
            <div key={product.id} className="product-card mb-4 group hover:shadow-md">
              <Link to='/productdetails'>
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
                        <img
                          loading="lazy"
                          src={image}
                          alt={product.title}
                          className="w-full h-auto object-cover"
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                  <button className="absolute flex items-center justify-center bottom-0 left-1/2 w-full transform -translate-x-1/2 translate-y-full group-hover:translate-y-0 border-0 text-uppercase font-medium bg-[#b8ccc6] text-gray-900 py-2 xs:px-2 sm:px-2 md:px-4 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:text-white">
                    Add To Cart
                    <span className="text-gray-900 pl-3">
                      <FaOpencart />
                    </span>
                  </button>
                </div>
              </Link>
              <div className="relative px-2 sm:p-4 flex flex-col justify-between">
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
      </div>
    </div>
  );
}
