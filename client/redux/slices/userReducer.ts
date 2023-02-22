import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import axios from "axios";
import { UserRes, UserState } from "../types";
import { RootState } from "../store";

const SERVER_URL = "http://192.168.1.2:3939/api";
const updatedUser = createAction("user/update");

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

export const ownPlant = createAsyncThunk(
  "user/ownPlant",
  async (plantID: string, { rejectWithValue, getState, dispatch }) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.token;

      const { data } = await axios.put(
        `${SERVER_URL}/user/own/plants`,
        { plantID: plantID },
        {
          headers: {
            authorization: token,
          },
        }
      );
      console.log("here");

      dispatch(updatedUser());
      return data;
    } catch (error) {
      console.log("error");
      console.log(error);
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
    builder.addCase(updatedUser, (state) => {
      state.isUpdated = true;
    });
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
    builder.addCase(ownPlant.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(ownPlant.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.userRes = action?.payload;
      state.isUpdated = false;
    });
    builder.addCase(ownPlant.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.error;
      state.userRes = null;
    });
  },
});

export default userSlice.reducer;
