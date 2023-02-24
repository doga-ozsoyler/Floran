export interface SigninRes {
  success: boolean;
  message: string;
  token?: string;
}
export interface SignupRes {
  success: boolean;
  message: string;
}

export interface AuthSigninProps {
  email: string;
  password: string;
}

export interface AuthState {
  loading: boolean;
  error: any;
  token: string | null;
  signinRes: SigninRes | null;
  signupRes: SignupRes | null;
}

export interface AuthSignupProps {
  nickname: string;
  email: string;
  password: string;
}

export interface ReminderData {
  _id: string;
  plant: string;
  repeat: number;
  time: Date;
}

export interface plantData {
  _id: string;
  fertilizer: number;
  name: string;
  petFriendly: boolean;
  picture: string;
  sunExposure: number;
  whenToWater: {
    min: number;
    max: number;
  };
}

export interface UserRes {
  user?: {
    _id: string;
    nickname: string;
    email: string;
    plants: plantData[];
    reminders: ReminderData[];
    addedPlants: plantData[];
  };
  message: string;
  success: boolean;
}

export interface UserState {
  loading: boolean;
  error: any;
  isUpdated: boolean;
  userRes: UserRes | null;
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
  plantData: PlantRes | null;
}

export interface PlantRes {
  plant?: plantData;
  message: string;
  success: boolean;
}
