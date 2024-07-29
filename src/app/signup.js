import { router } from "expo-router";
import { Button, Pressable, StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import CustomText from "../components/CustomText";
import Constants from "expo-constants";

export default function Signup() {
  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/Clubee_logo-2.png")}
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
  );
}

const styles = StyleSheet.create({
  image: { width: 297, height: 225 },
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFAEB",
  },
  indexBtn: {
    width: 359,
    height: 50,
    borderRadius: 15,
    backgroundColor: "#fff",
    elevation: 5,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: {
    color: "#757575",
    fontSize: 18,
  },
});
