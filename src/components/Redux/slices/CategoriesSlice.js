import { createSlice,createAsyncThunk  } from "@reduxjs/toolkit";
import { getPrimaryCategories, getSecondaryCategories,getTertiaryCategories} from "../../../actions/adminactions/categories/categoriesactions";





export const fetchPrimaryCategories = createAsyncThunk(
  "categories/fetchPrimary",
  async () => {
    const data = await getPrimaryCategories();
    return data;
  }
);

export const fetchSecondaryCategories = createAsyncThunk(
  "categories/fetchSecondary",
  async () => {
    const data = await getSecondaryCategories();
    return data;
  }
);

export const fetchTertiaryCategories = createAsyncThunk(
  "categories/fetchTertiary",
  async () => {
    const data = await getTertiaryCategories();
    return data;
  }
);
const initialState = {
  primary: [],
  secondary: [],
  tertiary: [],
  loading: false,
  error: null,
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Primary Categories
      .addCase(fetchPrimaryCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPrimaryCategories.fulfilled, (state, action) => {
        state.primary = action.payload;
        state.loading = false;
      })
      .addCase(fetchPrimaryCategories.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })

      // Secondary Categories (repeat pattern)
      .addCase(fetchSecondaryCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSecondaryCategories.fulfilled, (state, action) => {
        state.secondary = action.payload;
        state.loading = false;
      })
      .addCase(fetchSecondaryCategories.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })

      // Tertiary Categories (repeat pattern)
      .addCase(fetchTertiaryCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTertiaryCategories.fulfilled, (state, action) => {
        state.tertiary = action.payload;
        state.loading = false;
      })
      .addCase(fetchTertiaryCategories.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export default categoriesSlice.reducer;