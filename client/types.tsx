import { FC } from "react";

export interface allPlantRes {
  allPlant?: {
    _id: string;
    fertilizer: number;
    name: string;
    petFriendly: boolean;
    picture: string;
    sunExposure: number;
  }[];
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
