import { Redirect } from "expo-router";
import { useSession } from "../../context/ctx";
import LoadingScreen from "../../components/LoadingScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  House,
  List,
  StarFour,
  Storefront,
  Ticket,
} from "@phosphor-icons/react";
// Páginas para tabBar
import Lojas from "./screens/Lojas.js";
import Home from "./index.js";
import Menu from "./screens/Menu.js";
import Pontos from "./screens/Pontos.js";
import Extrato from "./screens/Extrato.js";
import Preferences from "../preferences.js";
import { View, Text } from "react-native";
import CustomText from "../../components/CustomText.js";
import PointsIcon from "../../components/Icons/PointsIcon.js";
export default function AppLayout() {
  const Tab = createBottomTabNavigator();
  const { session, isLoading } = useSession();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!session) {
    return <Redirect href="/sign-in" />;
  }

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarInactiveTintColor: "#fff",
        tabBarActiveTintColor: "#FFD700",
        tabBarStyle: {
          backgroundColor: "#050505",
          borderTopWidth: 0,
          height: 80,
          padding: 15,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "bold",
        },
        tabBarLabel: ({ focused, color }) => (
          <CustomText
            style={{ color: focused ? "#FFD700" : "#fff", fontSize: 12 }}
          >
            {route.name}
          </CustomText>
        ),
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <View style={{ alignItems: "center" }}>
              <House size={24} color={focused ? "#FFD700" : color} />
              {focused && (
                <View
                  style={{
                    position: "absolute",
                    top: -20,
                    height: 4,
                    width: 48,
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10,
                    backgroundColor: "#FFD700",
                  }}
                />
              )}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Regates"
        component={Extrato}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <View style={{ alignItems: "center" }}>
              <Ticket size={24} color={focused ? "#FFD700" : color} />
              {focused && (
                <View
                  style={{
                    position: "absolute",
                    top: -20,
                    height: 4,
                    width: 48,
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10,
                    backgroundColor: "#FFD700",
                  }}
                />
              )}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Pontos"
        component={Pontos}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <View style={{ alignItems: "center" }}>
              <PointsIcon size={32} color={focused ? "#FFD700" : color} />
              {focused && (
                <View
                  style={{
                    position: "absolute",
                    top: -15,
                    height: 4,
                    width: 48,
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10,
                    backgroundColor: "#FFD700",
                  }}
                />
              )}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Lojas"
        component={Lojas}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <View style={{ alignItems: "center" }}>
              <Storefront size={24} color={focused ? "#FFD700" : color} />
              {focused && (
                <View
                  style={{
                    position: "absolute",
                    top: -20,
                    height: 4,
                    width: 48,
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10,
                    backgroundColor: "#FFD700",
                  }}
                />
              )}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Menu"
        component={Menu}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <View style={{ alignItems: "center" }}>
              <List size={24} color={focused ? "#FFD700" : color} />
              {focused && (
                <View
                  style={{
                    position: "absolute",
                    top: -20,
                    height: 4,
                    width: 48,
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10,
                    backgroundColor: "#FFD700",
                  }}
                />
              )}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Preferences"
        component={Preferences}
        options={{
          headerShown: false,
          tabBarButton: () => null,
        }}
      />
    </Tab.Navigator>
  );
}
