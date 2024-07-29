import { View, StyleSheet, Pressable } from "react-native";
import Constants from "expo-constants";
import { Link, router } from "expo-router";
import Checkbox from "expo-checkbox";
import { MaterialIcons } from "@expo/vector-icons";
import { Controller, useForm } from "react-hook-form";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { useEffect, useState } from "react";
import { maskCpf, validateCpf } from "../utils/utils";
import CustomPasswordInput from "../components/CustomPasswordInput";
import { useMutateUsers } from "../hooks/useMutateUser";
import ConfirmationModal from "../components/ConfirmationModal";
import CustomText from "../components/CustomText";
import ErrorMessageComponent from "../components/ErrorMessageComponent";
import LoadingScreen from "../components/LoadingScreen";

export default function UserSignUpScreen() {
  const [isChecked, setChecked] = useState(false);
  const [isConfirmationModal, setIsConfirmationModal] = useState(false);
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

  const onSubmit = (data) => {
    const dataToPost = {
      ...data,
      termsOfUse: data.termsOfUse,
      dateTermsOfUse: date.toISOString(),
      cnpj: null,
      roles: [],
    };
    mutate(dataToPost);
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
        <CustomInput
          control={control}
          name="name"
          placeholder="Nome"
          rules={{
            required: "Campo Obrigatório",
            maxLength: {
              value: 256,
              message: "O nome fantasia não pode exceder 256 caracteres",
            },
            pattern: {
              value: /^[a-zA-Z\s\u00C0-\u00FF]+$/,
              message: "Nome deve conter somente letras",
            },
          }}
        />
        {errors.name && (
          <ErrorMessageComponent>{errors.name.message}</ErrorMessageComponent>
        )}
        <CustomInput
          control={control}
          name="email"
          placeholder="E-mail"
          rules={{
            required: "Campo Obrigatório",
            maxLength: {value: 50, message: "O e-mail inserido é inválido"},
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
                <CustomText style={{ fontSize: 16, color: "gray" }}>
                  Concordo com os
                </CustomText>
                <CustomText
                  style={{ fontSize: 16, textDecorationLine: "underline" }}
                ><Link href="/termsAndConditions">
                  Termos e Condições
                </Link>
                </CustomText>
              </View>
            )}
          />
          {errors.termsOfUse && (
            <ErrorMessageComponent>Campo Obrigatório</ErrorMessageComponent>
          )}
      </View>
      <CustomButton onPress={handleSubmit(onSubmit)} disabled={!termsOfUse}>Cadastrar-se</CustomButton>
      <CustomText style={{ fontSize: 20, color: "gray" }}>
        Já tem uma conta?{" "}
        <Link style={{ fontWeight: "bold", color: "black" }} href="/">
          Acessar!
        </Link>
      </CustomText>
      {isConfirmationModal && (
        <ConfirmationModal
          text="Cadastro realizado com sucesso!"
<<<<<<< HEAD
          onPress={() => router.navigate("/")}
=======
          onPress={() => router.navigate("/sign-in")}
>>>>>>> f23cd91aaada8f159abdb38d8b8466d559aa5282
          iconClose={() => setIsConfirmationModal(false)}
        />
      )}
      {isError && (
        <ConfirmationModal
          onPress={() => router.navigate("/")}
          iconClose={() => router.navigate("/")}
          text={
            error?.response?.data ||
            "Nao foi possivel realizar o cadastro no momento, tente novamente!"
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    backgroundColor: "#FFFAEB",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
  },
  checkBoxContainer: {
    flexDirection: "row",
    justifyContent: "start",
    gap: 10,
    marginTop: 5,
    paddingLeft: 5,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
});
