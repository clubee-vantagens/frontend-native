import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  SafeAreaView,
  Image,
  TextInput,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { Link, router } from "expo-router";
import { useSession } from "../../../context/ctx";
import {
  Bell,
  Eye,
  EyeClosed,
  StarFour,
  MagnifyingGlass,
} from "phosphor-react-native";
import { User } from "../../../components/UserData/UserData";
import { MenuList } from "../../../components/MenuData/MenuList";
import CustomText from "../../../components/CustomText";
import { Hightlight } from "../../../components/Carousels/HightLight";
import { useUserData } from "../../../hooks/useUserData";
import { notifications } from "../../../components/UserData/Notifications";
import NotificationsModal from "../notifications";
import LoadingScreen from "../../../components/LoadingScreen";
import PointsIcon from "../../../components/icons/PointsIcon";
export default function Home() {
  const [modalVisible, setModalVisible] = useState(false);
  const [viewPoints, setViewPoints] = useState(true);
  const { signOut, refreshAccessToken, session } = useSession();
  const { data: user, isLoading, error } = useUserData(session);

  // Pegar o total de notificações

  const getTotalNotifications = () => {
    return notifications.reduce((total, notif) => total + notif.qntdNotif, 0);
  };

  const totalNotifications = getTotalNotifications();

  console.log(user);

  if (!user) {
    return (
      <SafeAreaView style={styles.container}>
        <LoadingScreen />
      </SafeAreaView>
    );
  }

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.containerHeader}>
            <View style={styles.profileNotification}>
              <View style={styles.profile}>
                <Image
                  style={styles.imageProfile}
                  source={
                    user?.photo ||
                    "https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_1280.png"
                  }
                />
                <CustomText style={styles.textProfile} variant="bold">
                  Olá, {"\n"}
                  {user.name}
                </CustomText>
              </View>

              <Pressable
                style={styles.btnNotification}
                onPress={() => setModalVisible(true)}
              >
                <Bell size={25} color="#fff" />
                {totalNotifications > 0 && (
                  <View style={styles.notificationBadge}>
                    <CustomText style={styles.notificationText}>
                      {totalNotifications}
                    </CustomText>
                  </View>
                )}
              </Pressable>
            </View>

            {/* Exibindo pontos do usuário */}

            <View style={styles.containerPoints}>
              <View style={styles.descriptionPoints}>
                <CustomText style={styles.textPoints}>
                  Pontos Disponíveis
                </CustomText>
                <CustomText style={styles.points}>
                  {viewPoints ? `${user.points || 1000} pts` : "**** pts"}
                </CustomText>
              </View>

              <View>
                <View style={styles.startEye}>
                  <Pressable
                    style={styles.eyeButton}
                    onPress={() => setViewPoints(!viewPoints)}
                  >
                    {viewPoints ? <Eye size={24} /> : <EyeClosed size={24} />}
                  </Pressable>
                  <View style={styles.circleContainer}>
                    <PointsIcon />
                  </View>
                </View>
              </View>
            </View>

            {/* Search */}

            <View style={styles.searchSection}>
              <MagnifyingGlass
                name="ios-search"
                size={20}
                color="#000"
                style={styles.searchIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Pesquisar lojas"
                underlineColorAndroid="transparent"
              />
            </View>

            {/* Menu */}

            <View style={styles.menu}>
              {MenuList.map((item, index) => (
                <View style={styles.menuItem} key={index}>
                  <Pressable style={styles.MenuButton}>{item.icon}</Pressable>
                  {item.title ? (
                    <Text style={styles.buttonText}>{item.title}</Text>
                  ) : null}
                </View>
              ))}
            </View>
          </View>

          <View>
            <CustomText style={styles.sectionNew}>
              Novidades no clubee
            </CustomText>

            <Hightlight />
          </View>

          <CustomText style={styles.sectionNew}>Destaques</CustomText>
          <View style={styles.containerNews}>
            <Hightlight />
          </View>

          <CustomText style={styles.sectionNew}> Feito para você</CustomText>
          <Hightlight />
        </ScrollView>
      </SafeAreaView>
      <NotificationsModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  containerHeader: {
    paddingTop: 50,
    backgroundColor: "#000",

    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    marginBottom: 30,
  },
  imageProfile: {
    width: 42,
    height: 42,
    borderRadius: 50,
    backgroundColor: "#ccc",
    marginRight: 5,
  },
  profileNotification: {
    color: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 16,
  },
  profile: {
    flexDirection: "row",
    alignItems: "center",
  },
  textProfile: {
    color: "#fff",
    fontSize: 12,
  },
  btnNotification: {
    width: 32,
    height: 32,
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  notificationBadge: {
    position: "absolute",
    left: -11,
    bottom: -9,
    backgroundColor: "#FCD562",
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  notificationText: {
    color: "#000",
    fontSize: 10,
    fontWeight: "bold",
  },

  // Pontos
  containerPoints: {
    backgroundColor: "#FFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    height: 197,
    marginHorizontal: 20,
    borderRadius: 8,
  },

  descriptionPoints: {
    justifyContent: "center",
  },
  textPoints: {
    color: "#757575",
  },
  points: {
    fontSize: 50,
  },
  startEye: {
    width: 100,
    height: 100,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  eyeButton: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: "#F1F1EF",
    width: 35,
    height: 35,
    borderRadius: 50,
    padding: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  circleContainer: {
    // width: 50,
    // height: 50,

    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    left: 0,
    zIndex: 1,
  },

  // Busca
  searchSection: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginTop: 40,
    width: 350,
    marginHorizontal: "auto",
  },
  searchIcon: {
    padding: 5,
  },
  input: {
    flex: 1,
    paddingLeft: 10,
    fontSize: 16,
  },

  // Menu

  menu: {
    flexDirection: "row",
    marginVertical: 20,
    justifyContent: "space-evenly",
  },
  menuItem: {
    alignItems: "center",
  },
  MenuButton: {
    width: 70,
    height: 70,
    objectFit: "cover",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    backgroundColor: "#fff",
  },
  buttonText: {
    marginTop: 4,
    color: "#fff",
  },

  sectionNew: {
    margin: 10,
    fontWeight: "bold",
    fontSize: 16,
  },
  containerNews: {
    paddingBottom: 10,
    backgroundColor: "#F5C330",
  },
});
