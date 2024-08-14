import { useEffect, useState } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { Link, router } from "expo-router";
import { api_url } from "../constants/constants";
import { MaterialIcons } from "@expo/vector-icons";
import { Controller, useForm } from "react-hook-form";
import { useMutateUsers } from "../hooks/useMutateUser";
import { maskCpf, validateCpf } from "../utils/utils";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import CustomPasswordInput from "../components/CustomPasswordInput";
import Constants from "expo-constants";
import ConfirmationModal from "../components/ConfirmationModal";
import CustomText from "../components/CustomText";
import ErrorMessageComponent from "../components/ErrorMessageComponent";
import LoadingScreen from "../components/LoadingScreen";
import Checkbox from "expo-checkbox";
import axios from "axios";
import Fontisto from "@expo/vector-icons/Fontisto";

export default function UserSignUpScreen() {
  const [isChecked, setChecked] = useState(false);
  const [isConfirmationModal, setIsConfirmationModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const date = new Date();
  const { mutate, isError, error, isSuccess, status } = useMutateUsers();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      name: "",
      socialName: "",
      email: "",
      password: "",
      cpf: "",
      termsOfUse: false,
      confirmPassword: "",
    },
  });
  const cpfValue = watch("cpf");
  const passwordValue = watch("password");
  const termsOfUse = watch("termsOfUse", false);

  useEffect(() => {
    if (isSuccess) {
      reset();
      setIsConfirmationModal(true);
    }
  }, [isSuccess]);

  useEffect(() => {
    setValue("cpf", maskCpf(cpfValue));
  }, [cpfValue]);

  const handleRegister = async (data) => {
    const dataToPost = {
      name: data.name,
      socialName: data.socialName,
      email: data.email,
      password: data.password,
      cpf: data.cpf,
      termsOfUse: data.termsOfUse,
      dateTermsOfUse: date.toISOString(),
      // roles: [],
    };

    try {
      const response = await axios.post(
        `${api_url}/users/client/register`,
        dataToPost
      );
      console.log("registrado", response.data);
      setIsConfirmationModal(true);
    } catch (error) {
      if (error.response?.status === 400) {
        setErrorMessage("E-mail ou cpf cadastrado");
        return;
      }
      console.log("erro ao cadastrar", error);
    }
  };

  if (status === "pending") {
    return <LoadingScreen />;
  }

  return (
    <View style={styles.container}>
      <View style={{ alignSelf: "flex-start", marginLeft: 25 }}>
        <Pressable onPress={() => router.navigate("/")}>
          <MaterialIcons name="arrow-back-ios-new" size={30} color="black" />
        </Pressable>
      </View>
      <CustomText style={{ fontSize: 30 }} variant="semiBold">
        Sou Cliente
      </CustomText>
      <View>
        {errorMessage && (
          <View style={styles.containerError}>
            <View style={styles.contentError}>
              <Fontisto
                name="close"
                size={24}
                color="#A92525"
                style={styles.icon}
              />
              <ErrorMessageComponent style={styles.errorMessage}>
                {errorMessage} retorne para o
                <Link href={"sign-in"} style={styles.link}>
                  Login
                </Link>
                ou
                <Link href={"passwordRecovery"} style={styles.link}>
                  Recuperar senha
                </Link>
              </ErrorMessageComponent>
            </View>
          </View>
        )}
        <CustomInput
          control={control}
          name="name"
          placeholder="Nome"
          rules={{
            required: "Campo Obrigatório",
            maxLength: {
              value: 256,
              message: "O nome não pode exceder 256 caracteres",
            },
            pattern: {
              value: /^[a-zA-Zà-úÀ-Ú\s~^´`¨]+$/,
              message: "Nome deve conter somente letras",
            },
          }}
        />

        {errors.name && (
          <ErrorMessageComponent>{errors.name.message}</ErrorMessageComponent>
        )}
        <CustomInput
          control={control}
          name="socialName"
          placeholder="Nome social"
          rules={{
            // required: "Campo Obrigatório",
            maxLength: {
              value: 256,
              message: "O nome não pode exceder 256 caracteres",
            },
            pattern: {
              value: /^[a-zA-Z\s]+$/,
              message: "Nome deve conter somente letras",
            },
          }}
        />

        <CustomInput
          control={control}
          name="email"
          placeholder="E-mail"
          rules={{
            required: "Campo Obrigatório",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "O e-mail inserido é inválido",
            },
          }}
        />
        {errors.email && (
          <ErrorMessageComponent>{errors.email.message}</ErrorMessageComponent>
        )}
        <CustomInput
          control={control}
          name="cpf"
          placeholder="CPF"
          rules={{
            required: "Campo Obrigatório",
            minLength: { value: 14, message: "CPF invalido" },
            validate: (cpfValue) => validateCpf(cpfValue) || "CPF invalido",
          }}
        />
        {errors.cpf && (
          <ErrorMessageComponent>{errors.cpf.message}</ErrorMessageComponent>
        )}
        <CustomPasswordInput
          control={control}
          name="password"
          placeholder="Senha"
          secureTextEntry={true}
          type="password"
          rules={{
            required: true,
            pattern: {
              value:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
              message:
                "Sua senha precisa conter 8 a 20 caracteres incluindo números, letras maiúsculas e minúsculas e caracteres especiais.",
            },
          }}
        />
        {errors.password && (
          <ErrorMessageComponent>
            {errors.password.message || "Campo Obrigatório"}
          </ErrorMessageComponent>
        )}
        <CustomPasswordInput
          control={control}
          name="confirmPassword"
          placeholder="Confirmar Senha"
          secureTextEntry={true}
          type="password"
          rules={{
            required: "Campo Obrigatório",
            validate: (value) =>
              value === passwordValue || "As senhas não coincidem",
          }}
        />
        {errors.confirmPassword && (
          <ErrorMessageComponent>
            {errors.confirmPassword.message}
          </ErrorMessageComponent>
        )}
        <Controller
          control={control}
          rules={{ required: "Deve aceitar termos e condicoes" }}
          name="termsOfUse"
          render={({ field: { onChange, value } }) => (
            <View style={styles.checkBoxContainer}>
              <Checkbox
                value={value}
                onValueChange={(newValue) => {
                  setChecked(newValue);
                  onChange(newValue);
                }}
                color={isChecked ? "#4630EB" : undefined}
              />
              <CustomText style={{ fontSize: 16, color: "#757575" }}>
                Concordo com os
              </CustomText>
              <Link href={"termsAndConditions"}>
                <CustomText
                  style={{
                    fontSize: 16,
                    textDecorationLine: "underline",
                    color: "#757575",
                  }}
                >
                  Termos e Condições
                </CustomText>
              </Link>
            </View>
          )}
        />
        {errors.termsOfUse && (
          <ErrorMessageComponent>Campo Obrigatório</ErrorMessageComponent>
        )}
      </View>
      <CustomButton
        onPress={handleSubmit(handleRegister)}
        type="black"
        disabled={!termsOfUse}
      >
        Cadastre-se
      </CustomButton>

      <CustomText style={{ fontSize: 20, color: "#757575" }}>
        Já tem uma conta?{" "}
        <Link style={{ fontWeight: "bold", color: "#150F02" }} href="/">
          Acessar!
        </Link>
      </CustomText>
      {isConfirmationModal && (
        <ConfirmationModal
          text="Cadastro realizado com sucesso!"
          onPress={() => router.navigate("prefereces")}
          iconClose={() => setIsConfirmationModal(false)}
          style={{ fontSize: 30 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    backgroundColor: "#F7F7F7",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
  },
  checkBoxContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
    marginTop: 5,
    paddingLeft: 5,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
  containerError: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: "auto",
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
    fontSize: 14,
  },
  link: {
    fontWeight: "bold",
    color: "#A92525",
    textDecorationLine: "underline",
    marginHorizontal: 3,
  },
});
