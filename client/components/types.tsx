import { Dispatch, SetStateAction } from "react";

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
