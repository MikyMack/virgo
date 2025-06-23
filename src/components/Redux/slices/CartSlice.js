import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from "../../../utils/axios";


const API_URL = '/cart';


const calculateTotals = (items) => {
  const totalItems = items.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const subtotal = items.reduce((sum, item) => {
    const price =
      (item.product && (item.product.basePrice ?? item.product.price)) ||
      (item.productData && (item.productData.basePrice ?? item.productData.price)) ||
      item.basePrice ||
      item.price ||
      0;
    return sum + price * (item.quantity || 1);
  }, 0);
  const shipping = subtotal >= 900 ? 0 : 50;
  const total = subtotal + shipping;
  
  return { totalItems, subtotal, shipping, total };
};


export const fetchCartItems = createAsyncThunk(
  'cart/fetchCartItems',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(API_URL);
          console.log('cart api:',response.data);
          
      return {
      items: response.data.cart || [],
      ...calculateTotals(response.data.cart || [])
      };
 
      
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
  async ({ productId, variant, quantity }, { dispatch, rejectWithValue }) => {
    try {
      // Only send the selected variant options (color, size, etc.)
      const variantToSend = variant && typeof variant === 'object' ? {
        ...(variant.color && { color: variant.color }),
        ...(variant.size && { size: variant.size })
      } : undefined;
      const payload = {
        productId,
        quantity
      };
      if (variantToSend) payload.variant = variantToSend;

      // Capture the response
      const response = await api.post(`${API_URL}/add`, payload);

      // Store the new token if present
      if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token);
      }

      // After successful add, fetch the updated cart
      await dispatch(fetchCartItems());
      return { success: true };
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
  async ({ id, productId, variant, quantity }, { rejectWithValue }) => {
    try {
      // Only send the required fields to the API
      const variantToSend = variant && typeof variant === 'object' ? {
        ...(variant.color && { color: variant.color }),
        ...(variant.size && { size: variant.size })
      } : undefined;
      const payload = {
        productId,
        quantity
      };
      if (variantToSend) payload.variant = variantToSend;
      const response = await api.patch(`${API_URL}/${id}`, payload);
      return response.data;
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
  async (id, { rejectWithValue }) => {
    try {
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
  async (_, { rejectWithValue }) => {
    try {
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
 
      .addCase(fetchCartItems.pending, handlePending)
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.status = 'succeeded';
        updateCartState(state, action.payload.items);
      })
      .addCase(fetchCartItems.rejected, handleRejected)
      
     
      .addCase(addToCart.pending, handlePending)
      .addCase(addToCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
       
      })
      .addCase(addToCart.rejected, handleRejected)
      
    
      .addCase(updateCartItem.pending, handlePending)
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const newItems = state.items.map(item => 
          item._id === action.payload._id ? action.payload : item
        );
        updateCartState(state, newItems);
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