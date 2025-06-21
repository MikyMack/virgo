import { useState, useEffect } from "react";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ImageMagnifier from "../Custom bottons/ImageMagnifier";
import { FaOpencart, FaHeart } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/autoplay";
import "swiper/css";
import StarRating from "../Custom bottons/starRating";
import { fetchShopProducts } from '../Redux/slices/ProductSlice';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { shopProducts } = useSelector(state => state.products);
  
  useEffect(() => {
    dispatch(fetchShopProducts());
  }, [dispatch]);

  // Get product from location.state or from shopProducts
  const product = location.state?.product ||
    shopProducts?.find((item) => (item.id || item._id) === id || (item.id || item._id) === parseInt(id)) ||
    null;
 console.log('pr:',product);
 
  const [cartItems, setCartItems] = useState(() => JSON.parse(localStorage.getItem("cart")) || []);
  const [wishlistItems, setWishlistItems] = useState(() => JSON.parse(localStorage.getItem("wishlist")) || []);
  const [selectedImage, setSelectedImage] = useState(location.state?.selectedImage || product?.images?.[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeSection, setActiveSection] = useState(null);
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0]);

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
        alert(`${product.title} is already in your cart!`);
        return prevCart;
      } else {
        alert(`${product.title} added to cart successfully!`);
        return [...prevCart, { ...product, quantity: quantity }];
      }
    });
  };

  const handleMoveToWishlist = (product) => {
    if (wishlistItems.find((item) => item.id === product.id)) {
      alert(`${product.title} is already in your wishlist!`);
    } else {
      setWishlistItems((prevWishlist) => [...prevWishlist, product]);
      alert(`${product.title} added to wishlist successfully!`);
    }
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    setQuantity(isNaN(value) || value < 1 ? 1 : value);
  };

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  if (!product) {
    return <div className="text-center py-8 text-gray-700 font-serif">Loading product...</div>;
  }

  return (
    <div className="xl:container mx-auto p-6 font-serif bg-[#f8f1e9] text-gray-800">
      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Image Section */}
        <div className="w-full lg:w-1/2">
          <div className="main-image mb-6 shadow-lg rounded-lg overflow-hidden">
            <ImageMagnifier
              imageUrl={selectedImage}
              className="w-full h-[500px]  object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
          <div className="flex justify-center gap-4">
            {product.images?.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Thumbnail ${index}`}
                className={`w-20 h-20  object-cover rounded-md cursor-pointer border-2 transition-all duration-300 ${
                  selectedImage === image ? "border-[#8c5523]" : "border-transparent"
                } hover:border-[#8c5523]`}
                onMouseEnter={() => handleImageHover(image)}
                onClick={() => handleImageHover(image)}
              />
            ))}
          </div>
        </div>

        {/* Product Info Section */}
        <div className="w-full lg:w-1/2 space-y-6 bg-white p-8 rounded-lg shadow-md border border-gray-200">
          <h1 className="text-4xl font-bold text-[#4a2e1b] tracking-wide">{product.name}</h1>
          <p className="text-2xl font-medium text-[#8c5523] flex items-center">
            <LiaRupeeSignSolid /> {product.basePrice}
          </p>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4">
            <span className="text-gray-700 font-medium">Quantity:</span>
            <input
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
              min="1"
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
            Total Price: <span className="font-bold text-[#8c5523] flex items-center"><LiaRupeeSignSolid />{product.basePrice * quantity}</span>
          </div>

          {/* Color Variants */}
          {product.colors && product.colors.length > 0 && (
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
          )}

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
                  <li> {product.description || 'Wood'}</li>
             
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
                <p className="text-gray-700 mt-2">{product.careAndMaintenance || 'Wipe with a dry cloth. Avoid using harsh chemicals or abrasive materials.'}</p>
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
                <p className="text-gray-700 mt-2">{product.warranty || '1-year limited warranty.'}</p>
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
    <div className="mt-2 space-y-4">
      {product.qna && product.qna.length > 0 ? (
        product.qna.map((item, index) => (
          <div key={index} className="border-b border-gray-200 pb-4 last:border-0">
            <h3 className="font-medium text-[#4a2e1b]">Q: {item.question}</h3>
            <p className="text-gray-700 mt-1">A: {item.answer}</p>
          </div>
        ))
      ) : (
        <p className="text-gray-700">
          No questions yet. <Link to="/contact" className="text-[#8c5523] hover:underline">Contact us</Link> if you have any questions.
        </p>
      )}
    </div>
  )}
</div>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
{shopProducts && shopProducts.length > 1 && (
  <div className="mt-8">
    <h2 className="text-2xl font-bold text-center md:py-10 py-4">Related Products</h2>
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
      {shopProducts
       .filter(p => {
        // Exclude the current product (check both id and _id)
        const pId = p.id || p._id;
        const currentId = product.id || product._id;
        if (pId === currentId) return false;
        // Normalize categories for comparison
        const currentCategory = (product.primaryCategory || product.category || '').toLowerCase().trim();
        const productCategory = (p.primaryCategory || p.category || '').toLowerCase().trim();
        return currentCategory && productCategory && currentCategory === productCategory;
        })
        .slice(0, 5) // Limit to 5 products
        .map((relatedProduct) => (
          <div key={relatedProduct.id || relatedProduct._id} className="product-card mb-4 group hover:shadow-lg rounded-2xl shadow-xl">
            {/* Your existing product card JSX */}
            <div className="relative">
              <Swiper
                className="swiper-container"
                spaceBetween={10}
                slidesPerView={1}
                autoplay={false}
                modules={[Autoplay]}
              >
                {relatedProduct.images?.map((image, index) => (
                  <SwiperSlide key={index}>
                    <img
                      loading="lazy"
                      src={image}
                      alt={relatedProduct.title}
                      className="w-full h-auto object-cover"
                      onClick={() => handleImageClick(relatedProduct.id || relatedProduct._id)}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
              <button
                onClick={() => handleAddToCart(relatedProduct)}
                className="absolute flex items-center justify-center bottom-0 left-1/2 w-full transform -translate-x-1/2 translate-y-full group-hover:translate-y-0 border-0 text-uppercase font-medium bg-[#b8ccc6] text-gray-900 py-2 xs:px-2 sm:px-2 md:px-4 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:text-white"
              >
                Add To Cart
                <span className="text-gray-900 pl-3">
                  <FaOpencart />
                </span>
              </button>
            </div>
            {/* Rest of your product card content */}
          </div>
        ))}
    </div>
  </div>
)}


    </div>
  );
}