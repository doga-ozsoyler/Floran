import { Dispatch, SetStateAction } from "react";

export interface PasswordVisibilityI {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
}

export interface FormControllerI {
  label: string;
  message: string;
  errorMessageShow: boolean;
  children: string | JSX.Element | JSX.Element[];
}
