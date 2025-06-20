import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import img1 from "../../assets/breadcrumps/shopbread.jpg";
import { FaHeart, FaOpencart, FaSearch, FaFilter } from "react-icons/fa";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPrimaryCategories } from "../Redux/slices/CategoriesSlice";
import StarRating from '../Custom bottons/starRating.jsx';
import { fetchShopProducts } from '../Redux/slices/ProductSlice.js';

const PRODUCTS_PER_PAGE = 12;

const Shop = () => {
    // State management
    const [likedProducts, setLikedProducts] = useState([]);
    const [selectedImage, setSelectedImage] = useState({});
    const [showFilters, setShowFilters] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchTimeout, setSearchTimeout] = useState(null);
    const [availableBrands, setAvailableBrands] = useState([]);
    const [page, setPage] = useState(1);

    // Redux setup for categories and products
    const dispatch = useDispatch();
    const { primary } = useSelector((state) => state.categories);
    const { shopProducts, pagination, loading, error } = useSelector(state => state.products);

    // Filters state
    const [filters, setFilters] = useState({
        type: 'all',
        keyword: '',
        primaryCategory: '',
        brand: '',
        minPrice: '',
        maxPrice: '',
        sortBy: 'latest',
    });

    const typeOptions = [
        { value: 'all', label: 'All Products' },
        { value: 'featured', label: 'Featured' },
        { value: 'best-seller', label: 'Best Sellers' },
        { value: 'on-sale', label: 'On Sale' }
    ];

    const sortOptions = [
        { value: 'latest', label: 'Latest' },
        { value: 'priceLowHigh', label: 'Price: Low to High' },
        { value: 'priceHighLow', label: 'Price: High to Low' },
        { value: 'nameAZ', label: 'Name: A to Z' }
    ];

    // Fetch categories on component mount
    useEffect(() => {
        dispatch(fetchPrimaryCategories());
    }, [dispatch]);
    console.log(pagination);
    

    // Fetch products for the current page and filters
    useEffect(() => {
        const params = { ...filters, page, limit: PRODUCTS_PER_PAGE };
        Object.keys(params).forEach(key => {
            if (params[key] === '' || params[key] === null) delete params[key];
        });
        dispatch(fetchShopProducts(params));
        // eslint-disable-next-line
    }, [filters, page]);

    // Extract unique brands from current products for the filter dropdown
    useEffect(() => {
        const allBrands = [...new Set(
            (shopProducts || [])
                .map(product => product.brand)
                .filter(brand => brand && brand.trim() !== '')
        )].sort();
        setAvailableBrands(allBrands);
    }, [shopProducts]);

    // Clean up search timeout
    useEffect(() => {
        return () => {
            if (searchTimeout) clearTimeout(searchTimeout);
        };
    }, [searchTimeout]);

    const handleAddToCart = (product) => {
        alert(`${product.name || product.title} added to cart!`);
    };

    const handleLikeProduct = (id) => {
        if (likedProducts.includes(id)) {
            setLikedProducts(likedProducts.filter((prodId) => prodId !== id));
        } else {
            setLikedProducts([...likedProducts, id]);
        }
    };

    const handleImageClick = (productId, image) => {
        setSelectedImage((prevImages) => ({ ...prevImages, [productId]: image }));
    };

    // When a filter changes, reset page to 1 and update filters
    const handleFilterChange = (filterName, value) => {
        setFilters(prev => ({
            ...prev,
            [filterName]: value
        }));
        setPage(1); // Reset to first page when filter changes
    };

    const applyFilters = () => {
        setShowFilters(false);
        setPage(1); // Reset to first page when filters are applied
    };

    const clearFilters = () => {
        setFilters({
            type: 'all',
            keyword: '',
            primaryCategory: '',
            brand: '',
            minPrice: '',
            maxPrice: '',
            sortBy: 'latest',
        });
        setSearchTerm('');
        setPage(1); // Reset to first page
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    return (
        <section className="overflow-hidden">
            {/* Hero Section */}
            <div className="relative h-1/2 font-abc">
                <img className="w-full h-[300px] md:h-[350px] lg:h-[350px] object-cover" src={img1} alt="shop" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                    <h1 className="text-[30px] lg:text-[60px] md:text-[50px] pb-2">Shop</h1>
                    <p className="text-lg">Explore our exclusive candle collection!</p>
                </div>
            </div>

            {/* Filters Section */}
            <section className="xl:container mx-auto px-4 font-abc">
                <div className="bg-white rounded-lg shadow-md p-4 mb-6 mt-6">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        {/* Quick Filters */}
                        <div className="flex flex-wrap items-center gap-2">
                            <label className="text-sm font-medium text-gray-700">Type:</label>
                            <select 
                                value={filters.type}
                                onChange={(e) => handleFilterChange('type', e.target.value)}
                                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                {typeOptions.map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>

                            <label className="text-sm font-medium text-gray-700 ml-4">Sort:</label>
                            <select 
                                value={filters.sortBy}
                                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                {sortOptions.map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>

                            {/* Search Input */}
                            <div className="relative ml-4">
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    value={searchTerm}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setSearchTerm(value);

                                        if (searchTimeout) clearTimeout(searchTimeout);

                                        setSearchTimeout(
                                            setTimeout(() => {
                                                handleFilterChange('keyword', value.trim());
                                            }, 500)
                                        );
                                    }}
                                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            </div>
                        </div>

                        {/* Filter Toggle & Actions */}
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-sm font-medium transition-colors"
                            >
                                <FaFilter />
                                More Filters
                            </button>
                            <button
                                onClick={applyFilters}
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium transition-colors"
                            >
                                Apply
                            </button>
                            <button
                                onClick={clearFilters}
                                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md text-sm font-medium transition-colors"
                            >
                                Clear
                            </button>
                        </div>
                    </div>

                    {/* Advanced Filters */}
                    {showFilters && (
                        <div className="mt-4 pt-4 border-t border-gray-200">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                {/* Category Filter */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                                    <select 
                                        value={filters.primaryCategory}
                                        onChange={(e) => handleFilterChange('primaryCategory', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">All Categories</option>
                                        {primary.filter(category=>category.isActive)?.map(category => (
                                            <option key={category._id || category.id} value={category._id || category.id}>
                                                {category.name || category.title}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Brand Filter */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
                                    <select 
                                        value={filters.brand}
                                        onChange={(e) => handleFilterChange('brand', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">All Brands</option>
                                        {availableBrands.map(brand => (
                                            <option key={brand} value={brand}>
                                                {brand}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Price Range */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Min Price</label>
                                    <input
                                        type="number"
                                        placeholder="0"
                                        value={filters.minPrice !== undefined && filters.minPrice !== null ? filters.minPrice : ''}
                                        onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Max Price</label>
                                    <input
                                        type="number"
                                        placeholder="1000"
                                        value={filters.maxPrice !== undefined && filters.maxPrice !== null ? filters.maxPrice : ''}
                                        onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* Products Section */}
            <section className="xl:container mx-auto my-10 px-4 font-abc">
                {loading && (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                        <span className="ml-3 text-gray-600">Loading products...</span>
                    </div>
                )}

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}

                {!loading && (
                    <div className="pt-2">
                        <div className="mb-4 text-sm text-gray-600">
                            Showing {shopProducts.length} of {pagination.total} products
                            {filters.keyword && (
                                <span> matching "<strong>{filters.keyword}</strong>"</span>
                            )}
                            {filters.brand && (
                                <span> from brand "<strong>{filters.brand}</strong>"</span>
                            )}
                        </div>
                        
                        <div className="fade show active" role="tabpanel">
                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
                                {shopProducts.filter(product=>product.isActive)?.map((product) => (
                                    <div key={product.id || product._id} className="product-card mb-4 group hover:shadow-md hover:scale-105 transition-transform bg-white rounded-xl p-4 shadow-lg h-[400px]">
                                        <div className="relative">
                                            <Link to={`/ProductDetails/${product.id || product._id}`} state={{ selectedImage: selectedImage[product.id || product._id] || product.images[0]}}>
                                                <Swiper
                                                    className="swiper-container"
                                                    spaceBetween={10}
                                                    slidesPerView={1}
                                                    autoplay={false}
                                                    modules={[Autoplay]}
                                                >
                                                    {product?.images?.map((image, index) => (
                                                        <SwiperSlide key={index} onClick={() => handleImageClick(product.id || product._id, image)}>
                                                            <img
                                                                loading="lazy"
                                                                src={selectedImage[product.id || product._id] || product.images[0]}
                                                                alt={product.title || product.name}
                                                                className="w-full h-auto object-cover cursor-pointer"
                                                            />
                                                        </SwiperSlide>
                                                    ))}
                                                </Swiper>
                                            </Link>
                                            <button 
                                                onClick={() => handleAddToCart(product)}
                                                className="absolute flex items-center justify-center bottom-0 left-1/2 w-full transform -translate-x-1/2 translate-y-full group-hover:translate-y-0 border-0 text-uppercase font-medium bg-[#b8ccc6] text-black py-2 xs:px-2 sm:px-2 md:px-4 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:text-white"
                                            >
                                                Add To Cart
                                                <span className="text-black pl-3">
                                                    <FaOpencart />
                                                </span>
                                            </button>
                                        </div>
                                        <div className="text-center mt-2">
                                            <p className="font-bold text-black text-lg">{product.title || product.name}</p>
                                            <div className="flex items-center justify-between mt-2">
                                                <p className="text-black text-lg text-left flex items-center">
                                                    <LiaRupeeSignSolid className="mr-1" />{product.price !== undefined ? product.price : product.basePrice}
                                                </p>
                                                <div className="flex items-center space-x-2">
                                                    {product.images?.slice(0, 3).map((image, index) => (
                                                        <img
                                                            key={index}
                                                            src={image}
                                                            alt={`Option ${index}`}
                                                            className="w-8 h-8 rounded-full cursor-pointer border-2 border-gray-300 hover:border-black"
                                                            onClick={() => handleImageClick(product.id || product._id, image)}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between mt-2">
                                                <FaHeart 
                                                    className={`text-xl cursor-pointer ml-3 ${likedProducts.includes(product.id || product._id) ? 'text-red-700' : 'text-red-300'}`} 
                                                    onClick={() => handleLikeProduct(product.id || product._id)} 
                                                />
                                                <StarRating rating={product.rating || 4} starColor="gold" isInteractive={true} />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Show message if no products */}
                            {!loading && shopProducts.length === 0 && (
                                <div className="text-center py-12">
                                    <p className="text-gray-500 text-lg">
                                        {filters.keyword
                                            ? `No products found matching "${filters.keyword}"`
                                            : filters.brand
                                            ? `No products found from brand "${filters.brand}"`
                                            : 'No products found with current filters'}
                                    </p>
                                    <button 
                                        onClick={clearFilters}
                                        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                    >
                                        Clear Filters
                                    </button>
                                </div>
                            )}

                            {/* Pagination */}
                            {pagination.totalPages > 1 && (
                                <div className="flex justify-center mt-8">
                                    <button
                                        onClick={() => handlePageChange(page - 1)}
                                        disabled={page === 1}
                                    >
                                        Previous
                                    </button>
                                    {Array.from({ length: pagination.totalPages }, (_, idx) => (
                                        <button
                                            key={idx + 1}
                                            onClick={() => handlePageChange(idx + 1)}
                                            className={page === idx + 1 ? 'active' : ''}
                                        >
                                            {idx + 1}
                                        </button>
                                    ))}
                                    <button
                                        onClick={() => handlePageChange(page + 1)}
                                        disabled={page === pagination.totalPages}
                                    >
                                        Next
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </section>
        </section>
    );
};

export default Shop;