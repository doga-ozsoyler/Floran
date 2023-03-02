import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AsyncStorege from "@react-native-async-storage/async-storage";
import axios from "axios";
import { AuthState, AuthSigninProps, AuthSignupProps } from "../types";

const SERVER_URL = "http://192.168.1.4:3939/api";

export const signin = createAsyncThunk(
  "auth/signin",
  async (signinData: AuthSigninProps, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${SERVER_URL}/auth/signin`,
        signinData
      );

      await AsyncStorege.setItem("Token", JSON.stringify(data));
      return data;
    } catch (error: any) {
      return rejectWithValue({
        message: error.response.data.message,
        success: error.response.data.success,
        status: error.response.status,
      });
    }
  }
);

export const signup = createAsyncThunk(
  "auth/signup",
  async (signupData: AuthSignupProps, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${SERVER_URL}/auth/signup`,
        signupData
      );

      return data;
    } catch (error: any) {
      return rejectWithValue({
        message: error.response.data.message,
        success: error.response.data.success,
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
  signupRes: null,
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
    builder.addCase(signup.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signup.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.signupRes = action.payload;
    });
    builder.addCase(signup.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.signupRes = null;
    });
  },
});

export default authSlice.reducer;
