import {
  createBottomTabNavigator,
  BottomTabNavigationOptions,
} from "@react-navigation/bottom-tabs";
import {
  Ionicons,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import {
  AllPlantsStackNavigator,
  MyPlantStackNavigator,
  ProfileStackNavigator,
  RemindersStackNavigator,
} from "./Stack";
import HeaderBackArraw from "./HeaderBackArraw";
import HeaderAddPlantButton from "./HeaderAddPlantButton";
const TABICONSIZE = 30;
const TABICONCOLOR = "green";

const Tabs = () => {
  const Tab = createBottomTabNavigator();

  const tabOptionStyle: BottomTabNavigationOptions = {
    headerLeft: () => <HeaderBackArraw />,
    headerRight: () => <HeaderAddPlantButton />,
    headerTintColor: TABICONCOLOR,
    headerTitleStyle: {
      fontWeight: "bold",
    },
  };

  return (
    <Tab.Navigator backBehavior="history" screenOptions={tabOptionStyle}>
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
        }}
        name="AllPlantsTab"
        component={AllPlantsStackNavigator}
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
        }}
        name="MyPlantsTab"
        component={MyPlantStackNavigator}
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
        }}
        name="RemindersTab"
        component={RemindersStackNavigator}
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
        }}
        name="ProfileTab"
        component={ProfileStackNavigator}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
