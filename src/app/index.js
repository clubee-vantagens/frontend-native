import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  Vibration,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Image } from "expo-image";
import { Link, useNavigation } from "expo-router";
import axios from "axios";

export default function Login() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ email: "", password: "" });

  const handleLogin = async () => {
    setError({ email: "", password: "" });

    console.log("Tentativa de login com:", email, password);

    if (!isValidEmail(email)) {
      setError((prevError) => ({
        ...prevError,
        email: "Por favor, insira um email válido.",
      }));
      Vibration.vibrate(300);
      console.log("Email inválido:", email);
      return;
    }

    if (!isValidPassword(password)) {
      setError((prevError) => ({
        ...prevError,
        password: "Senha incorreta",
      }));
      Vibration.vibrate(300);
      console.log("Senha inválida:", password);
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/users/login",
        {
          email,
          password,
        }
      );

      setIsLoading(false);
      console.log("Login bem-sucedido para:", email);
      navigation.navigate("Home");
    } catch (error) {
      setIsLoading(false);
      console.error("Erro ao realizar login:", error.message);

      if (error.response) {
        if (error.response.status === 400) {
          setError({
            email: "Credenciais inválidas. Verifique seu email e senha.",
            password: "Credenciais inválidas. Verifique seu email e senha.",
          });
        } else {
          setError({
            email: "Erro ao realizar login.",
            password: "Erro ao realizar login.",
          });
        }
      } else {
        setError({
          email: "Erro ao realizar login.",
          password: "Erro ao realizar login.",
        });
      }
    }
  };

  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const isValidPassword = (password) => {
    return password.length > 0;
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Image
          source={require("@/assets/images/Clubee_logo-2.png")}
          style={styles.image}
        />

        <View>
          <TextInput
            style={styles.input}
            placeholder="E-mail"
            maxLength={50}
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          {error.email ? (
            <Text style={styles.errorText}>{error.email}</Text>
          ) : null}

          <TextInput
            style={styles.input}
            placeholder="Senha"
            secureTextEntry={true}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          {error.password ? (
            <Text style={styles.errorText}>{error.password}</Text>
          ) : null}
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
          <Text style={{ fontSize: 20, color: "gray" }}>
            Não tem cadastro?{" "}
            <Link href="/signup">
              <Text style={{ fontWeight: "bold", color: "black" }}>
                Se cadastre agora!
              </Text>
            </Link>
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
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
    marginTop: 50,
    contentFit: "contain",
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
    color: "#000",
  },
  containerFooter: {
    marginTop: 130,
  },
  errorText: {
    color: "red",
    fontSize: 10,
    marginLeft: 10,
    maxWidth: "60%",
  },
});
