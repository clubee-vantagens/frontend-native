import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import Constants from "expo-constants";
import { Image } from "expo-image";
import { Link, router } from "expo-router";
import { useSession } from "../context/ctx";
import ErrorMessageComponent from "../components/ErrorMessageComponent";
import CustomInput from "../components/CustomInput";
import CustomPasswordInput from "../components/CustomPasswordInput";
import { useForm } from "react-hook-form";
import CustomText from "../components/CustomText";
import Fontisto from "@expo/vector-icons/Fontisto";
import { useFocusEffect } from "@react-navigation/native";

export default function Index() {
  const [isLoading, setIsLoading] = useState(false);
  const [emailValue, setEmailValue] = useState("");
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({ defaultValues: { email: "", password: "" } });
  const { signIn, session, error, setError } = useSession();

  useEffect(() => {
    if (session) {
      router.replace("/"); // Redirect to a protected route once session is set
    }
  }, [session]);

  useFocusEffect(
    useCallback(() => {
      // Reset error when screen is focused
      setError(null);
    }, [])
  );

  const handleLogin = async (data) => {
    setIsLoading(true);
    setError(null);
    try {
      await signIn(data.email, data.password);
      // console.log("entrou");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError("Verifique suas credenciais");
      } else {
        setError("Ocorreu um erro inesperado. Por favor, tente novamente.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.containerImage}>
          <Image
            source={require("@/assets/images/novoLogo.png")}
            style={styles.image}
          />
        </View>

        {error && (
          <View style={styles.containerError}>
            <View style={styles.contentError}>
              <Fontisto
                name="close"
                size={24}
                color="#A92525"
                style={styles.icon}
              />
              <ErrorMessageComponent style={styles.errorMessage}>
                Ooops! {error}. Podemos ajudar a{" "}
                <Link href={"passwordRecovery"} style={styles.link}>
                  recuperar seu acesso?{" "}
                </Link>
              </ErrorMessageComponent>
            </View>
          </View>
        )}

        <View style={styles.containerInput}>
          <CustomInput
            control={control}
            name="email"
            placeholder="Informe seu e-mail"
            rules={{
              required: "Campo Obrigatório",
              maxLength: {
                value: 50,
                message: "Atenção! E-mail não pode ultrapassar 50 caracteres",
              },
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "O e-mail inserido é inválido",
              },
            }}
            onChangeText={(text) => {
              if (text.length <= 50) {
                setValue("email", text);
                setEmailValue(text);
              } else {
                Alert.alert("Atenção", "O máximo é 50 caracteres");
              }
            }}
            value={emailValue}
          />

          {errors.email && (
            <ErrorMessageComponent style={styles.errorText}>
              {errors.email.message}
            </ErrorMessageComponent>
          )}

          <CustomPasswordInput
            control={control}
            name="password"
            placeholder="Senha"
            secureTextEntry={true}
            type="password"
            rules={{
              required: true,
            }}
          />
          {errors.password && (
            <ErrorMessageComponent>
              {errors.password.message || "Campo Obrigatório"}
            </ErrorMessageComponent>
          )}
        </View>

        <View style={styles.lembrarSenha}>
          <Link href="/passwordRecovery">
            <CustomText style={styles.lembrarSenhaText}>
              Esqueceu a senha?
            </CustomText>
          </Link>
        </View>

        <Pressable style={styles.btnEntrar} onPress={handleSubmit(handleLogin)}>
          {isLoading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <CustomText style={styles.textEntrar}>Entrar</CustomText>
          )}
        </Pressable>

        <View style={styles.containerFooter}>
          <CustomText style={{ fontSize: 18, color: "#000" }}>
            Não tem cadastro?{" "}
            <Link href="/signup">
              <CustomText style={{ fontWeight: "bold", color: "black" }}>
                Se cadastre agora!
              </CustomText>
            </Link>
          </CustomText>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F7F7F7",
  },
  containerImage: {
    width: "100%",
    alignItems: "center",
  },
  image: {
    width: "90%",
    height: 250,
    marginTop: 50,
    resizeMode: "contain",
  },
  containerInput: {
    marginTop: 53,
  },
  input: {
    width: 359,
    height: 50,
    borderRadius: 10,
    padding: 10,
    margin: 10,
    elevation: 5,
    backgroundColor: "#fff",
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
    fontSize: 14,
    textDecorationLine: "underline",
    color: "#757575",
    fontWeight: "400",
  },
  btnEntrar: {
    width: 180,
    height: 46,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#150F02",
    elevation: 5,
  },
  textEntrar: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#fff",
  },
  containerFooter: {
    marginTop: 180,
  },
  errorText: {
    color: "blue",
    fontSize: 10,
    marginLeft: 10,
    maxWidth: "90%",
  },
  containerError: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 359,
    height: 88,
    borderRadius: 10,
    backgroundColor: "rgba(251, 80, 80, 0.25)",
    padding: 10,
  },
  contentError: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    fontSize: 14,
  },
  icon: {
    marginRight: 10,
  },
  errorMessage: {
    flex: 1,
    textAlign: "center",
  },
  link: {
    fontWeight: "bold",
    color: "#A92525",
    textDecorationLine: "underline",
  },
});
