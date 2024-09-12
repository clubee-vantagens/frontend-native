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
} from "react-native";
import { Link } from "expo-router";
import { useSession } from "../../context/ctx";
import {
  Bell,
  Eye,
  EyeClosed,
  StarFour,
  MagnifyingGlass,
} from "@phosphor-icons/react";
import { User } from "../../components/UserData/UserData";
import { MenuList } from "../../components/MenuData/MenuList";
import CustomText from "../../components/CustomText";

export default function Home() {
  const [user, setUser] = useState(null);
  const [viewPoints, setViewPoints] = useState(false);

  const { signOut, refreshAccessToken } = useSession();

  // useEffect para simular a requisição de dados
  useEffect(() => {
    // Simulando um fetch do backend, usando o dado mocado por enquanto
    const fetchUserData = async () => {
      // Aqui futuramente será a requisição para o backend
      // const response = await api.get('/user');
      // const data = response.data;

      // Simulando atraso de requisição
      setTimeout(() => {
        setUser(User[0]); // Definindo o usuário mocado
      }, 1000);
    };

    fetchUserData();
  }, []);

  if (!user) {
    return (
      <SafeAreaView style={styles.container}>
        <CustomText style={styles.textProfile}>
          <ActivityIndicator color={"#FCD562"} size={"large"} />
        </CustomText>
      </SafeAreaView>
    );
  }

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.containerHeader}>
          <View style={styles.profileNotification}>
            <View style={styles.profile}>
              <Image style={styles.imageProfile} source={user.imagem} />
              <CustomText style={styles.textProfile}>
                Olá, {user.name}
              </CustomText>
            </View>

            <Pressable style={styles.btnNotification}>
              <Bell size={25} color="#fff" />
              {user.notification > 0 && (
                <View style={styles.notificationBadge}>
                  <CustomText style={styles.notificationText}>
                    {user.notification}
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
                {viewPoints ? `${user.points} pts` : "****"}
              </CustomText>
            </View>

            <View>
              <View style={styles.startEye}>
                <Pressable
                  style={styles.eyeButton}
                  onPress={() => setViewPoints(!viewPoints)}
                >
                  {viewPoints ? (
                    <EyeClosed size={32} weight="bold" />
                  ) : (
                    <Eye size={32} weight="bold" />
                  )}
                </Pressable>
                <View style={styles.circleContainer}>
                  <StarFour size={26} />
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

        <CustomText style={styles.sectionNew}>Novidades no clubee</CustomText>

        {/* Carrossel das novidades */}

        <CustomText style={styles.sectionNew}>Destaques</CustomText>
        {/* Carrossel dos destaques*/}

        <CustomText style={styles.sectionNew}> Feito para você</CustomText>
        {/* Carrossel dos destaques*/}
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  containerHeader: {
    backgroundColor: "#000",
    height: 459,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  
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
  },
  circleContainer: {
    width: 40,
    height: 40,
    borderWidth: 2,
    borderRadius: 50,
    borderColor: "#000",
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
    marginTop: 10,
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
    margin: 30,
    fontWeight: "bold",
    fontSize: 16,
  },
});
