import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LiaRupeeSignSolid } from "react-icons/lia";
import { FaOpencart, FaHeart } from "react-icons/fa";
import StarRating from '../Custom bottons/starRating.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllProducts } from '../Redux/slices/ProductSlice.js';
import "./productsHome.css";

const ProductsHome = () => {
     const [activeTab, setActiveTab] = useState('all');
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
    const [wishlistItems, setWishlistItems] = useState([]);
    const [selectedImages, setSelectedImages] = useState({});

    const dispatch = useDispatch();
    const { 
        allProducts = [], 
        loading, 
        error, 
        productType 
    } = useSelector((state) => state.products);

    const tabToApiTypeMap = {
        'all': 'all',
        'featured': 'featured',
        'bestseller': 'best-seller',
        'on-sale': 'on-sale'
    };

    useEffect(() => {
        // Initialize from localStorage
        const initializeFromStorage = () => {
            try {
                const savedCart = localStorage.getItem("cart");
                const savedWishlist = localStorage.getItem("wishlist");
                if (savedCart) setCartItems(JSON.parse(savedCart));
                if (savedWishlist) setWishlistItems(JSON.parse(savedWishlist));
            } catch (e) {
                console.error("Storage parse error:", e);
            }
        };
        initializeFromStorage();
    }, []);

    useEffect(() => {
        // Fetch products when tab changes
        const apiType = tabToApiTypeMap[activeTab];
        dispatch(fetchAllProducts({ type: apiType }));
    }, [dispatch, activeTab]);
    const productsToDisplay = Array.isArray(allProducts) ? allProducts : [];
console.log('produc:',productsToDisplay);

    const handleAddToCart = (product) => {
        if (!product?._id) {
            console.error("Invalid product:", product);
            return;
        }

        const existingProduct = cartItems.find(item => item._id === product._id);
        
        if (existingProduct) {
            alert(`${product.name || 'Product'} is already in your cart!`);
            return;
        }

        const productToAdd = {
            ...product,
            quantity: 1,
            price: product.variants?.[0]?.price || product.price || 0,
            image: product.images?.[0] || '/placeholder-product.jpg'
        };

        const updatedCart = [...cartItems, productToAdd];
        setCartItems(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        alert(`${product.name || 'Product'} added to cart!`);
    };

    const handleImageOptionClick = (productId, image) => {
        setSelectedImages(prev => ({ 
            ...prev, 
            [productId]: image 
        }));
    };

    const handleImageClick = (productId, product) => {
        if (productId && product) {
            navigate(`/ProductDetails/${productId}`, {
                state: {
                    product: product,
                    selectedImage: selectedImages[productId] || product.images?.[0] || '/placeholder-product.jpg'
                }
            });
        }
    };

    const handleMoveToWishlist = (product) => {
        if (!product?._id) {
            console.error("Invalid product:", product);
            return;
        }

        if (wishlistItems.some(item => item._id === product._id)) {
            alert(`${product.name || 'Product'} is already in your wishlist!`);
            return;
        }

        const productToAdd = {
            ...product,
            price: product.variants?.[0]?.price || product.price || 0,
            image: product.images?.[0] || '/placeholder-product.jpg'
        };

        const updatedWishlist = [...wishlistItems, productToAdd];
        setWishlistItems(updatedWishlist);
        localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
        alert(`${product.name || 'Product'} added to wishlist!`);
    };

    const getCategoryName = (category) => {
        if (!category) return 'Uncategorized';
        if (typeof category === 'object' && category.name) return category.name;
        return category;
    };

    const formatTabName = (tab) => {
        switch(tab) {
            case 'bestseller': return 'Best Seller';
            case 'on-sale': return 'On Sale';
            default: return tab.charAt(0).toUpperCase() + tab.slice(1);
        }
    };

    const getProductPrice = (product) => {
        const price = product.variants?.[0]?.price || product.price;
        return price ? price.toFixed(2) : '0.00';
    };

    return (
        <section className="xl:container mx-auto my-10 px-4 font-abc">
            <h2 className="text-center font-bold text-2xl md:text-[40px] mb-10 text-gray-700">
                Best Selling Products
            </h2>

            <ul className="mb-10 flex justify-center items-center text-center text-xl lg:text-2xl space-x-9">
                {['all', 'featured', 'bestseller', 'on-sale'].map((tab) => (
                    <li key={tab} className="nav-item">
                        <button
                            className={`cursor-pointer transition-colors duration-200 ${
                                activeTab === tab 
                                    ? 'font-bold text-blue-600 border-b-2 border-blue-600' 
                                    : 'text-gray-600 hover:text-blue-500'
                            }`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {formatTabName(tab)}
                        </button>
                    </li>
                ))}
            </ul>

            {loading ? (
                <div className="text-center py-10">Loading products...</div>
            ) : error ? (
                <div className="text-center py-10">
                    <div className="text-red-500 mb-4">Error: {error}</div>
                    <button 
                        onClick={() => dispatch(fetchAllProducts({ type: tabToApiTypeMap[activeTab] }))}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Retry
                    </button>
                </div>
            ) : productsToDisplay.length === 0 ? (
                <div className="text-center py-10">
                    No products found. 
                    <button 
                        onClick={() => dispatch(fetchAllProducts({ type: tabToApiTypeMap[activeTab] }))}
                        className="ml-2 text-blue-500 hover:underline"
                    >
                        Refresh
                    </button>
                </div>
            ) : (
                <div className="pt-2">
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {productsToDisplay.map((product) => (
                            product?._id ? (
                                <div key={product._id} className="product-card group hover:shadow-lg rounded-xl overflow-hidden transition-shadow duration-300">
                                    <div className="relative aspect-square overflow-hidden">
                                        <img
                                            loading="lazy"
                                            src={selectedImages[product._id] || product.images?.[0] || '/placeholder-product.jpg'}
                                            alt={product.name || 'Product'}
                                            className="w-full h-full object-cover cursor-pointer transition-transform duration-300 group-hover:scale-105"
                                            onClick={() => handleImageClick(product._id, product)}
                                            onError={(e) => {
                                                e.target.src = '/placeholder-product.jpg';
                                            }}
                                        />
                                        <button 
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleAddToCart(product);
                                            }}
                                            className="absolute bottom-0 left-0 right-0 bg-[#b8ccc6] text-gray-900 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                                        >
                                            Add To Cart <FaOpencart className="ml-2" />
                                        </button>
                                    </div>
                                    <div className="p-4">
                                       
                                        <h3 className="font-medium text-lg mb-2 line-clamp-2">
                                            <Link to={`/ProductDetails/${product._id}`} className="hover:text-blue-600 transition-colors duration-200">
                                                {product.name || 'Unnamed Product'}
                                            </Link>
                                        </h3>
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center text-lg font-semibold">
                                                <LiaRupeeSignSolid />
                                                <span>{getProductPrice(product)}</span>
                                            </div>
                                            {product.images?.length > 1 && (
                                                <div className="flex space-x-1">
                                                    {product.images.slice(0, 3).map((image, index) => (
                                                        <img
                                                            key={index}
                                                            src={image}
                                                            alt={`Variant ${index}`}
                                                            className="w-6 h-6 rounded-full border border-gray-200 cursor-pointer object-cover"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleImageOptionClick(product._id, image);
                                                            }}
                                                            onError={(e) => {
                                                                e.target.style.display = 'none';
                                                            }}
                                                        />
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex justify-between items-center mt-2">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleMoveToWishlist(product);
                                                }}
                                                className="text-red-400 hover:text-red-600 transition-colors duration-200"
                                                aria-label="Add to wishlist"
                                            >
                                                <FaHeart />
                                            </button>
                                            <StarRating rating={product.rating || 0} />
                                        </div>
                                    </div>
                                </div>
                            ) : null
                        ))}
                    </div>
                </div>
            )}
        </section>
    );
};

export default ProductsHome;