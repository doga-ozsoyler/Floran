import React from "react";
import HeaderBackArraw from "./HeaderBackArraw";
import HeaderAddPlantButton from "./HeaderAddPlantButton";

import {
  createStackNavigator,
  StackNavigationOptions,
} from "@react-navigation/stack";

import AllPlantsScreen from "../screens/AllPlantsScreen";
import MyPlantsScreen from "../screens/MyPlantsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import RemindersScreen from "../screens/RemindersScreen";
import SigninScreen from "../screens/SigninScreen";
import { StackParamList } from "./types";

const Stack = createStackNavigator<StackParamList>();

const screenOptionStyle: StackNavigationOptions = {
  headerLeft: () => <HeaderBackArraw />,
  headerRight: () => <HeaderAddPlantButton />,
  headerTintColor: "green",
  headerTitleStyle: {
    fontWeight: "bold",
  },
};

const AllPlantsStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Plants" component={AllPlantsScreen} />
    </Stack.Navigator>
  );
};

const MyPlantStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="My Plants" component={MyPlantsScreen} />
      <Stack.Screen name="Signin" component={SigninScreen} />
    </Stack.Navigator>
  );
};

const ProfileStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
};

const RemindersStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Reminders" component={RemindersScreen} />
    </Stack.Navigator>
  );
};

export {
  AllPlantsStackNavigator,
  MyPlantStackNavigator,
  ProfileStackNavigator,
  RemindersStackNavigator,
};
