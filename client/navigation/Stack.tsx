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
import SignupScreen from "../screens/SignupScreen";
import PlantScreen from "../screens/PlantScreen";
import PlantsYouAddScreen from "../screens/PlantsYouAddScreen";
import UpdateInfoScreen from "../screens/UpdateInfoScreen";
import AddPlantScreen from "../screens/AddPlantScreen";

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
      <Stack.Screen name="Plant" component={PlantScreen} />
      <Stack.Screen name="Add Plant" component={AddPlantScreen} />
    </Stack.Navigator>
  );
};

const MyPlantStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="My Plants" component={MyPlantsScreen} />
    </Stack.Navigator>
  );
};

const ProfileStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Sign in" component={SigninScreen} />
      <Stack.Screen name="Sign up" component={SignupScreen} />
      <Stack.Screen name="Plants You Add" component={PlantsYouAddScreen} />
      <Stack.Screen name="Update Info" component={UpdateInfoScreen} />
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
