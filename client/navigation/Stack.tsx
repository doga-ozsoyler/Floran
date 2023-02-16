import React from "react";

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
  headerShown: false,
};

const AllPlantsStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="AllPlantsScreen" component={AllPlantsScreen} />
    </Stack.Navigator>
  );
};

const MyPlantStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="MyPlantScreen" component={MyPlantsScreen} />
      <Stack.Screen name="SigninScreen" component={SigninScreen} />
    </Stack.Navigator>
  );
};

const ProfileStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
    </Stack.Navigator>
  );
};

const RemindersStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="RemindersScreen" component={RemindersScreen} />
    </Stack.Navigator>
  );
};

export {
  AllPlantsStackNavigator,
  MyPlantStackNavigator,
  ProfileStackNavigator,
  RemindersStackNavigator,
};
