import { RootState } from "../store";

export const selectToken = (state: RootState) => {
  return state?.auth?.token;
};
