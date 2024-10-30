import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Image,
  Text,
  View,
} from "react-native";
import {
  XArrowUUpLeft,
  Heart,
  Bell,
  Star,
  Gear,
  Shield,
  Headset,
} from "phosphor-react-native";
import { User } from "../components/UserData/UserData";
import { useSession } from "../context/ctx";
import CustomText from "../components/CustomText";

const MenuProfile = () => {
  const { data: user, isLoading, error } = useUserData(session);
  const { signOut, session } = useSession();

  return (
    <SafeAreaView>
      <View>
        <Image
          style={styles.imageProfile}
          source={
            user?.photo ||
            "https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_1280.png"
          }
        />
        <View>
          <CustomText>{user.name}</CustomText>
          <CustomText>{user.email}</CustomText>
        </View>
      </View>

      <View></View>
      <Pressable onPress={signOut}>Sair do aplicativo</Pressable>
    </SafeAreaView>
  );
};

export default MenuProfile;

const styles = StyleSheet.create({});
