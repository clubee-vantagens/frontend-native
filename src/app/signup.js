import { router, Link } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import CustomText from "../components/CustomText";
import Constants from "expo-constants";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Signup() {
  return (
    <SafeAreaView style={styles.areaView}>
      <View style={styles.contentArrow}>
        <Link href="/sign-in">
          <Ionicons name="arrow-back" size={24} color="black" />
        </Link>
      </View>
      <View style={styles.container}>
        <Image
          source={require("@/assets/images/novoLogo.png")}
          style={styles.image}
        />
        <Pressable
          style={styles.indexBtn}
          onPress={() => router.navigate("/signupUser")}
        >
          <CustomText style={styles.btnText}>Sou cliente</CustomText>
        </Pressable>
        <Pressable
          style={styles.indexBtn}
          onPress={() => router.navigate("/signupCompany")}
        >
          <CustomText style={styles.btnText}>Sou empresa</CustomText>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  areaView: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: "#F7F7F7",
  },
  contentArrow: {
    marginLeft: 30,
  },
  image: { width: 297, height: 225, resizeMode: "contain", marginBottom: 50 },
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    // justifyContent: "center",
    paddingTop: 150,
    alignItems: "center",
  },
  indexBtn: {
    width: 359,
    height: 50,
    borderRadius: 50,
    backgroundColor: "#150F02",

    elevation: 5,
    marginTop: 19,
    alignItems: "center",
    justifyContent: "center",
  },

  btnText: {
    color: "#fff",
    fontSize: 18,
  },
});
