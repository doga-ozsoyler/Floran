export interface BaseRespondI {
  success: boolean;
  message: string;
}

export interface SigninResI extends BaseRespondI {
  token?: string;
}

export interface AuthSigninPropsI {
  email: string;
  password: string;
}

export interface AuthStateI {
  loading: boolean;
  error: any;
  token: string | null;
  signinRes: SigninResI | null;
  signupRes: BaseRespondI | null;
}

export interface AuthSignupPropsI {
  nickname: string;
  email: string;
  password: string;
}

export interface ReminderDataI {
  _id: string;
  plant: string;
  repeat: number;
  time: Date;
}

export interface plantDataI {
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

export interface UserResI extends BaseRespondI {
  user?: {
    _id: string;
    nickname: string;
    email: string;
    plants: plantDataI[];
    reminders: ReminderDataI[];
    addedPlants: plantDataI[];
  };
}

export interface UserStateI {
  loading: boolean;
  error: any;
  isUpdated: boolean;
  userRes: UserResI | null;
  infoUpdateRes: BaseRespondI | null;
}

export interface allPlantResI extends BaseRespondI {
  allPlant?: plantDataI[];
}
export interface PlantStateI {
  loading: boolean;
  error: any;
  isUpdated: boolean;
  allPlantRes: allPlantResI | null;
  plantData: PlantResI | null;
}

export interface PlantResI extends BaseRespondI {
  plant?: plantDataI;
}

export interface UserUpdateInfoPropsI {
  nickname?: string;
  email?: string;
}
