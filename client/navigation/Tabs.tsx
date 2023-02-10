import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Ionicons,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import AllPlantsScreen from "../screens/AllPlantsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import MyPlantsScreen from "../screens/MyPlantsScreen";
import RemindersScreen from "../screens/RemindersScreen";
import { useNavigation } from "@react-navigation/native";
import { HeaderBackButton } from "@react-navigation/elements";
import { IconButton, Icon } from "native-base";
import { StyleSheet } from "react-native";
const TABICONSIZE = 30;
const TABICONCOLOR = "green";

const Tabs = () => {
  const Tab = createBottomTabNavigator();
  const navigation = useNavigation();

  return (
    <Tab.Navigator
      backBehavior="history"
      screenOptions={{
        headerLeft: () => (
          <HeaderBackButton
            style={{ marginLeft: 10 }}
            tintColor={TABICONCOLOR}
            onPress={() => {
              navigation.goBack();
            }}
          />
        ),
        headerRight: () => (
          <IconButton
            icon={<Icon as={FontAwesome5} name="plus" />}
            style={{ marginRight: 10 }}
            colorScheme={TABICONCOLOR}
          />
        ),
      }}
    >
      <Tab.Screen
        options={{
          title: "Plants",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "md-leaf" : "md-leaf-outline"}
              color={TABICONCOLOR}
              size={TABICONSIZE}
            />
          ),
          headerTintColor: TABICONCOLOR,
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
        name="AllPlantsScreen"
        component={AllPlantsScreen}
      />
      <Tab.Screen
        options={{
          title: "My Plants",
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name={focused ? "tree" : "tree-outline"}
              color={TABICONCOLOR}
              size={TABICONSIZE}
            />
          ),
          headerTintColor: TABICONCOLOR,
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
        name="MyPlantsScreen"
        component={MyPlantsScreen}
      />
      <Tab.Screen
        options={{
          title: "Reminders",
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name={focused ? "clock-time-four" : "clock-time-four-outline"}
              color={TABICONCOLOR}
              size={TABICONSIZE}
            />
          ),
          headerTintColor: TABICONCOLOR,
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
        name="RemindersScreen"
        component={RemindersScreen}
      />
      <Tab.Screen
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <FontAwesome5
              name={focused ? "user-alt" : "user"}
              color={TABICONCOLOR}
              size={TABICONSIZE}
            />
          ),
          headerTintColor: TABICONCOLOR,
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
        name="ProfileScreen"
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
