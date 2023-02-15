import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { UserRes, AuthState, UserState } from "../../types";
import { RootState } from "../store";

const SERVER_URL = "http://192.168.1.2:3939/api";

export const fetchUser = createAsyncThunk<UserRes>(
  "user/fetchUser",
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.token;

      const { data } = await axios.get(`${SERVER_URL}/user/get`, {
        headers: {
          authorization: token,
        },
      });

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
  userRes: null,
} as UserState;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.userRes = action?.payload;
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.error;
    });
  },
});

export default userSlice.reducer;
