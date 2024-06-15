import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { Image } from "expo-image";
import { Link, router } from "expo-router";
import { useForm } from "react-hook-form";
import CustomText from "../components/CustomText";
import ErrorMessageComponent from "../components/ErrorMessageComponent";
// import { Home } from "../pages/Home/Home";

export default function Login() {
  const { control, handleSubmit } = useForm();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ email: "", password: "" });

  // Simular usuário do backend
  const validUsers = [
    {
      email: "wilkson@gmail.com",
      password: "senha1",
    },
    { email: "wilkson2@gmail.com", password: "senha2" },
  ];

  const handleLogin = () => {
    setError({ email: "", password: "" });

    if (!isValidEmail(email)) {
      setError((prevError) => ({
        ...prevError,
        email: "Por favor, insira um email válido.",
      }));
      return;
    }

    if (!isValidPassword(password)) {
      setError((prevError) => ({
        ...prevError,
        password: "Por favor, insira sua senha.",
      }));
      return;
    }

    const user = validUsers.find((user) => user.email === email);

    if (!user) {
      setError((prevError) => ({
        ...prevError,
        email: "Este email não está registrado.",
      }));
      return;
    }

    if (user.password !== password) {
      setError((prevError) => ({ ...prevError, password: "Senha incorreta." }));
      return;
    }

    setIsLoading(true);
    console.log("Realizando login...");
    setTimeout(() => {
      setIsLoading(false);
      console.log("Login bem-sucedido para:", email);
      // Navegar para próxima tela que é a principal após o login
      navigation.navigate("Home");
    }, 2000);
  };

  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const isValidPassword = (password) => {
    return password.length > 0;
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/Clubee_logo-2.png")}
        style={styles.image}
      />

      <View>
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        {error.email && (
          <ErrorMessageComponent>{error.email}</ErrorMessageComponent>
        )}
        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        {error.password && (
          <ErrorMessageComponent>{error.password}</ErrorMessageComponent>
        )}
      </View>

      <View style={styles.lembrarSenha}>
        <Link href="/recuperar">
          <Text style={styles.lembrarSenhaText}>Esqueceu a senha?</Text>
        </Link>
      </View>

      <Pressable style={styles.btnEntrar} onPress={handleLogin}>
        {isLoading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.textEntrar}>Entrar</Text>
        )}
      </Pressable>

      <View style={styles.containerFooter}>
        <CustomText style={{ fontSize: 20, color: "gray" }}>
          Não tem cadastro?{" "}
          <Link href="/signup">
            <Text style={{ fontWeight: "bold", color: "black" }}>
              Se cadastre agora!
            </Text>
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
    color: "#fff",
  },
  containerFooter: {
    marginTop: 20,
  },
});
