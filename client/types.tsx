import { Dispatch, FC, SetStateAction } from "react";

export interface plantData {
  _id: string;
  fertilizer: number;
  name: string;
  petFriendly: boolean;
  picture: string;
  sunExposure: number;
}
export interface allPlantRes {
  allPlant?: plantData[];
  message: string;
  success: boolean;
}
export interface PlantState {
  loading: boolean;
  error: any;
  isUpdated: boolean;
  allPlantRes: allPlantRes | null;
  plantData: {} | null;
}

export interface MyKnownError {
  errorMessage: string;
}

export interface TabScreenI {
  title: string;
  iconLib: any;
  icon: string;
  outlineIcon: string;
  component: FC;
}

export interface SearchBarI {
  setSearch: Dispatch<SetStateAction<string>>;
}

export interface PressablePlantCardI {
  plantData: plantData;
}
