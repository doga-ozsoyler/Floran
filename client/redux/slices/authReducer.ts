import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AsyncStorege from "@react-native-async-storage/async-storage";
import axios from "axios";
import type { AxiosRequestHeaders } from "axios";
import { AuthState } from "../types";

const SERVER_URL = "http://192.168.1.2:3939/api";

export const signin = createAsyncThunk(
  "auth/signin",
  async (
    signinData: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.post(
        `${SERVER_URL}/auth/signin`,
        signinData
      );

      await AsyncStorege.setItem("Token", JSON.stringify(data));
      return data;
    } catch (error: any) {
      return rejectWithValue({
        data: error.response.data,
        status: error.response.status,
      });
    }
  }
);

const initialState = {
  loading: false,
  error: null,
  token: null,
  signinRes: null,
} as AuthState;

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(signin.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signin.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.token = action.payload.token;
      state.signinRes = action.payload;
    });
    builder.addCase(signin.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.signinRes = null;
    });
  },
});

export default authSlice.reducer;
