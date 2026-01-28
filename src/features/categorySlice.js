import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../services/config";
const api = config.CATEGORY_API_URL;

export const fetchCategory = createAsyncThunk(
  "category/fetchCategory",
  async () => {
    try {
      const response = await axios.get(api);
      const data = await response.data.categories;
      return data;
    } catch (error) {
      return error.message;
    }
  },
);

const initialState = {
  items: [],
  activeCategory: "All",
  status: "idle",
  error: null,
};
const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setActiveCategory: (state, action) => {
      console.log(action.payload);

      state.activeCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategory.fulfilled, (state, action) => {
        ((state.status = "success"), (state.items = action.payload));
      })
      .addCase(fetchCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { setActiveCategory } = categorySlice.actions;
export default categorySlice.reducer;
