import { Redirect } from "expo-router";
import { useSession } from "../../context/ctx";
import LoadingScreen from "../../components/LoadingScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  House,
  List,
  StarFour,
  Storefront,
  Article,
} from "@phosphor-icons/react";
// Páginas para tabBar
import Lojas from "./screens/Lojas.js";
import Home from "./index.js";
import Menu from "./screens/Menu.js";
import Pontos from "./screens/Pontos.js";
import Extrato from "./screens/Extrato.js";
import { View } from "react-native";

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
      screenOptions={{
        tabBarInactiveTintColor: "#fff",
        tabBarActiveTintColor: "#FFD700",
        tabBarStyle: {
          backgroundColor: "#050505",
          borderTopWidth: 0,
          height: 80,
          padding: 20,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "bold",
          color: "#fff",
        },
      }}
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
        name="Extrato"
        component={Extrato}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <View style={{ alignItems: "center" }}>
              <Article size={24} color={focused ? "#FFD700" : color} />
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
              <StarFour size={32} color={focused ? "#FFD700" : color} />
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
    </Tab.Navigator>
  );
}
