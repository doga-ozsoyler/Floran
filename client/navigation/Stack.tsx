import React from "react";
import { IconButton, Icon } from "native-base";
import { FontAwesome5 } from "@expo/vector-icons";

import {
  createStackNavigator,
  StackNavigationOptions,
} from "@react-navigation/stack";
import { HeaderBackButton } from "@react-navigation/elements";
import { useNavigation } from "@react-navigation/native";

import AllPlantsScreen from "../screens/AllPlantsScreen";
import MyPlantsScreen from "../screens/MyPlantsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import RemindersScreen from "../screens/RemindersScreen";

const TABICONSIZE = 30;
const TABICONCOLOR = "green";

const Stack = createStackNavigator();

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
