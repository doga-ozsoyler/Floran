import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { PlantState, allPlantRes, PlantRes } from "../types";

const SERVER_URL = "http://192.168.100.89:3939/api";

export const fetchAllPlant = createAsyncThunk<allPlantRes>(
  "plant/fetchAllPlant",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${SERVER_URL}/plant/all`);
      console.log(data);

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchPlant = createAsyncThunk(
  "plant/fetchPlant",
  async (plantID: string, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${SERVER_URL}/plant/get/${plantID}`);
      console.log("data");
      console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  loading: false,
  error: null,
  isUpdated: false,
  allPlantRes: null,
  plantData: null,
} as PlantState;

const plantSlice = createSlice({
  name: "plant",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllPlant.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAllPlant.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.allPlantRes = action?.payload;
    });
    builder.addCase(fetchAllPlant.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.error;
    });
    builder.addCase(fetchPlant.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchPlant.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.plantData = action?.payload;
    });
    builder.addCase(fetchPlant.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.error;
    });
  },
});

export default plantSlice.reducer;
