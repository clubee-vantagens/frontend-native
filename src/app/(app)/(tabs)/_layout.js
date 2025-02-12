import { Tabs } from "expo-router";
import { useState } from "react";
import { House, Storefront, List, Ticket } from "phosphor-react-native";
import { View, Modal, Pressable, Platform, SafeAreaView } from "react-native";
import MenuIconPoints from "../../../components/icons/MenuIconPoints";
import MenuProfile from "./Menu";
import { scale } from "react-native-size-matters";

export default function TabLayout() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const tabBarOptions = {
    screenOptions: {
      tabBarStyle: {
        backgroundColor: "#050505",
        height: Platform.OS === "ios" ? 90 : 70,
      },
      tabBarItemStyle: {
        paddingVertical: 8,
      },
      tabBarActiveTintColor: "#FFD700",
      tabBarInactiveTintColor: "#fff",
      headerShown: false,
    },
  };

  const renderTabIcon = (Icon, focused, color) => (
    <View style={styles.iconContainer}>
      <Icon
        size={scale(24)}
        color={focused ? "#FFD700" : color}
        weight={focused ? "bold" : "regular"}
      />
      {focused && <View style={styles.activeIndicator} />}
    </View>
  );

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

      <Tabs {...tabBarOptions}>
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ focused, color }) =>
              renderTabIcon(House, focused, color),
          }}
        />
        <Tabs.Screen
          name="Resgates"
          options={{
            tabBarIcon: ({ focused, color }) =>
              renderTabIcon(Ticket, focused, color),
          }}
        />
        <Tabs.Screen
          name="Pontos"
          options={{
            tabBarIcon: ({ focused, color }) =>
              renderTabIcon(MenuIconPoints, focused, color),
          }}
        />
        <Tabs.Screen
          name="Lojas"
          options={{
            tabBarIcon: ({ focused, color }) =>
              renderTabIcon(Storefront, focused, color),
          }}
        />
        <Tabs.Screen
          name="Menu"
          options={{
            tabBarIcon: ({ focused, color }) =>
              renderTabIcon(List, focused, color),
            tabBarButton: (props) => (
              <Pressable {...props} onPress={() => setIsModalVisible(true)} />
            ),
          }}
        />
      </Tabs>
    </>
  );
}

const styles = {
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  activeIndicator: {
    position: "absolute",
    top: -13,
    height: 4,
    width: 48,
    borderRadius: 2,
    backgroundColor: "#FFD700",
  },
  tabLabel: {
    fontSize: scale(10),
    marginTop: 4,
  },
};
