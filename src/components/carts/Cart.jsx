import React, { useEffect, useRef } from 'react';
import { FaPlus, FaMinus, FaGift } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
import { LiaRupeeSignSolid } from 'react-icons/lia';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { 
  fetchCartItems, 
  updateCartItem, 
  removeCartItem, 
  clearCart,
  syncGuestCart 
} from '../Redux/slices/CartSlice';
import bgimg from "../../assets/breadcrumps/cartbread.jpg";
import empty from '../../assets/icons/empty.png';

// Helper to generate guest cart item ID (must match CartSlice.js)
const generateGuestItemId = (productId, variant) => {
const variantStr = variant ? JSON.stringify(variant) : 'no-variant';
return `guest-${productId}-${btoa(variantStr)}`;
};

export default function Cart() {
const dispatch = useDispatch();
const navigate = useNavigate();
const { 
items: cartItems, 
status, 
error,
subtotal: cartTotal,
shipping,
total: totalAmount
} = useSelector(state => state.cart);
const hasSyncedRef = useRef(false);
useEffect(() => {
  const token = localStorage.getItem('token');
  const guestCart = localStorage.getItem('guestCart');
  const hasSynced = localStorage.getItem('hasSyncedCart');

  if (token && guestCart && guestCart !== '[]' && !hasSynced && !hasSyncedRef.current) {
    hasSyncedRef.current = true; 
    dispatch(syncGuestCart())
      .unwrap()
      .then(() => {
        localStorage.setItem('hasSyncedCart', 'true');
        toast.success('Your cart has been synced!');
      })
      .catch((error) => {
        console.error('Sync error:', error);
        toast.error('Failed to sync cart');
      });
  } else {
    dispatch(fetchCartItems());
  }
}, [dispatch]);

  const handleQuantityChange = (id, change) => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      // Handle guest cart update
      const guestCart = JSON.parse(localStorage.getItem('guestCart') || '[]');
      const itemIndex = guestCart.findIndex(item => generateGuestItemId(item.productId, item.variant) === id);
      
      if (itemIndex !== -1) {
      const newQuantity = guestCart[itemIndex].quantity + change;
      if (newQuantity < 1) return;
      
      guestCart[itemIndex].quantity = newQuantity;
      localStorage.setItem('guestCart', JSON.stringify(guestCart));
      dispatch(fetchCartItems()); // Refresh cart display
      toast.success('Quantity updated successfully!');
      }
      return;
    }

    // Handle logged-in user cart update
    const item = cartItems.find(item => item._id === id);
    if (!item) return;

    // Prevent reducing below 1
    if (item.quantity + change < 1) return;

    let variant = undefined;
    if (item.variant && typeof item.variant === 'object') {
      variant = {};
      if (item.variant.color) variant.color = item.variant.color;
      if (item.variant.size) variant.size = item.variant.size;
    }

    dispatch(updateCartItem({
      productId: item.product._id,
      variant,
      quantity: change // send +1 or -1
    }))
      .unwrap()
      .then(() => {
        toast.success('Quantity updated successfully!');
      })
      .catch((error) => {
        toast.error(`Failed to update quantity: ${error.message || 'Unknown error'}`);
        console.error('Update quantity error:', error);
      });
  };

  const handleDeleteItem = (id) => {
    const token = localStorage.getItem('token');
    
    if (!token) {
    // Handle guest cart deletion robustly
    let guestCart = JSON.parse(localStorage.getItem('guestCart') || '[]');
    guestCart = guestCart.filter(item => generateGuestItemId(item.productId, item.variant) !== id);
    localStorage.setItem('guestCart', JSON.stringify(guestCart));
    dispatch(fetchCartItems()); // Refresh cart display
    toast.success('Item removed from cart successfully!');
    return;
    }

    // Handle logged-in user cart deletion
    dispatch(removeCartItem(id))
      .unwrap()
      .then(() => {
        toast.success('Item removed from cart successfully!');
      })
      .catch((error) => {
        toast.error(`Failed to remove from cart: ${error.message || 'Unknown error'}`);
        console.error('Remove from cart error:', error);
      });
  };

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      const token = localStorage.getItem('token');
      
      if (!token) {
        // Clear guest cart
        localStorage.removeItem('guestCart');
        dispatch(fetchCartItems()); // Refresh cart display
        toast.success('Cart cleared successfully!');
        return;
      }
      
      // Clear logged-in user cart
      dispatch(clearCart())
        .unwrap()
        .then(() => {
          toast.success('Cart cleared successfully!');
        })
        .catch((error) => {
          toast.error('Failed to clear cart');
        });
    }
  };

  const handleCheckout = () => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      toast.error('Please login to proceed to checkout', {
        autoClose: 3000,
        closeButton: true,
        position: 'top-center',
      });
      // Redirect to login page
      navigate('/login');
      return;
    }
    
    // If user is logged in, proceed to checkout
    navigate('/checkout');
  };

  const remainingAmount = Math.max(0, 900 - cartTotal);

  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
        {error}
      </div>
    );
  }

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
      
      <div className="p-6 flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-6 text-center">Your Cart</h1>
        
        {cartItems.length > 0 ? (
          <div className="flex w-full">
            <div className="w-2/3">
              <div className="flex flex-wrap gap-4 justify-center max-h-[500px] overflow-y-auto">
                {cartItems.map((item) => {
                // Handle both guest cart and logged-in cart item structure
                const product = item.product || item.productData;
                const itemId = item._id; // Always use _id for guest cart
                const itemPrice = product.basePrice || product.price;
                
                return (
                <div key={itemId} className="border rounded-2xl overflow-hidden shadow-xl w-64 relative transform hover:scale-105 transition-all duration-300">
                <button 
                className="absolute top-2 right-2 text-red-500 text-2xl group hover:bg-red-600 hover:text-white p-2 rounded-full transition-all duration-300" 
                onClick={() => handleDeleteItem(itemId)}
                title="Remove from cart"
                >
                <MdDeleteForever className="group-hover:opacity-100 opacity-75" />
                </button>
                
                <Link 
                to={`/ProductDetails/${product._id || product.id}`}
                state={{ product: product, selectedImage: product.images?.[0] }}
                >
                <img 
                src={product.images?.[0] || product.image} 
                alt={product.name} 
                className="w-full h-40 object-contain rounded-t-2xl cursor-pointer" 
                />
                </Link>
                
                <div className="p-4">
                <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
                {item.variant && (
                <p className="text-sm text-gray-500 mb-1">
                {Object.entries(item.variant).map(([key, value]) => (
                <span key={key} className="mr-2 capitalize">{key}: {value}</span>
                ))}
                </p>
                )}
                <p className="text-gray-600 mb-1 flex items-center">
                <LiaRupeeSignSolid />{itemPrice * item.quantity}
                </p>
                
                <div className="flex items-center justify-start mb-3 space-x-3">
                <button 
                onClick={() => handleQuantityChange(itemId, -1)} 
                className="text-red-500 text-xl"
                >
                <FaMinus />
                </button>
                <p className="text-gray-500">Quantity: {item.quantity}</p>
                <button 
                onClick={() => handleQuantityChange(itemId, 1)} 
                className="text-green-500 text-xl"
                >
                <FaPlus />
                </button>
                </div>
                </div>
                </div>
                );
                })}
              </div>
              
              <div className="mt-6 text-center">
                <button 
                  onClick={handleClearCart}
                  className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600"
                >
                  Clear Entire Cart
                </button>
              </div>
            </div>
            
            <div className="w-1/4 border rounded-2xl overflow-hidden shadow-xl ml-6 mt-4 h-[500px] flex flex-col justify-center p-6 bg-cover">
              <h2 className="text-2xl font-bold mb-4 text-center">CART TOTALS</h2>
              <div className="flex justify-between py-2">
                <h3>Subtotal:</h3>
                <p className="font-bold flex items-center">
                  <LiaRupeeSignSolid />{cartTotal}
                </p>
              </div>
              <div className="flex justify-between py-2">
                <h3>Shipping:</h3>
                <p className="font-bold flex items-center">
                  <LiaRupeeSignSolid />{shipping}
                </p>
              </div>
              <div className="flex justify-between py-2 border-t border-gray-300 pt-3">
                <h3 className="font-bold">Total:</h3>
                <p className="font-bold text-lg flex items-center">
                  <LiaRupeeSignSolid />{totalAmount}
                </p>
              </div>
              <div className="flex justify-center mt-4">
                <button onClick={handleCheckout} className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 text-white px-4 py-2 rounded-md hover:opacity-90 w-auto">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center w-full mt-10">
            <img className='h-[300px] md:h-[400px] object-cover' src={empty} alt="" />
            <p className="text-gray-500 text-center text-3xl font-bold mt-5 mb-4">Your cart is empty.</p>
            <Link to={'/shop'}>
              <button className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 text-white px-6 py-2 rounded-md hover:opacity-90 mt-6">
                Continue Shopping
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}