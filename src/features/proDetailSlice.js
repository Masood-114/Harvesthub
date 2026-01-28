import axios from "axios";
import config from "../services/config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const api = config.DETAILS_API_URL;
export const fetchProductDetail = createAsyncThunk(
  "detail/fetchProductDetail",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${api}${productId}`);
      const data = await response.data.meals[0];
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const initialState = {
  meal: null,
  status: "idle",
  error: null,
};
const productDetail = createSlice({
  name: "detail",
  initialState,
  reducers: {
    clearMeal: (state) => {
      state.meal = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductDetail.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductDetail.fulfilled, (state, action) => {
        state.status = "success";
        state.meal = action.payload;
      })
      .addCase(fetchProductDetail.rejected, (state) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});
export const { clearMeal } = productDetail.actions;
export default productDetail.reducer;
