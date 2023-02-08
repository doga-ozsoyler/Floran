import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Ionicons,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import AllPlantsScreen from "../screens/AllPlantsScreen";
import Profile from "../screens/Profile";
import MyPlants from "../screens/MyPlants";

const Tabs = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator>
      <Tab.Screen
        options={{
          title: "Plants",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "md-leaf" : "md-leaf-outline"}
              color="green"
              size={30}
            />
          ),
          headerTintColor: "green",
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
              color="green"
              size={30}
            />
          ),
          headerTintColor: "green",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
        name="MyPlants"
        component={MyPlants}
      />
      <Tab.Screen
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <FontAwesome5
              name={focused ? "user-alt" : "user"}
              color="green"
              size={30}
            />
          ),
          headerTintColor: "green",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
        name="Profile"
        component={Profile}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
