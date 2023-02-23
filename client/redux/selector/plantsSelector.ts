import { RootState } from "../store";

export const selectPlantLoading = (state: RootState) => {
  return state?.plant?.loading;
};

export const selectPlantError = (state: RootState) => {
  return state?.plant?.error;
};

export const selectPlantUpdate = (state: RootState) => {
  return state?.plant?.isUpdated;
};

export const selectAllPlant = (state: RootState) => {
  return state?.plant?.allPlantRes?.allPlant;
};

export const selectPlant = (state: RootState) => {
  return state?.plant?.plantData?.plant;
};
