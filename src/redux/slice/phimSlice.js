// rxslice
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { quanLyPhimServ } from "../../services/quanLyPhim";
import { handleTurnOffLoading, handleTurnOnLoading } from "./loadingSlice";

const initialState = {
  arrMovie: [],
  arrBanner: [],
};
//

// movielist
export const getAllMovieThunk = createAsyncThunk(
  "quanLyPhim/getAllMovieThunk",
  async (dataLocal, { _, dispatch }) => {
    const res = await quanLyPhimServ.getAllMovie();
    return res.data.content;
  }
);


const phimSlice = createSlice({
  name: "quanLyPhim",
  initialState,
  reducers: {
    handleAllMovie: (state, action) => {
      state.arrMovie = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllMovieThunk.fulfilled, (state, action) => {
      state.arrMovie = action.payload;
    });
  },
});

export const { handleAllMovie } = phimSlice.actions;

export default phimSlice.reducer;
