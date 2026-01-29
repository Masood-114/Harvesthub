import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import config from "../services/config";
import axios from "axios";
const apiVeggie = config.VEGGIE_API_URL;
const apiCateFilter = config.CATEGORY_FILTER_API_URL;

export const fetchVeggies = createAsyncThunk(
  "veggies/fetchVeggies",
  async (categoryName, { rejectWithValue }) => {
    try {
      const url =
        categoryName === "All" ? apiVeggie : `${apiCateFilter}${categoryName}`;
      const response = await axios.get(url);
      const data = (await response.data?.meals) || [];
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const initialState = {
  items: [],
  status: "idle",
  error: null,
  activeCategory: "All",
};
const veggieSlice = createSlice({
  name: "veggies",
  initialState,
  reducers: {
    addVeggie: (state, action) => {
      state.items.push(action.payload);
    },
    updateVeggie: (state, action) => {
      let updateVeg = action.payload;
      state.items = state.items.map((item) =>
        item.idMeal === updateVeg.mealId ? updateVeg : item,
      );
    },
    deleteVeggie: (state, action) => {
      state.items = state.items.filter(
        (item) => item.idMeal !== action.payload,
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVeggies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchVeggies.fulfilled, (state, action) => {
        state.status = "success";
        state.items = action.payload;
      })
      .addCase(fetchVeggies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { addVeggie, deleteVeggie, updateVeggie } = veggieSlice.actions;
export default veggieSlice.reducer;
