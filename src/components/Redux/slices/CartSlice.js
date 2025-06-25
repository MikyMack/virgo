  import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
  import api from "../../../utils/axios";

  const API_URL = '/cart';

  const calculateTotals = (items) => {
    const totalItems = items.reduce((sum, item) => sum + (item.quantity || 1), 0);
    const subtotal = items.reduce((sum, item) => {
   
      const product = item.product || item.productData;
      const price = product ? (product.basePrice ?? product.price) : (item.basePrice || item.price || 0);
      return sum + price * (item.quantity || 1);
    }, 0);
    const shipping = subtotal >= 900 ? 0 : 50;
    const total = subtotal + shipping;
    
    return { totalItems, subtotal, shipping, total };
  };


  const generateGuestItemId = (productId, variant) => {
    const variantStr = variant ? JSON.stringify(variant) : 'no-variant';
    return `guest-${productId}-${btoa(variantStr)}`;
  };


function isSameVariant(a, b) {
  if (!a && !b) return true;
  if (!a || !b) return false;
  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);
  if (aKeys.length !== bKeys.length) return false;
  for (let key of aKeys) {
    if (a[key] !== b[key]) return false;
  }
  return true;
}

export const syncGuestCart = createAsyncThunk(
  'cart/syncGuestCart',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const guestCart = JSON.parse(localStorage.getItem('guestCart') || '[]');
      if (guestCart.length === 0) {
        return { success: true, message: 'No guest cart items to sync' };
      }
     
      const serverCartResponse = await api.get(API_URL);
      const serverCart = serverCartResponse.data.cart || [];
  
      const requests = [];
      for (const guestItem of guestCart) {
       
        const match = serverCart.find(serverItem =>
          serverItem.product._id === guestItem.productId &&
          isSameVariant(serverItem.variant, guestItem.variant)
        );
        if (match) {
         
          const newQuantity = (match.quantity || 0) + (guestItem.quantity || 0);
        
          if (newQuantity !== match.quantity && newQuantity > 0) {
            requests.push(
              api.post(`${API_URL}/add`, {
                productId: guestItem.productId,
                variant: guestItem.variant,
                quantity: newQuantity - match.quantity 
              })
            );
          }
        } else {
          
          if (guestItem.quantity > 0) {
            requests.push(
              api.post(`${API_URL}/add`, {
                productId: guestItem.productId,
                variant: guestItem.variant,
                quantity: guestItem.quantity
              })
            );
          }
        }
      }
      await Promise.all(requests);
      localStorage.removeItem('guestCart');
      await dispatch(fetchCartItems());
      return { success: true, message: 'Guest cart synced successfully' };
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data?.message || 'Failed to sync guest cart',
        status: error.response?.status
      });
    }
  }
);

  export const fetchCartItems = createAsyncThunk(
    'cart/fetchCartItems',
    async (_, { rejectWithValue }) => {
      try {
        const token = localStorage.getItem('token');
        
        if (token) {
       
          const response = await api.get(API_URL);
          return {
            items: response.data.cart || [],
            ...calculateTotals(response.data.cart || [])
          };
        } else {
         
          const guestCart = JSON.parse(localStorage.getItem('guestCart') || '[]');
          
         
          const formattedItems = guestCart.map(item => ({
            _id: generateGuestItemId(item.productId, item.variant),
            productId: item.productId,
            product: item.productData, 
            productData: item.productData,
            variant: item.variant,
            quantity: item.quantity
          }));
          
          return {
            items: formattedItems,
            ...calculateTotals(formattedItems)
          };
        }
      } catch (error) {
        return rejectWithValue({
          message: error.response?.data?.message || 'Failed to fetch cart items',
          status: error.response?.status
        });
      }
    }
  );

  export const addToCart = createAsyncThunk(
    'cart/addToCart',
    async ({ productId, variant, quantity, productData }, { dispatch, rejectWithValue }) => {
      try {
        const token = localStorage.getItem('token');
        const variantToSend = variant && typeof variant === 'object' ? {
          ...(variant.color && { color: variant.color }),
          ...(variant.size && { size: variant.size })
        } : undefined;

        if (token) {
        
          const payload = {
            productId,
            quantity,
          };
          
          if (variantToSend) payload.variant = variantToSend;

          const response = await api.post(`${API_URL}/add`, payload);
          

          if (response.data && response.data.token) {
            localStorage.setItem('token', response.data.token);
          }
          
  
          await dispatch(fetchCartItems());
          
          return { success: true, isGuest: false };
        } else {
      
          const guestCart = JSON.parse(localStorage.getItem('guestCart') || '[]');
          
     
          const existingIndex = guestCart.findIndex(item => 
            item.productId === productId && 
            JSON.stringify(item.variant || {}) === JSON.stringify(variantToSend || {})
          );
          
          if (existingIndex >= 0) {
          
            guestCart[existingIndex].quantity += quantity;
          } else {
           
            guestCart.push({
              productId,
              variant: variantToSend,
              quantity,
              productData: {
                ...productData,
                _id: productData._id || productId,
                name: productData.name,
                basePrice: productData.basePrice || productData.price,
                images: productData.images || [productData.image]
              }
            });
          }
          
          localStorage.setItem('guestCart', JSON.stringify(guestCart));
          
 
          await dispatch(fetchCartItems());
          
          return { success: true, isGuest: true };
        }
      } catch (error) {
        return rejectWithValue({
          message: error.response?.data?.message || 'Failed to add item to cart',
          status: error.response?.status
        });
      }
    }
  );

  export const updateCartItem = createAsyncThunk(
    'cart/updateCartItem',
    async ({ productId, variant, quantity }, { dispatch, rejectWithValue }) => {
      try {
        const token = localStorage.getItem('token');
        
        if (!token) {
     
          const guestCart = JSON.parse(localStorage.getItem('guestCart') || '[]');
          const itemIndex = guestCart.findIndex(item => 
            item.productId === productId && 
            JSON.stringify(item.variant || {}) === JSON.stringify(variant || {})
          );
          
          if (itemIndex !== -1) {
            guestCart[itemIndex].quantity += quantity; 
            if (guestCart[itemIndex].quantity <= 0) {
              guestCart.splice(itemIndex, 1); 
            }
            localStorage.setItem('guestCart', JSON.stringify(guestCart));
            await dispatch(fetchCartItems());
          }
          
          return { success: true };
        }
        
     
        const payload = { productId, quantity };
        if (variant) payload.variant = variant;
        
        
        await api.post(`${API_URL}/add`, payload);
        await dispatch(fetchCartItems());
        
        return { success: true };
      } catch (error) {
        return rejectWithValue({
          message: error.response?.data?.message || 'Failed to update cart item',
          status: error.response?.status
        });
      }
    }
  );

  export const removeCartItem = createAsyncThunk(
    'cart/removeCartItem',
    async (id, { rejectWithValue, dispatch }) => {
      try {
        const token = localStorage.getItem('token');
        
        if (!token) {
        
          const guestCart = JSON.parse(localStorage.getItem('guestCart') || '[]');
          
         
          const updatedCart = guestCart.filter(item => {
            const guestItemId = generateGuestItemId(item.productId, item.variant);
            return guestItemId !== id && item.productId !== id;
          });
          
          localStorage.setItem('guestCart', JSON.stringify(updatedCart));
          await dispatch(fetchCartItems());
          
          return id;
        }
        
    
        await api.delete(`${API_URL}/${id}`);
        return id;
      } catch (error) {
        return rejectWithValue({
          message: error.response?.data?.message || 'Failed to remove item from cart',
          status: error.response?.status
        });
      }
    }
  );

  export const clearCart = createAsyncThunk(
    'cart/clearCart',
    async (_, { rejectWithValue, dispatch }) => {
      try {
        const token = localStorage.getItem('token');
        
        if (!token) {
      
          localStorage.removeItem('guestCart');
          await dispatch(fetchCartItems());
          return [];
        }
        
    
        await api.delete(API_URL);
        return [];
      } catch (error) {
        return rejectWithValue({
          message: error.response?.data?.message || 'Failed to clear cart',
          status: error.response?.status
        });
      }
    }
  );

  const cartSlice = createSlice({
    name: 'cart',
    initialState: {
      items: [],
      status: 'idle', 
      error: null,
      totalItems: 0,
      subtotal: 0,
      shipping: 0,
      total: 0
    },
    reducers: {
      resetCartStatus: (state) => {
        state.status = 'idle';
        state.error = null;
      }
    },
    extraReducers: (builder) => {
      const handlePending = (state) => {
        state.status = 'loading';
        state.error = null;
      };

      const handleRejected = (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message || 'An error occurred';
      };

      const updateCartState = (state, items) => {
        state.items = items;
        const totals = calculateTotals(items);
        state.totalItems = totals.totalItems;
        state.subtotal = totals.subtotal;
        state.shipping = totals.shipping;
        state.total = totals.total;
      };

      builder
      
        .addCase(syncGuestCart.pending, handlePending)
        .addCase(syncGuestCart.fulfilled, (state) => {
          state.status = 'succeeded';
        })
        .addCase(syncGuestCart.rejected, handleRejected)
        
  
        .addCase(fetchCartItems.pending, handlePending)
        .addCase(fetchCartItems.fulfilled, (state, action) => {
          state.status = 'succeeded';
          updateCartState(state, action.payload.items);
        })
        .addCase(fetchCartItems.rejected, handleRejected)
        
  
        .addCase(addToCart.pending, handlePending)
        .addCase(addToCart.fulfilled, (state) => {
          state.status = 'succeeded';
        })
        .addCase(addToCart.rejected, handleRejected)
        
   
        .addCase(updateCartItem.pending, handlePending)
        .addCase(updateCartItem.fulfilled, (state) => {
          state.status = 'succeeded';
        })
        .addCase(updateCartItem.rejected, handleRejected)
        
     
        .addCase(removeCartItem.pending, handlePending)
        .addCase(removeCartItem.fulfilled, (state, action) => {
          state.status = 'succeeded';
          const newItems = state.items.filter(item => item._id !== action.payload);
          updateCartState(state, newItems);
        })
        .addCase(removeCartItem.rejected, handleRejected)
        

        .addCase(clearCart.pending, handlePending)
        .addCase(clearCart.fulfilled, (state) => {
          state.status = 'succeeded';
          updateCartState(state, []);
        })
        .addCase(clearCart.rejected, handleRejected);
    }
  });

  export const { resetCartStatus } = cartSlice.actions;
  export default cartSlice.reducer;