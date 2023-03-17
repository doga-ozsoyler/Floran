import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import axios from "axios";
import { UserResI, UserStateI, UserUpdateInfoPropsI } from "../types";
import { RootState } from "../store";

const SERVER_URL = "http://192.168.100.86:3939/api";
const updatedUser = createAction("user/update");

export const fetchUser = createAsyncThunk<UserResI>(
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

export const updateUserInfo = createAsyncThunk(
  "user/updateUserInfo",
  async (
    updateInfoData: UserUpdateInfoPropsI,
    { rejectWithValue, getState, dispatch }
  ) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.token;

      const { data } = await axios.put(
        `${SERVER_URL}/user/update/info`,
        updateInfoData,
        {
          headers: {
            authorization: token,
          },
        }
      );

      dispatch(updatedUser());
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
  isUpdated: false,
  userRes: null,
  infoUpdateRes: null,
} as UserStateI;

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
    builder.addCase(updateUserInfo.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateUserInfo.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.infoUpdateRes = action?.payload;
      state.isUpdated = false;
    });
    builder.addCase(updateUserInfo.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.error;
      state.userRes = null;
    });
  },
});

export default userSlice.reducer;
