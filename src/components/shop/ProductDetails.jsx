import { useState, useEffect } from "react";
import { products } from "../../constants/constants";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import ImageMagnifier from "../Custom bottons/ImageMagnifier"; // Assuming this is a custom component
import { FaOpencart, FaHeart } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/autoplay";
import "swiper/css";
import StarRating from "../Custom bottons/starRating"; // Assuming this is a custom component

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const product = products.find((item) => item.id === parseInt(id));
  const [cartItems, setCartItems] = useState(() => JSON.parse(localStorage.getItem("cart")) || []);
  const [wishlistItems, setWishlistItems] = useState(() => JSON.parse(localStorage.getItem("wishlist")) || []);
  
  if (!product) {
    return <div className="text-center py-8 text-gray-700 font-serif">Product not found.</div>;
  }

  const [selectedImage, setSelectedImage] = useState(location.state?.selectedImage || product.images[0]);
  
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const handleImageClick = (productId) => {
    navigate(`/ProductDetails/${productId}`);
  };

  const handleImageHover = (image) => {
    setSelectedImage(image);
  };

  const handleAddToCart = (product) => {
    setCartItems((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        alert(`${product.title} is already Added to the Cart Successfully!..`);
        return prevCart;
      } else {
        alert(`${product.title} Added to the Cart Successfully!..`);
        return [...prevCart, { ...product, quantity: quantity }];
      }
    });
  };

  const handleMoveToWishlist = (product) => {
    if (wishlistItems.find((item) => item.id === product.id)) {
      alert(`${product.title} is already Added to the Wishlist Successfully!..`);
    } else {
      setWishlistItems((prevWishlist) => [...prevWishlist, product]);
      alert(`${product.title} Added to the Wishlist Successfully!..`);
    }
  };

  const [quantity, setQuantity] = useState(1);
  const [activeSection, setActiveSection] = useState(null);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    setQuantity(isNaN(value) || value < 1 ? 1 : value);
  };

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  return (
    <div className="xl:container mx-auto p-6 font-serif bg-[#f8f1e9] text-gray-800">
      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Image Section */}
        <div className="w-full lg:w-1/2">
          <div className="main-image mb-6 shadow-lg rounded-lg overflow-hidden">
            <ImageMagnifier
              imageUrl={selectedImage}
              className="w-full h-[500px] object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
          <div className="flex justify-center gap-4">
            {product.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Thumbnail ${index}`}
                className={`w-20 h-20 object-cover rounded-md cursor-pointer border-2 transition-all duration-300 ${
                  selectedImage === image ? "border-[#8c5523]" : "border-transparent"
                } hover:border-[#8c5523]`}
                onMouseEnter={() => handleImageHover(image)}
              />
            ))}
          </div>
        </div>

        {/* Product Info Section */}
        <div className="w-full lg:w-1/2 space-y-6 bg-white p-8 rounded-lg shadow-md border border-gray-200">
          <h1 className="text-4xl font-bold text-[#4a2e1b] tracking-wide">{product.title}</h1>
          <p className="text-2xl font-medium text-[#8c5523] flex items-center">
            <LiaRupeeSignSolid /> {product.price}
          </p>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4">
            <span className="text-gray-700 font-medium">Quantity:</span>
            <input
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
              className="w-16 p-2 border border-gray-300 rounded-md text-center focus:outline-none focus:ring-2 focus:ring-[#8c5523]"
            />
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-6">
            <button
              className="bg-[#8c5523] text-white py-3 px-6 rounded-md hover:bg-[#6b3e1a] transition-all duration-300 flex items-center gap-2 shadow-md"
              onClick={() => handleAddToCart(product)}
            >
              Add to Cart <FaOpencart />
            </button>
            <button
              className="bg-transparent border-2 border-[#8c5523] text-[#8c5523] py-3 px-6 rounded-md hover:bg-[#8c5523] hover:text-white transition-all duration-300 flex items-center gap-2 shadow-md"
              onClick={() => handleMoveToWishlist(product)}
            >
              Wishlist <FaHeart />
            </button>
          </div>

          {/* Total Price */}
          <div className="text-gray-700 font-medium">
            Total Price: <span className="font-bold text-[#8c5523] flex items-center"><LiaRupeeSignSolid />{product.price * quantity}</span>
          </div>

          {/* Color Variants */}
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-[#4a2e1b] mb-3">Color Variants</h2>
            <div className="flex gap-3">
              {product.colors.map((color, index) => (
                <div
                  key={index}
                  className={`w-10 h-10 rounded-full cursor-pointer border-2 transition-all duration-300 ${
                    selectedColor === color ? "border-[#8c5523] scale-110" : "border-gray-300"
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedColor(color)}
                />
              ))}
            </div>
          </div>

          {/* Collapsible Sections */}
          <div className="mt-6 space-y-4">
            {/* Specifications */}
            <div>
              <h2
                className="flex items-center text-xl font-semibold text-[#4a2e1b] cursor-pointer hover:text-[#8c5523] transition-colors duration-300"
                onClick={() => toggleSection("specifications")}
              >
                Specifications <IoMdArrowDropdown className={`${activeSection === "specifications" ? "rotate-180" : ""} ml-2`} />
              </h2>
              {activeSection === "specifications" && (
                <ul className="list-disc list-inside text-gray-700 mt-2">
                  <li>Material: Wood</li>
                  <li>Dimensions: 12 x 12 x 2</li>
                  <li>Weight: 1.5 lbs</li>
                </ul>
              )}
              <hr className="my-4 border-t border-gray-200" />
            </div>

            {/* Care and Maintenance */}
            <div>
              <h2
                className="flex items-center text-xl font-semibold text-[#4a2e1b] cursor-pointer hover:text-[#8c5523] transition-colors duration-300"
                onClick={() => toggleSection("care")}
              >
                Care and Maintenance <IoMdArrowDropdown className={`${activeSection === "care" ? "rotate-180" : ""} ml-2`} />
              </h2>
              {activeSection === "care" && (
                <p className="text-gray-700 mt-2">Wipe with a dry cloth. Avoid using harsh chemicals or abrasive materials.</p>
              )}
              <hr className="my-4 border-t border-gray-200" />
            </div>

            {/* Warranty */}
            <div>
              <h2
                className="flex items-center text-xl font-semibold text-[#4a2e1b] cursor-pointer hover:text-[#8c5523] transition-colors duration-300"
                onClick={() => toggleSection("warranty")}
              >
                Warranty <IoMdArrowDropdown className={`${activeSection === "warranty" ? "rotate-180" : ""} ml-2`} />
              </h2>
              {activeSection === "warranty" && (
                <p className="text-gray-700 mt-2">1-year limited warranty.</p>
              )}
              <hr className="my-4 border-t border-gray-200" />
            </div>

            {/* Q&A */}
            <div>
              <h2
                className="flex items-center text-xl font-semibold text-[#4a2e1b] cursor-pointer hover:text-[#8c5523] transition-colors duration-300"
                onClick={() => toggleSection("qa")}
              >
                Q&A <IoMdArrowDropdown className={`${activeSection === "qa" ? "rotate-180" : ""} ml-2`} />
              </h2>
              {activeSection === "qa" && (
                <p className="text-gray-700 mt-2">
                  Have a question? <Link to="/contact" className="text-[#8c5523] hover:underline">Contact us</Link>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Section (Unchanged) */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-center md:py-10 py-4">Related Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {products.slice(1, 6).map((product) => (
            <div key={product.id} className="product-card mb-4 group hover:shadow-lg rounded-2xl shadow-xl">
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
                      swiperContainer.addEventListener("mouseenter", () => {
                        if (swiper.autoplay) {
                          swiper.autoplay.start();
                        }
                      });
                      swiperContainer.addEventListener("mouseleave", () => {
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
                        onClick={() => handleImageClick(product.id)}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="absolute flex items-center justify-center bottom-0 left-1/2 w-full transform -translate-x-1/2 translate-y-full group-hover:translate-y-0 border-0 text-uppercase font-medium bg-[#b8ccc6] text-gray-900 py-2 xs:px-2 sm:px-2 md:px-4 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:text-white"
                >
                  Add To Cart
                  <span className="text-gray-900 pl-3">
                    <FaOpencart />
                  </span>
                </button>
              </div>
              <div className="relative px-2 sm:p-4 flex flex-col justify-between">
                <div>
                  <p className="text-gray-500 text-sm sm:text-base">{product.category}</p>
                  <h6 className="text-base sm:text-lg font-medium">
                    <Link to="product1_simple.html">{product.title}</Link>
                  </h6>
                  <div className="flex items-center justify-between text-lg sm:text-xl font-medium">
                    <div className="flex items-center">
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
                    onClick={() => handleMoveToWishlist(product)}
                  >
                    <FaHeart className="text-xl text-red-400 hover:text-red-700" />
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

      {/* Similar Products Section (Unchanged) */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-center md:py-10 py-4">Similar Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {products.slice(5, 10).map((product) => (
            <div key={product.id} className="product-card mb-4 group hover:shadow-lg rounded-2xl shadow-xl">
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
                      swiperContainer.addEventListener("mouseenter", () => {
                        if (swiper.autoplay) {
                          swiper.autoplay.start();
                        }
                      });
                      swiperContainer.addEventListener("mouseleave", () => {
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
                        onClick={() => handleImageClick(product.id)}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="absolute flex items-center justify-center bottom-0 left-1/2 w-full transform -translate-x-1/2 translate-y-full group-hover:translate-y-0 border-0 text-uppercase font-medium bg-[#b8ccc6] text-gray-900 py-2 xs:px-2 sm:px-2 md:px-4 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:text-white"
                >
                  Add To Cart
                  <span className="text-gray-900 pl-3">
                    <FaOpencart />
                  </span>
                </button>
              </div>
              <div className="relative px-2 sm:p-4 flex flex-col justify-between">
                <div>
                  <p className="text-gray-500 text-sm sm:text-base">{product.category}</p>
                  <h6 className="text-base sm:text-lg font-medium">
                    <Link to="product1_simple.html">{product.title}</Link>
                  </h6>
                  <div className="flex items-center justify-between text-lg sm:text-xl font-medium">
                    <div className="flex items-center">
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
                    onClick={() => handleMoveToWishlist(product)}
                  >
                    <FaHeart className="text-xl text-red-400 hover:text-red-700" />
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