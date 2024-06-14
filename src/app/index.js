import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import React, { useState } from "react";
import { Image } from "expo-image";
// import CustomButton from "../components/CustomButton";
import { Link, router } from "expo-router";
import { useForm } from "react-hook-form";
import CustomText from "../components/CustomText";

export default function Login() {
  const { control, handleSubmit } = useForm();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  console.log(email, password);
  const handleLogin = () => {
    // lógica do login
    console.log("entrou");
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/Clubee_logo-2.png")}
        style={styles.image}
      />

      <View>
        <TextInput
          control={control}
          style={styles.input}
          placeholder="E-mail"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          control={control}
          style={styles.input}
          placeholder="Senha"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>

      <View style={styles.lembrarSenha}>
        <Link style={styles.lembrarSenhaText} href="/recuperar">
          Esqueceu a senha?
        </Link>
      </View>

      <Pressable onPress={handleSubmit(handleLogin)} style={styles.btnEntrar}>
        <Text style={styles.textEntrar}>Entrar</Text>
      </Pressable>

      <View style={styles.containerFooter}>
        <CustomText style={{ fontSize: 20, color: "gray" }}>
          Não tem cadastro?{" "}
          <Link style={{ fontWeight: "bold", color: "black" }} href="/signup">
            Se cadastre agora!
          </Link>
        </CustomText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFAEB",
  },
  image: {
    width: 297,
    height: 225,
  },
  input: {
    width: 350,
    height: 50,
    borderRadius: 7,
    padding: 10,
    margin: 10,
    elevation: 5,
    backgroundColor: "#fff",
    textAlign: "center",
  },
  lembrarSenha: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",

    paddingHorizontal: 26,

    marginTop: 19,
    marginBottom: 41,
  },
  lembrarSenhaText: {
    fontSize: 16,
    textDecorationLine: "underline",
    color: "#757575",
    fontWeight: 400,
  },

  btnEntrar: {
    width: 215,
    height: 50,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#6ff79a",
    elevation: 5,
  },
  textEntrar: {
    fontWeight: "bold",
    fontSize: 18,
  },
  containerFooter: {
    marginTop: 20,
  },
});
