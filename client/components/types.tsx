import { AsyncThunkAction, AsyncThunkPayloadCreator } from "@reduxjs/toolkit";
import { Dispatch, SetStateAction } from "react";
import { plantData, UserRes } from "../redux/types";

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

export interface AddRemovePlantButtonI {
  plantID?: string;
}

export interface ValueBarI {
  header: string;
  value?: number;
  valueObject: { [key: number]: string };
}
export interface InfoHeaderTextI {
  header: string;
  text: string;
}

export interface BasicButtonI {
  iconLib: any;
  iconName: string;
  onPress: () => void;
  discription: string;
}

export interface ChildrenI {
  children: string | JSX.Element | JSX.Element[];
}

export interface PlantListI {
  isUpdate: boolean;
  list: plantData[] | undefined;
  fetchAction: AsyncThunkAction<UserRes, void, any>;
}