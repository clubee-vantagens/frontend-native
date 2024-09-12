import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../app/(app)/index";

const Tab = createBottomTabNavigator();

export const TabBar = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="home" component={Home} />
    </Tab.Navigator>
  );
};
