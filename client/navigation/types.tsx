import type { CompositeNavigationProp } from "@react-navigation/native";
import type { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import type { StackNavigationProp } from "@react-navigation/stack";
import { PlantScreenI } from "../screens/types";

export type StackParamList = {
  Plants: undefined;
  "My Plants": undefined;
  "Sign in": undefined;
  "Sign up": undefined;
  Profile: undefined;
  Reminders: undefined;
  Plant: PlantScreenI;
  "Plants You Add": undefined;
  "Update Info": undefined;
  "Add Plant": undefined;
};

export type TabParamList = {
  AllPlantsTab: undefined;
  MyPlantsTab: undefined;
  RemindersTab: undefined;
  ProfileTab: undefined | { screen: string };
};

export type generalScreenProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList>,
  StackNavigationProp<StackParamList>
>;
