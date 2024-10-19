import { Tabs } from "expo-router";
import { useState } from "react";
import {
  House,
  Article,
  StarFour,
  Storefront,
  List,
  Ticket,
} from "phosphor-react-native";
import CustomText from "../../../components/CustomText";
import { View, Modal, Pressable } from "react-native";
import PointsIcon from "../../../components/icons/PointsIcon";
import MenuIconPoints from "../../../components/icons/MenuIconPoints";
import MenuProfile from "./Menu";
export default function TabLayout() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  return (
    <>
      <Modal
        visible={isModalVisible}
        animationType="none"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <MenuProfile setIsModalVisible={setIsModalVisible} />
      </Modal>
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
                      top: -29,
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
          name="Resgates"
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size, focused }) => (
              <View style={{ alignItems: "center" }}>
                <Ticket size={24} color={focused ? "#FFD700" : color} />
                {focused && (
                  <View
                    style={{
                      position: "absolute",
                      top: -29,
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
                <MenuIconPoints color="#fff" size={30} />
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
                      top: -29,
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
                      top: -29,
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
            tabBarButton: (props) => (
              <Pressable {...props} onPress={() => setIsModalVisible(true)} />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
