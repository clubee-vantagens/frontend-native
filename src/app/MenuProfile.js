import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Image,
  Text,
  View,
} from "react-native";
import { User } from "../components/UserData/UserData";
import { useSession } from "../context/ctx";
import CustomText from "../components/CustomText";
import { useUserData } from "../hooks/useUserService";

const MenuProfile = () => {
  // Desestruture a sessão primeiro
  const { signOut, session } = useSession();
  // Em seguida, use a sessão no useUserData
  const { data: user, isLoading, error } = useUserData(session);

  // ... o resto do seu código

  if (isLoading) {
    return <Text>Carregando...</Text>;
  }

  if (error) {
    return <Text>Erro ao carregar dados do usuário.</Text>;
  }

  return (
    <SafeAreaView>
      <View>
        <Image
          style={styles.imageProfile}
          source={{
            uri:
              user?.photo ||
              "https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_1280.png",
          }}
        />
        <View>
          <CustomText>{user?.name}</CustomText>
          <CustomText>{user?.email}</CustomText>
        </View>
      </View>

      <View></View>
      <Pressable onPress={signOut}>
        <Text>Sair do aplicativo</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default MenuProfile;

const styles = StyleSheet.create({});