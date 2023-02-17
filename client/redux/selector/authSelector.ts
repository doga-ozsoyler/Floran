import { RootState } from "../store";

export const selectToken = (state: RootState) => {
  return state?.auth?.token;
};

export const selectAuthLoading = (state: RootState) => {
  return state?.auth?.loading;
};

export const selectAuthError = (state: RootState) => {
  return state?.auth?.error;
};

export const selectSigninRes = (state: RootState) => {
  return state?.auth?.signinRes;
};
