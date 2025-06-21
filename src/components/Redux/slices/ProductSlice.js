import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAllProductsFilterd, getshopProducts } from '../../../actions/adminactions/products/productsaction';

// Thunk for all products (home page, tabs)
export const fetchAllProducts = createAsyncThunk(
  'products/fetchAllProducts',
  async (params = { type: 'all' }, { rejectWithValue }) => {
    try {
      const products = await getAllProductsFilterd(params);
      if (!products || products.length === 0) {
        throw new Error('No products found');
      }
      return products;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk for shop products (with filters, pagination, etc)
export const fetchShopProducts = createAsyncThunk(
  'products/fetchShopProducts',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await getshopProducts(params);
      
      // Default values
      let products = [];
      let pagination = {
        page: params.page || 1,
        limit: params.limit || 12,
        total: 0,
        totalPages: 1
      };
      console.log('slice:',response);
      

      // Handle different response structures
      if (Array.isArray(response.data)) {
        // If response.data is directly an array
        products = response.data;
        pagination.total = parseInt(response.headers?.['x-total-count']) || products.length;
        pagination.totalPages = Math.ceil(pagination.total / pagination.limit);
      } else if (response.data && Array.isArray(response.data.products)) {
        // If response has products array and pagination data
        products = response.data.products;
        if (response.data.pagination) {
          pagination = {
            ...pagination, // Keep our defaults
            ...response.data.pagination // Override with API pagination
          };
        } else {
          // Fallback if no pagination object but has products
          pagination.total = products.length;
          pagination.totalPages = Math.ceil(products.length / pagination.limit);
        }
      }

      return {
        products,
        pagination,
        filters: params
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
        error.message ||
        'Failed to fetch shop products'
      );
    }
  }
);

const initialState = {
  allProducts: [],
  shopProducts: [],
  productType: 'all',
  loading: false,
  error: null,
  pagination: {
    page: 1,
    limit: 12,
    total: 0,
    totalPages: 1
  },
  filters: {}
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearProducts: (state) => {
      state.allProducts = [];
      state.shopProducts = [];
      state.error = null;
      state.pagination = { ...initialState.pagination };
      state.filters = {};
    },
    setPage: (state, action) => {
      state.pagination.page = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // All Products (home/tabs)
      .addCase(fetchAllProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.allProducts = Array.isArray(action.payload) ? action.payload : [];
        state.productType = action.meta.arg?.type || 'all';
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Shop Products (with filters)
      .addCase(fetchShopProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchShopProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.shopProducts = action.payload.products;
        state.pagination = action.payload.pagination;
        state.filters = action.payload.filters;
      })
      .addCase(fetchShopProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearProducts, setPage } = productSlice.actions;
export default productSlice.reducer;