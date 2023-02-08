import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AllPlantsScreen from "../screens/AllPlantsScreen";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import Profile from "../screens/Profile";

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
