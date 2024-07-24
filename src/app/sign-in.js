import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
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

export default function Index() {
  const [isLoading, setIsLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ defaultValues: { email: "", password: "" } });
  const { signIn, session, error, setError } = useSession();

  console.log(session);
  useEffect(() => {
    if (session) {
      router.replace("/"); // Redirect to a protected route once session is set
    }
  }, [session]);
  const handleLogin = async (data) => {
    setIsLoading(true);
    try {
      await signIn(data.email, data.password);
      reset();
    } catch (error) {
      console.log(error);
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
        <Image
          source={require("@/assets/images/Clubee_logo-2.png")}
          style={styles.image}
        />

        <View>
          <CustomInput
            control={control}
            name="email"
            placeholder="E-mail"
            rules={{
              required: "Campo Obrigatório",
              maxLength: { value: 50, message: "O e-mail inserido é inválido" },
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "O e-mail inserido é inválido",
              },
            }}
          />
          {errors.email && (
            <ErrorMessageComponent>
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
        {error && <ErrorMessageComponent>{error}</ErrorMessageComponent>}
        <View style={styles.containerFooter}>
          <CustomText style={{ fontSize: 20, color: "gray" }}>
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
