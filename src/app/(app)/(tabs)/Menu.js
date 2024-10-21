import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Image,
  Text,
  View,
  Switch,
  Modal,
  Dimensions,
  Animated,
} from "react-native";
import {
  X,
  Heart,
  Bell,
  Star,
  Gear,
  Shield,
  Headset,
  ArrowUUpLeft,
  UserSwitch,
} from "phosphor-react-native";
import { useUserData } from "../../../hooks/useUserData";
import { useSession } from "../../../context/ctx";
import { useState, useRef, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import LoadingScreen from "../../../components/LoadingScreen";
import CustomText from "../../../components/CustomText";
import theme from "../../../themes/themes";
import MenuIconPoints from "../../../components/icons/MenuIconPoints";
import PointsIcon from "../../../components/icons/PointsIcon";
import { useFocusEffect } from '@react-navigation/native';
const { width } = Dimensions.get("window");

const MenuProfile = ({ setIsModalVisible }) => {
  const { signOut, session } = useSession();
  const { data: user, isLoading, error } = useUserData(session);
  const navigation = useNavigation();

  const [favoriteCount, setFavoriteCount] = useState(2);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const slideAnim = useRef(new Animated.Value(width)).current; // Controla a animação da entrada do modal

  const menuOptions = [
    {
      name: "Favoritos",
      icon: Heart,
      route: "FavoritesScreen",
      hasCounter: true,
    },
    {
      name: "Notificações",
      icon: Bell,
      route: "NotificationsScreen",
      hasSwitch: true,
    },
    { name: "Meus Resgates", icon: ArrowUUpLeft, route: "MyResgatesScreen" },
    {
      name: "Indique Clubee",
      icon: MenuIconPoints,
      route: "ReferClubScreen",
      color: "#000",
    },
    { name: "Avaliações", icon: Star, route: "ReviewsScreen" },
    { name: "Configurações", icon: Gear, route: "SettingsScreen" },
    { name: "Segurança", icon: Shield, route: "SecurityScreen" },
    { name: "Central de Ajuda", icon: Headset, route: "helpCenter" },
  ];

  
  useEffect(() => {
    // Animação de entrada
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const closeModal = () => {
    Animated.timing(slideAnim, {
      toValue: width,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      setIsModalVisible(false);
    });
  };

  if (isLoading) {
    return (
      <SafeAreaView>
        <LoadingScreen />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView>
        <Text>Erro ao carregar dados: {error.message}</Text>
      </SafeAreaView>
    );
  }

  return (
    <Animated.View
      style={[
        styles.modalContainer,
        { transform: [{ translateX: slideAnim }] },
      ]}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.profileHeader}>
          <View style={styles.userInfoContainer}>
            <Image
              style={styles.imageProfile}
              source={{
                uri:
                  user?.photo ||
                  "https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_1280.png",
              }}
            />
            <View style={styles.usercontent}>
              <CustomText variant="bold" style={styles.userName}>
                {user?.name || "Nome não disponível"}
              </CustomText>
              <CustomText style={styles.emailUse} variant="semibold">
                {user?.email || "Email não disponível"}
              </CustomText>
            </View>
          </View>
          <Pressable onPress={closeModal}>
            <X size={22} />
          </Pressable>
        </View>

        <View style={styles.menuContainer}>
          {menuOptions.map((option, index) => (
            <View key={index} style={styles.menuItem}>
              <Pressable
                style={styles.menuItemPressable}
                onPress={() => navigation.navigate(option.route)}
              >
                <option.icon size={24} color={option.color} />
                <CustomText variant="bold" style={styles.menuText}>
                  {option.name}
                </CustomText>
              </Pressable>

              {option.hasCounter && (
                <View style={styles.favoriteCount}>
                  <CustomText variant="bold">{favoriteCount}</CustomText>
                </View>
              )}

              {option.hasSwitch && (
                <Switch
                  value={notificationsEnabled}
                  onValueChange={(value) => setNotificationsEnabled(value)}
                  trackColor={{ false: "#ccc", true: "#CCC" }}
                  thumbColor={notificationsEnabled ? "#000" : "#f4f3f4"}
                />
              )}
            </View>
          ))}
        </View>

        <View style={{ borderTopWidth: 1, marginTop: 20 }}></View>
        <View style={styles.footer}>
          <Pressable onPress={signOut}>
            <Text style={styles.signOutText}>Sair do aplicativo</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </Animated.View>
  );
};

export default MenuProfile;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    padding: 16,
  },
  modalContainer: {
    position: "absolute",
    right: 0,
    height: "100%",
    width: "80%",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
    borderRadius: 4,
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 16,
    marginTop: 40,
  },
  userInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  imageProfile: {
    width: 45,
    height: 45,
    borderRadius: 50,
    marginRight: 5,
  },
  userName: {
    fontSize: 16,
  },
  emailUse: {
    color: theme.colors.details,
    fontSize: 14,
  },
  menuContainer: {
    marginTop: 16,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    justifyContent: "space-between",
  },
  menuItemPressable: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuText: {
    marginLeft: 8,
    fontSize: 16,
  },
  favoriteCount: {
    backgroundColor: "#FCD562",
    borderRadius: 3.5,
    paddingHorizontal: 5,
    paddingTop: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  footer: {
    marginTop: "auto",
    padding: 16,
    borderWidth: 0.8,
    borderRadius: 4,
    borderTopColor: "#150F02",
  },
  signOutText: {
    color: "#150F02",
    fontWeight: "bold",
    textAlign: "center",
  },
});
