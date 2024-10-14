import { Tabs } from "expo-router";
import {
  House,
  Article,
  StarFour,
  Storefront,
  List,
  Ticket,
} from "phosphor-react-native";
import CustomText from "../../../components/CustomText";
import { View } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
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
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <View style={{ alignItems: "center" }}>
              {focused ? (
                <House size={24} weight="fill" color="#FFD700" />
              ) : (
                <House size={24} weight="thin" color={color} />
              )}
              {focused && (
                <View
                  style={{
                    position: "absolute",
                    top: -28,
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
      <Tabs.Screen
        name="Extrato"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <View style={{ alignItems: "center" }}>
              <Article size={24} color={focused ? "#FFD700" : color} />
              {focused && (
                <View
                  style={{
                    position: "absolute",
                    top: -28,
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
      <Tabs.Screen
        name="Pontos"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <View style={{ alignItems: "center" }}>
              <StarFour size={32} color={focused ? "#FFD700" : color} />
              {focused && (
                <View
                  style={{
                    position: "absolute",
                    top: -26,
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
      <Tabs.Screen
        name="Lojas"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <View style={{ alignItems: "center" }}>
              <Storefront size={24} color={focused ? "#FFD700" : color} />
              {focused && (
                <View
                  style={{
                    position: "absolute",
                    top: -28,
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
      <Tabs.Screen
        name="Menu"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <View style={{ alignItems: "center" }}>
              <List size={24} color={focused ? "#FFD700" : color} />
              {focused && (
                <View
                  style={{
                    position: "absolute",
                    top: -28,
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
    </Tabs>
  );
}
