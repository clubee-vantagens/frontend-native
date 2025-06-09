import {Pressable,SafeAreaView,StyleSheet,Image,Text,View,Switch,Modal,Dimensions,Animated,} from "react-native";
import {X,Heart,Bell,Star,Gear,Shield,Headset,ArrowUUpLeft,UserSwitch,} from "phosphor-react-native";
import { useUserData } from "../../../../hooks/useUserService";
import { useSession } from "../../../../context/ctx";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "expo-router";
import LoadingScreen from "../../../../components/LoadingScreen";
import CustomText from "../../../../components/CustomText";
import theme from "../../../../themes/themes";
import MenuIconPoints from "../../../../components/icons/MenuIconPoints";
import { scale, verticalScale } from "react-native-size-matters";


const { width } = Dimensions.get("window");

const MenuProfile = ({ setIsModalVisible }) => {
  const { signOut, session } = useSession();
  const { data: user, isLoading, error } = useUserData(session);
  const router = useRouter();

  const [favoriteCount, setFavoriteCount] = useState(2);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const slideAnim = useRef(new Animated.Value(width)).current;

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
    { name: "Meus Resgates", icon: ArrowUUpLeft, route: "rescues" },
    {
      name: "Indique Clubee",
      icon: MenuIconPoints,
      route: "referalPage",
      color: "#000",
    },
    { name: "Avaliações", icon: Star, route: "avaliation" },
    { name: "Configurações", icon: Gear, route: "editProfile" },
    { name: "Segurança", icon: Shield, route: "security" },
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
            <View>
              <CustomText variant="bold" style={styles.userName}>
                {user?.name || "Nome não disponível"}
              </CustomText>
              <CustomText style={styles.emailUse} variant="semibold">
                {user?.email || "Email não disponível"}
              </CustomText>
            </View>
            <Pressable onPress={closeModal} style={{ alignSelf: "flex-start" }}>
              <X size={scale(22)} />
            </Pressable>
          </View>
        </View>

        <View style={styles.menuContainer}>
          {menuOptions.map((option, index) => (
            <View key={index} style={styles.menuItem}>
              <Pressable
                style={styles.menuItemPressable}
                // onPress={() => navigation.navigate(option.route)}
                onPress={() => {
                  closeModal();
                  router.push(option.route);
                }}
              >
                <option.icon size={scale(24)} color={option.color} />
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

        <View style={{ borderTopWidth: 1, marginTop: scale(0) }}></View>
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
  },
  modalContainer: {
    position: "absolute",
    right: 0,
    height: "100%",
    width: "85%",
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
    justifyContent: "center",
    marginLeft: scale(10),
    marginTop: verticalScale(40),
  },
  userInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  imageProfile: {
    width: scale(45),
    height: verticalScale(45),
    borderRadius: 50,
    marginRight: scale(5),
  },
  userName: {
    fontSize: scale(16),
  },
  emailUse: {
    color: theme.colors.details,
    fontSize: scale(14),
  },
  menuContainer: {
    marginTop: scale(16),
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: scale(16),
    justifyContent: "space-between",
  },
  menuItemPressable: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuText: {
    marginLeft: scale(8),
    fontSize: scale(16),
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
    padding: scale(16),
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
