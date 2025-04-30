import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import img1 from "../../assets/breadcrumps/shopbread.jpg"
import { FaClock, FaLightbulb, FaHeart, FaOpencart } from "react-icons/fa";
import { GiCandleHolder, GiCandleLight, GiFlowerPot } from "react-icons/gi";
import { PiCookingPotFill } from "react-icons/pi";
import { useState } from "react";
import { IoGridOutline } from "react-icons/io5";
import { MdViewDay } from "react-icons/md";
import { RxMixerHorizontal } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { products } from "../../constants/constants.js"
import StarRating from '../Custom bottons/starRating.jsx';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Shop = () => {
    const [cartItems, setCartItems] = useState([]);
    const [likedProducts, setLikedProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedImage, setSelectedImage] = useState({});
    const productsPerPage = 8;

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    const handleAddToCart = (product) => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        const existingProductIndex = storedCart.findIndex(item => item.id === product.id);

        if (existingProductIndex !== -1) {
            storedCart[existingProductIndex].quantity += 1;
        } else {
            storedCart.push({ ...product, quantity: 1 });
        }

        localStorage.setItem("cart", JSON.stringify(storedCart));
        alert(`${product.title} added to cart!`);
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

    return (
        <section className="overflow-hidden">
            <div className="relative h-1/2font-abc">
                <img className="w-full h-[300px] md:h-[350px] lg:h-[350px] object-cover" src={img1} alt="shop" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                    <h1 className="text-[30px] lg:text-[60px] md:text-[50px] pb-2">Shop</h1>
                    <p className="text-lg">Explore our exclusive candle collection!</p>
                </div>
            </div>
            <section className="xl:container mx-auto my-10 px-4 font-abc">
                <div className="pt-2">
                    <div className="fade show active" role="tabpanel">
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
                            {currentProducts.map((product) => (
                                <div key={product.id} className="product-card mb-4 group hover:shadow-md hover:scale-105 transition-transform bg-white rounded-xl p-4 shadow-lg h-[400px]">
                                    <div className="relative">
                                        <Link to={`/ProductDetails/${product.id}`} state={{ selectedImage: selectedImage[product.id] || product.images[0]}}>
                                            <Swiper
                                                className="swiper-container"
                                                spaceBetween={10}
                                                slidesPerView={1}
                                                autoplay={false}
                                                modules={[Autoplay]}
                                            >
                                                {product?.images.map((image, index) => (
                                                    <SwiperSlide key={index} onClick={() => handleImageClick(product.id, image)}>
                                                        <img
                                                            loading="lazy"
                                                            src={selectedImage[product.id] || product.images[0]}
                                                            alt={product.title}
                                                            className="w-full h-auto object-cover cursor-pointer"
                                                        />
                                                    </SwiperSlide>
                                                ))}
                                            </Swiper>
                                        </Link>
                                        <button 
                                            onClick={() => handleAddToCart(product)}
                                            className="absolute flex items-center justify-center bottom-0 left-1/2 w-full transform -translate-x-1/2 translate-y-full group-hover:translate-y-0 border-0 text-uppercase font-medium bg-[#b8ccc6] text-black py-2 xs:px-2 sm:px-2 md:px-4 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:text-white">
                                            Add To Cart
                                            <span className="text-black pl-3">
                                                <FaOpencart />
                                            </span>
                                        </button>
                                    </div>
                                    <div className="text-center mt-2">
                                        <p className="font-bold text-black text-lg">{product.title}</p>
                                        <div className="flex items-center justify-between mt-2">
                                            <p className="text-black text-lg text-left flex items-center">
                                                <LiaRupeeSignSolid className="mr-1" />{product.price}
                                            </p>
                                            <div className="flex items-center space-x-2">
                                                {product.images.map((image, index) => (
                                                    <img
                                                        key={index}
                                                        src={image}
                                                        alt={`Option ${index}`}
                                                        className="w-8 h-8 rounded-full cursor-pointer border-2 border-gray-300 hover:border-black"
                                                        onClick={() => handleImageClick(product.id, image)}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between mt-2">
                                            <FaHeart 
                                                className={`text-xl cursor-pointer ml-3 ${likedProducts.includes(product.id) ? 'text-red-700' : 'text-red-300'}`} 
                                                onClick={() => handleLikeProduct(product.id)} 
                                            />
                                            <StarRating rating={4} starColor="gold" isInteractive={true} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-center mt-4">
                            {Array.from({ length: Math.ceil(products.length / productsPerPage) }, (_, index) => (
                                <button
                                    key={index + 1}
                                    onClick={() => setCurrentPage(index + 1)}
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
    );
};

export default Shop;
