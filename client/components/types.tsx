import { Dispatch, SetStateAction } from "react";
import { plantData } from "../redux/types";

export interface PasswordVisibilityI {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
}

export interface FormControllerI {
  label: string;
  message: string;
  errorMessageShow: boolean;
  value: string;
  onChangeText: ((text: string) => void) | undefined;
  type?: "password" | "text";
  InputRightElement?: JSX.Element | JSX.Element[];
}

export interface SearchBarI {
  setSearch: Dispatch<SetStateAction<string>>;
}

export interface PressablePlantCardI {
  plantData: plantData;
}

export interface LandingI {
  children: string | JSX.Element | JSX.Element[];
}
