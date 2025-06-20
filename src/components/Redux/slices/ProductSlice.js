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
      let products = [];
      let pagination;

      if (Array.isArray(response.data)) {
        products = response.data;
        const total = parseInt(response.headers?.['x-total-count']) || products.length;
        const limit = params.limit || 12;
        const page = params.page || 1;
        pagination = {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit)
        };
      } else if (Array.isArray(response.data.products)) {
        products = response.data.products;
        if (response.data.pagination) {
          pagination = { ...response.data.pagination };
        } else {
          const total = parseInt(response.headers?.['x-total-count']) || products.length;
          const limit = params.limit || 12;
          const page = params.page || 1;
          pagination = {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit)
          };
        }
      }

      return {
        data: products,
        pagination,
        filters: { ...params }
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
  }
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
  state.shopProducts = Array.isArray(action.payload.data) ? action.payload.data : [];
  state.pagination = action.payload.pagination || { ...initialState.pagination };
})
      .addCase(fetchShopProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearProducts } = productSlice.actions;
export default productSlice.reducer;