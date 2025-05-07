import React, { useEffect, useState } from 'react';
import img1 from "../../assets/breadcrumps/cartbread.jpg";
import { MdDeleteForever } from 'react-icons/md';
import { LiaRupeeSignSolid } from "react-icons/lia";
import { Link } from 'react-router-dom';
import { FaOpencart, FaHeart } from "react-icons/fa";
import StarRating from '../Custom bottons/starRating.jsx';
import wishlistimg from '../../assets/icons/wishlistimg.png'

export default function WishlistComp() {
    const [wishlist, setWishlist] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [likedProducts, setLikedProducts] = useState([]);
    const [selectedImage, setSelectedImage] = useState({});

    useEffect(() => {
        const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
        setWishlist(storedWishlist.map(product => ({ ...product, image: product.image || product.images?.[0] })));


        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCartItems(storedCart);

        const handleStorageChange = () => {
            const updatedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
            setWishlist(updatedWishlist);

            const updatedCart = JSON.parse(localStorage.getItem("cart")) || [];
            setCartItems(updatedCart);
        };

        window.addEventListener("storage", handleStorageChange);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    const handleAddToCart = (product) => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        const existingProduct = storedCart.find(item => item.id === product.id);

        let updatedCart;

        if (existingProduct) {
            alert(` ${product.title} is already added to the cart.`);
            updatedCart = storedCart.map(item =>
                item.id === product.id 
                    ? { ...item, quantity: item.quantity + 1, total: (item.quantity + 1) * item.price, image: product.image }
                    : item
            );
        } else {
            updatedCart = [...storedCart, { ...product, quantity: 1, total: product.price, image: product.image }];
            alert(` ${product.title} added to cart successfully!`);
        }

        setCartItems(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    const handleMoveToWishlist = (product) => {
        const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
        const isInWishlist = storedWishlist.some(item => item.id === product.id);

        if (isInWishlist) {
            alert("This product is already added to the wishlist.");
            return;
        }

        const updatedWishlist = [...storedWishlist, product];
        localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
        window.dispatchEvent(new Event("storage"));

        const updatedCart = cartItems.filter(item => item.id !== product.id);
        setCartItems(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    const handleDeleteItem = (id) => {
        const updatedWishlist = wishlist.filter(product => product.id !== id);
        setWishlist(updatedWishlist);
        localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
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
        <section className="font-abc">
            <div className="relative h-1/2 font-abc">
                <img className="w-full h-[200px] md:h-[250px] lg:h-[250px] object-cover" src={img1} alt="shop" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                    <h1 className="text-[25px] lg:text-[50px] md:text-[40px] pb-2">Wishlist</h1>
                    <h2 className="flex items-center gap-2 cursor-pointer">Home <span>/</span> <span>Wishlist</span></h2>
                </div>
            </div>
            <div className="flex flex-col gap-4 my-6 text-center lg:container">
                <h1 className="text-2xl font-semibold">Your Wishlist</h1>
                {wishlist.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {wishlist.map((product) => (
                            <div key={product.id} className="product-card mb-4 group hover:shadow-md bg-white rounded-xl p-4 shadow-lg h-[270px] w-[200px] relative border  shadow-xl">
                                <button 
                                    className="absolute top-2 right-2 text-red-500 text-2xl group hover:bg-red-600 hover:text-white p-2 rounded-full transition-all duration-300" 
                                    onClick={() => handleDeleteItem(product.id)}
                                    title="Remove from wishlist"
                                >
                                    <MdDeleteForever className="group-hover:opacity-100 opacity-75" />
                                </button>
                                <img src={selectedImage[product.id] || product.image} alt={product.title} className="w-full h-24 object-contain rounded-t-xl cursor-pointer" onClick={() => handleImageClick(product.id, product.image)} />
                                <h3 className="text-md font-semibold mb-1">{product.title}</h3>
                                <p className="text-black text-lg text-left flex items-center">
                                    <LiaRupeeSignSolid className="mr-1" />{product.price}
                                </p>
                                <div className="flex items-center justify-between mt-2">
                                    <FaHeart 
                                        className={`text-xl cursor-pointer ml-3 ${likedProducts.includes(product.id) ? 'text-red-700' : 'text-red-300'}`} 
                                        onClick={() => handleLikeProduct(product.id)} 
                                    />
                                    <StarRating rating={4} starColor="gold" isInteractive={true} />
                                </div>
                                <button 
                                    onClick={() => handleAddToCart(product)}
                                    className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 text-black py-2 px-3 rounded-md w-auto mt-2 text-sm hover:bg-[#9db3ab] flex items-center justify-center mx-auto">
                                    Add To Cart
                                    <span className="text-black pl-2">
                                        <FaOpencart className="text-lg" />
                                    </span>
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    
                       <div className='flex justify-center items-center flex-col'>
                         
                          <img className='h-[300px] mt-2' src={wishlistimg} alt="" />
                          <p className="text-lg text-gray-700">You currently have no items in your wishlist.</p>
                                <Link to={'/shop'}>  <button className=" bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 text-white px-6 py-2 rounded-md hover:opacity-90 mt-8">
                                          Continue Shopping
                                      </button></Link>

                       </div>
                      

                 
                    
                )}
            </div>
        </section>
    );}
