import { router } from "expo-router";
import { Button, Pressable, StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";

export default function Index() {
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
        <Text style={styles.btnText}>Sou cliente!</Text>
      </Pressable>
      <Pressable
        style={styles.indexBtn}
        onPress={() => router.navigate("/signupUser")}
      >
        <Text style={styles.btnText}>Sou empresa!</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  image: { width: 297, height: 225 },
  container: {
    flex: 1,
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
