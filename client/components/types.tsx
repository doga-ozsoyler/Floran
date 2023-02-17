import { Dispatch, SetStateAction } from "react";

export interface PasswordVisibilityI {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
}
