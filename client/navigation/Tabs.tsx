import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AllPlantsScreen from "../screens/AllPlantsScreen";
import { Ionicons } from "@expo/vector-icons";

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
        name="Home"
        component={AllPlantsScreen}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
