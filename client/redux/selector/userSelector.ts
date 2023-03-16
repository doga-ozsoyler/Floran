import { RootState } from "../store";

export const selectUserLoading = (state: RootState) => {
  return state?.user?.loading;
};

export const selectUserError = (state: RootState) => {
  return state?.user?.error;
};

export const selectUserUpdate = (state: RootState) => {
  return state?.user?.isUpdated;
};

export const selectUser = (state: RootState) => {
  return state?.user?.userRes;
};

export const selectUserPlants = (state: RootState) => {
  return state?.user?.userRes?.user?.plants;
};

export const selectPlantsUserAdd = (state: RootState) => {
  return state?.user?.userRes?.user?.addedPlants;
};
