import { useState, useEffect } from "react";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ImageMagnifier from "../Custom bottons/ImageMagnifier";
import { FaOpencart, FaHeart, FaInfoCircle, FaShieldAlt, FaQuestionCircle } from "react-icons/fa";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
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

  const [cartItems, setCartItems] = useState(() => JSON.parse(localStorage.getItem("cart")) || []);
  const [wishlistItems, setWishlistItems] = useState(() => JSON.parse(localStorage.getItem("wishlist")) || []);
  const [selectedImage, setSelectedImage] = useState(location.state?.selectedImage || product?.images?.[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeSection, setActiveSection] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(product?.variants?.[0]);

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
    const productToAdd = {
      ...product,
      quantity: quantity,
      selectedVariant: selectedVariant
    };
    
    setCartItems((prevCart) => {
      const existingProduct = prevCart.find((item) => 
        item.id === product.id && 
        (!selectedVariant || item.selectedVariant?.color === selectedVariant?.color && item.selectedVariant?.size === selectedVariant?.size)
      );
      if (existingProduct) {
        alert(`${product.name} is already in your cart!`);
        return prevCart;
      } else {
        alert(`${product.name} added to cart successfully!`);
        return [...prevCart, productToAdd];
      }
    });
  };

  const handleMoveToWishlist = (product) => {
    if (wishlistItems.find((item) => item.id === product.id)) {
      alert(`${product.name} is already in your wishlist!`);
    } else {
      setWishlistItems((prevWishlist) => [...prevWishlist, product]);
      alert(`${product.name} added to wishlist successfully!`);
    }
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    setQuantity(isNaN(value) || value < 1 ? 1 : value);
  };

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const renderSectionIcon = (section) => {
    switch(section) {
      case 'specifications': return <FaInfoCircle className="mr-2" />;
      case 'care': return <FaShieldAlt className="mr-2" />;
      case 'warranty': return <FaShieldAlt className="mr-2" />;
      case 'qa': return <FaQuestionCircle className="mr-2" />;
      default: return null;
    }
  };

  if (!product) {
    return <div className="text-center py-8 text-gray-700 font-serif">Loading product...</div>;
  }

  // Calculate display price based on variant selection
  const displayPrice = selectedVariant?.price || product.basePrice;
  const displayStock = selectedVariant?.stock || product.baseStock;

  return (
    <div className="xl:container mx-auto p-6 font-serif bg-[#f8f1e9] text-gray-800">
      {/* Breadcrumbs */}
      <div className="text-sm breadcrumbs mb-6">
        <ul>
          <li><Link to="/" className="text-[#8c5523] hover:underline">Home</Link></li> 
          <li><Link to="/shop" className="text-[#8c5523] hover:underline">Shop</Link></li> 
          <li className="text-gray-600">{product.name}</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Image Section */}
        <div className="w-full lg:w-1/2">
          <div className="main-image mb-6 shadow-lg rounded-lg overflow-hidden bg-white p-4">
            <ImageMagnifier
              imageUrl={selectedImage}
              className="w-full h-[500px] object-contain transition-transform duration-300 hover:scale-105"
            />
          </div>
          <div className="flex justify-center gap-4">
            {product.images?.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Thumbnail ${index}`}
                className={`w-20 h-20 object-cover rounded-md cursor-pointer border-2 transition-all duration-300 ${
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
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold text-[#4a2e1b] tracking-wide">{product.name}</h1>
              <p className="text-lg text-gray-600 mt-1">{product.brand}</p>
            </div>
            {product.isActive ? (
              <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">In Stock</span>
            ) : (
              <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Out of Stock</span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <StarRating rating={4.5} /> {/* Assuming a rating component */}
            <span className="text-gray-600 text-sm">(24 reviews)</span>
          </div>

          <div className="flex items-center gap-4">
            <p className="text-2xl font-medium text-[#8c5523] flex items-center">
              <LiaRupeeSignSolid /> {displayPrice}
              {product.basePrice !== displayPrice && (
                <span className="text-gray-500 text-lg line-through ml-2">
                  <LiaRupeeSignSolid />{product.basePrice}
                </span>
              )}
            </p>
            {product.basePrice !== displayPrice && (
              <span className="bg-green-100 text-green-800 text-sm font-medium px-2 py-0.5 rounded">
                {Math.round(((product.basePrice - displayPrice) / product.basePrice) * 100)}% OFF
              </span>
            )}
          </div>

          {/* Fragrance */}
          {product.fragrance && (
            <div className="mt-2">
              <span className="text-gray-700 font-medium">Fragrance:</span>
              <span className="ml-2 text-gray-600">{product.fragrance}</span>
            </div>
          )}

          {/* Variants - Updated to show as cards */}
          {product.variants && product.variants.length > 0 && (
            <div className="mt-6">
              <h2 className="text-lg font-semibold text-[#4a2e1b] mb-3">Available Variants</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {product.variants.map((variant, index) => (
                  <div
                    key={index}
                    className={`p-3 border rounded-lg cursor-pointer transition-all duration-300 ${
                      selectedVariant?.color === variant.color && selectedVariant?.size === variant.size
                        ? "border-[#8c5523] bg-[#f8f1e9]"
                        : "border-gray-200 hover:border-[#8c5523]"
                    }`}
                    onClick={() => {
                      setSelectedVariant(variant);
                      if (variant.image) setSelectedImage(variant.image);
                    }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div
                        className="w-5 h-5 rounded-full border border-gray-300"
                        style={{ backgroundColor: variant.color }}
                      />
                      <span className="font-medium">{variant.color}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Size:</span>
                      <span className="font-medium">{variant.size}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Price:</span>
                      <span className="font-medium flex items-center">
                        <LiaRupeeSignSolid />{variant.price}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Stock:</span>
                      <span className={`font-medium ${
                        variant.stock > 5 ? "text-green-600" : variant.stock > 0 ? "text-yellow-600" : "text-red-600"
                      }`}>
                        {variant.stock > 0 ? `${variant.stock} available` : "Out of stock"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Selected Variant Details */}
          {selectedVariant && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-[#4a2e1b] mb-2">Selected Variant Details</h3>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-gray-600">Color:</span>
                  <div className="flex items-center gap-2 mt-1">
                    <div
                      className="w-5 h-5 rounded-full border border-gray-300"
                      style={{ backgroundColor: selectedVariant.color }}
                    />
                    <span>{selectedVariant.color}</span>
                  </div>
                </div>
                <div>
                  <span className="text-gray-600">Size:</span>
                  <p className="font-medium">{selectedVariant.size}</p>
                </div>
                <div>
                  <span className="text-gray-600">Price:</span>
                  <p className="font-medium flex items-center">
                    <LiaRupeeSignSolid />{selectedVariant.price}
                  </p>
                </div>
                <div>
                  <span className="text-gray-600">Stock:</span>
                  <p className={`font-medium ${
                    selectedVariant.stock > 5 ? "text-green-600" : 
                    selectedVariant.stock > 0 ? "text-yellow-600" : "text-red-600"
                  }`}>
                    {selectedVariant.stock > 0 ? `${selectedVariant.stock} available` : "Out of stock"}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Quantity Selector */}
          <div className="flex items-center gap-4 mt-4">
            <span className="text-gray-700 font-medium">Quantity:</span>
            <input
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
              min="1"
              max={displayStock}
              className="w-16 p-2 border border-gray-300 rounded-md text-center focus:outline-none focus:ring-2 focus:ring-[#8c5523]"
            />
            <span className="text-sm text-gray-500">({displayStock} available)</span>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-6 mt-6">
            <button
              className="bg-[#8c5523] text-white py-3 px-6 rounded-md hover:bg-[#6b3e1a] transition-all duration-300 flex items-center gap-2 shadow-md"
              onClick={() => handleAddToCart(product)}
              disabled={!product.isActive}
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
          <div className="text-gray-700 font-medium mt-4">
            Total Price: <span className="font-bold text-[#8c5523] flex items-center"><LiaRupeeSignSolid />{displayPrice * quantity}</span>
          </div>

          {/* Collapsible Sections */}
          <div className="mt-6 space-y-4">
            {/* Specifications */}
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 transition-colors duration-300"
                onClick={() => toggleSection("specifications")}
              >
                <div className="flex items-center text-lg font-semibold text-[#4a2e1b]">
                  {renderSectionIcon("specifications")}
                  Specifications
                </div>
                {activeSection === "specifications" ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
              </button>
              {activeSection === "specifications" && (
                <div className="p-4 bg-white">
                  {product.specifications ? (
                    <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: product.specifications }} />
                  ) : (
                    <p className="text-gray-500">No specifications provided.</p>
                  )}
                </div>
              )}
            </div>

            {/* Care and Maintenance */}
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 transition-colors duration-300"
                onClick={() => toggleSection("care")}
              >
                <div className="flex items-center text-lg font-semibold text-[#4a2e1b]">
                  {renderSectionIcon("care")}
                  Care and Maintenance
                </div>
                {activeSection === "care" ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
              </button>
              {activeSection === "care" && (
                <div className="p-4 bg-white">
                  {product.careAndMaintenance ? (
                    <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: product.careAndMaintenance }} />
                  ) : (
                    <p className="text-gray-500">No care instructions provided.</p>
                  )}
                </div>
              )}
            </div>

            {/* Warranty */}
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 transition-colors duration-300"
                onClick={() => toggleSection("warranty")}
              >
                <div className="flex items-center text-lg font-semibold text-[#4a2e1b]">
                  {renderSectionIcon("warranty")}
                  Warranty
                </div>
                {activeSection === "warranty" ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
              </button>
              {activeSection === "warranty" && (
                <div className="p-4 bg-white">
                  {product.warranty ? (
                    <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: product.warranty }} />
                  ) : (
                    <p className="text-gray-500">No warranty information provided.</p>
                  )}
                </div>
              )}
            </div>

            {/* Q&A */}
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 transition-colors duration-300"
                onClick={() => toggleSection("qa")}
              >
                <div className="flex items-center text-lg font-semibold text-[#4a2e1b]">
                  {renderSectionIcon("qa")}
                  Questions & Answers
                </div>
                {activeSection === "qa" ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
              </button>
              {activeSection === "qa" && (
                <div className="p-4 bg-white space-y-4">
                  {product.qna && product.qna.length > 0 ? (
                    product.qna.map((item, index) => (
                      <div key={index} className="border-b border-gray-200 pb-4 last:border-0">
                        <h3 className="font-medium text-[#4a2e1b]">Q: {item.question}</h3>
                        <p className="text-gray-700 mt-1 pl-4">A: {item.answer}</p>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-gray-500 mb-2">No questions yet.</p>
                      <Link 
                        to="/contact" 
                        className="text-[#8c5523] hover:underline font-medium"
                      >
                        Ask a question about this product
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      {shopProducts && shopProducts.length > 1 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-center md:py-10 py-4 border-t border-gray-200 pt-8">You May Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {shopProducts
              .filter(p => {
                const pId = p.id || p._id;
                const currentId = product.id || product._id;
                if (pId === currentId) return false;
                const currentCategory = (product.primaryCategory || product.category || '').toString();
                const productCategory = (p.primaryCategory || p.category || '').toString();
                return currentCategory && productCategory && currentCategory === productCategory;
              })
              .slice(0, 5)
              .map((relatedProduct) => (
                <div key={relatedProduct.id || relatedProduct._id} className="product-card group hover:shadow-lg rounded-xl shadow-md overflow-hidden transition-all duration-300 bg-white">
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
                            alt={relatedProduct.name}
                            className="w-full h-48 object-cover cursor-pointer"
                            onClick={() => handleImageClick(relatedProduct.id || relatedProduct._id)}
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                    <button
                      onClick={() => handleAddToCart(relatedProduct)}
                      className="absolute flex items-center justify-center bottom-0 left-1/2 w-full transform -translate-x-1/2 translate-y-full group-hover:translate-y-0 border-0 text-uppercase font-medium bg-[#b8ccc6] text-gray-900 py-2 px-4 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-[#8c5523] hover:text-white"
                    >
                      Add To Cart
                      <span className="pl-3">
                        <FaOpencart />
                      </span>
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 truncate">{relatedProduct.name}</h3>
                    <p className="text-[#8c5523] font-medium flex items-center">
                      <LiaRupeeSignSolid /> {relatedProduct.basePrice}
                    </p>
                    <div className="flex items-center mt-1">
                      <StarRating rating={4} size="sm" />
                      <span className="text-gray-500 text-xs ml-1">(12)</span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}