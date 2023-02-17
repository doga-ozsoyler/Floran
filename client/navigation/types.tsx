import type { CompositeNavigationProp } from "@react-navigation/native";
import type { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import type { StackNavigationProp } from "@react-navigation/stack";

export type StackParamList = {
  Plants: undefined;
  "My Plants": undefined;
  "Sign in": undefined;
  Profile: undefined;
  Reminders: undefined;
};

export type TabParamList = {
  AllPlantsTab: undefined;
  MyPlantsTab: undefined;
  RemindersTab: undefined;
  ProfileTab: undefined;
};

export type generalScreenProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList>,
  StackNavigationProp<StackParamList>
>;
