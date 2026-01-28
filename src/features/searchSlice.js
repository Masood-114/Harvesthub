import config from "../services/config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const Api = config.SEARCH_API_URL;
export const searchApi = createAsyncThunk(
  "serach/searchApi",
  async (query, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${Api}${query}`);
      return response.data.meals;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const initialState = {
  items: [],
  status: "idle",
  error: null,
  query: "",
};

const searchSlice = createSlice({
  name: "serach",
  initialState,
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
    },
    clearSearch: (state, action) => {
      ((state.query = ""), (state.items = []));
    },
  },
  extraReducers: (bulider) => {
    bulider
      .addCase(searchApi.pending, (state) => {
        state.status = "loading";
      })
      .addCase(searchApi.fulfilled, (state, action) => {
        state.status = "success";
        state.items = action.payload;
      })
      .addCase(searchApi.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { setQuery, clearSearch } = searchSlice.actions;
export default searchSlice.reducer;
