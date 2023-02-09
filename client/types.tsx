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
