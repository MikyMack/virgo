import React, { useEffect, useState } from 'react';
import { FaPlus, FaMinus, FaGift } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
import { LiaRupeeSignSolid } from 'react-icons/lia';
import bgimg from "../../assets/breadcrumps/cartbread.jpg";

export default function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        const updatedCart = storedCart.map(product => ({ ...product, image: product.images[0], total: (product.quantity || 1) * product.price }));
        setCartItems(updatedCart);
    }, []);

    const handleAddToCart = (product) => {
        const existingProduct = cartItems.find(item => item.id === product.id);
        let updatedCart;

        if (existingProduct) {
            updatedCart = cartItems.map(item => 
                item.id === product.id 
                    ? { ...item, quantity: item.quantity + 1, total: (item.quantity + 1) * item.price } 
                    : item
            );
        } else {
            updatedCart = [...cartItems, { ...product, quantity: 1, total: product.price }];
        }

        setCartItems(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    const handleQuantityChange = (id, change) => {
        const updatedCart = cartItems.map(product =>
            product.id === id 
                ? { ...product, quantity: Math.max(1, product.quantity + change), total: Math.max(1, product.quantity + change) * product.price } 
                : product
        );
        setCartItems(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    const handleDeleteItem = (id) => {
        const updatedCart = cartItems.filter(product => product.id !== id);
        setCartItems(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    const handleMoveToWishlist = (product) => {
        const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
        const isInWishlist = storedWishlist.some(item => item.id === product.id);

        if (isInWishlist) {
            alert(`This ${product.title} is already added to the Wishlist.`);
            return;
        }

        const updatedWishlist = [...storedWishlist, product];
        localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
        window.dispatchEvent(new Event("storage"));

        const updatedCart = cartItems.filter(item => item.id !== product.id);
        setCartItems(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));

        alert(` ${product.title} moved to Wishlist Syccessfully!.`);
    };

    const cartTotal = cartItems.reduce((total, product) => total + (product.total || product.price), 0);
    const shipping = cartTotal >= 900 ? 0 : 50; 
    const totalAmount = cartTotal + shipping;

    const remainingAmount = Math.max(0, 900 - cartTotal); // Ensure this is always calculated

    return (
        <div>
            <div className="bg-cover bg-center h-[450px]" style={{ backgroundImage: `url(${bgimg})` }}></div>
            <div className="text-center text-xl text-black bg-gradient-to-r from-green-200 via-blue-200 to-teal-200 font-semibold flex items-center justify-center gap-2 p-6 rounded-md">
                <FaGift className="text-yellow-300 text-4xl" />
                {remainingAmount > 0 ? (
                    <>Add ₹{remainingAmount} to cart and get <span className="font-bold">FREE SHIPPING!....</span></>
                ) : (
                    <span className="font-bold">Congratulations! You have unlocked FREE SHIPPING!</span>
                )}
            </div>

            <div className="p-6 flex">
                <div className="w-2/3">
                    <h1 className="text-3xl font-bold mb-6 text-center">Your Cart</h1>
                    {cartItems.length > 0 ? (
                        <div className="flex flex-wrap gap-4 justify-center max-h-[500px] overflow-y-auto">
                            {cartItems.map((product, index) => (
                                <div key={index} className="border rounded-2xl overflow-hidden shadow-xl w-64 relative transform hover:scale-105 transition-all duration-300">
                                    <button 
                                        className="absolute top-2 right-2 text-red-500 text-2xl group hover:bg-red-600 hover:text-white p-2 rounded-full transition-all duration-300" 
                                        onClick={() => handleDeleteItem(product.id)}
                                        title="Remove from cart"
                                    >
                                        <MdDeleteForever className="group-hover:opacity-100 opacity-75" />
                                    </button>
                                    <img 
                                        src={product.image} 
                                        alt={product.title} 
                                        className="w-full h-40 object-contain rounded-t-2xl" 
                                    />
                                    <div className="p-4">
                                        <h3 className="text-lg font-semibold mb-1">{product.title}</h3>
                                        <p className="text-gray-600 mb-1">₹{product.total || product.price}</p>
                                        <div className="flex items-center justify-start mb-3 space-x-3">
                                            <button onClick={() => handleQuantityChange(product.id, -1)} className="text-red-500 text-xl"><FaMinus /></button>
                                            <p className="text-gray-500">Quantity: {product.quantity}</p>
                                            <button onClick={() => handleQuantityChange(product.id, 1)} className="text-green-500 text-xl"><FaPlus /></button>
                                        </div>
                                        <div className="flex justify-center mt-3">
                                            <button 
                                                className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 text-white px-6 py-2 rounded-md hover:opacity-90 w-auto mt-2 text-sm"
                                                onClick={() => handleMoveToWishlist(product)}
                                            >
                                                Move to Wishlist
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 text-center text-3xl font-bold mt-20">Your cart is empty.</p>
                    )}
                </div>
               <div className="w-1/4 border rounded-2xl overflow-hidden shadow-xl ml-6 mt-4 h-[500px] flex flex-col justify-center p-6 bg-cover" >
                    <h2 className="text-2xl font-bold mb-4 text-center">CART TOTALS</h2>
                    <div className="flex justify-between py-2">
                        <h3>Subtotal:</h3>
                        <p className="font-bold">₹{cartTotal}</p>
                    </div>
                    <div className="flex justify-between py-2">
                        <h3>Shipping:</h3>
                        <p className="font-bold">₹{shipping}</p>
                    </div>
                    <div className="flex justify-between py-2">
                        <h3>Total:</h3>
                        <p className="font-bold">₹{totalAmount}</p>
                    </div>
                    <div className="flex justify-center mt-4">
                        <button className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 text-white px-4 py-2 rounded-md hover:opacity-90 w-auto">Proceed to Checkout</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
