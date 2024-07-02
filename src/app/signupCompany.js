import {
  View,
  StyleSheet,
  Pressable,
  Vibration,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { Link, router, useLocalSearchParams, useNavigation } from "expo-router";
import Checkbox from "expo-checkbox";
import { MaterialIcons } from "@expo/vector-icons";
import { Controller, useForm } from "react-hook-form";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import Select from "../components/CustomOption";
import { useEffect, useState } from "react";
import { maskCnpj, maskCpf, validaCNPJ, validateCpf } from "../utils/utils";
import CustomPasswordInput from "../components/CustomPasswordInput";
import ConfirmationModal from "../components/ConfirmationModal";
import CustomText from "../components/CustomText";
import ErrorMessageComponent from "../components/ErrorMessageComponent";
import LoadingScreen from "../components/LoadingScreen";
import { useMutateCompany } from "../hooks/useMutateCompany";

export default function CompanySignUpScreen({ options }) {
  const navigation = useNavigation();

  const [isChecked, setChecked] = useState(false);
  const [isConfirmationModal, setIsConfirmationModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const date = new Date();
  const { mutate, isError, error, isSuccess, status } = useMutateCompany();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      companyName: "",
      email: "",
      password: "",
      cpf: "",
      cnpj: "",
      type: selectedOption,
      termsOfUse: false,
      confirmPassword: "",
    },
  });
  const inputValue = watch("cnpj");
  const passwordValue = watch("password");
  const termsOfUse = watch("termsOfUse", false);

  useEffect(() => {
    if (isSuccess) {
      reset();
      setIsConfirmationModal(true);
      navigation.navigate("Login");
    }
  }, [isSuccess]);

  useEffect(() => {
    setValue("cnpj", maskCnpj(inputValue));
  }, [inputValue]);

  const onSubmit = (data) => {
    const dataToPost = {
      ...data,
      termsOfUse: data.termsOfUse,
      dateTermsOfUse: date.toISOString(),
      contactPhone: "",
    };
    mutate(dataToPost);
  };

  const onInvalid = () => {
    Vibration.vibrate(300);
  };

  if (status === "pending") {
    return <LoadingScreen />;
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={{ alignSelf: "flex-start", margin: 25 }}>
          <Pressable onPress={() => router.navigate("/")}>
            <MaterialIcons name="arrow-back-ios-new" size={30} color="black" />
          </Pressable>
        </View>

        <CustomText style={{ fontSize: 30 }} variant="semiBold">
          Sou Empresa
        </CustomText>

        <View>
          <CustomInput
            control={control}
            name="companyName"
            placeholder="Nome fantasia"
            rules={{
              required: "Campo Obrigatório",
              maxLength: {
                value: 256,
                message: "O nome fantasia não pode exceder 256 caracteres",
              },
              pattern: {
                value: /^[a-zA-Z\s]+$/,
                message: "Nome deve conter somente letras",
              },
            }}
          />
          {errors.companyName && (
            <ErrorMessageComponent>
              {errors.companyName.message}
            </ErrorMessageComponent>
          )}
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
          <CustomInput
            control={control}
            name="cnpj"
            placeholder="CNPJ"
            rules={{
              required: "Campo Obrigatório",
              minLength: { value: 18 },
              validate: (inputValue) => validaCNPJ(inputValue),
            }}
          />
          {errors?.cnpj && (
            <ErrorMessageComponent>{errors?.cnpj.message}</ErrorMessageComponent>
          )}
          <Controller
            control={control}
            rules={{ required: "Campo Obrigatório" }}
            render={({ field: { onChange, value } }) => (
              <Select
                selectedValue={value}
                options={[
                  { label: "Alimentação", value: "alimentacao" },
                  { label: "Cosméticos/Perfumaria", value: "cosmeticos" },
                  { label: "Mecânico", value: "mecanico" },
                  {
                    label: "Produtos Artesanais",
                    value: "produtos artesanais",
                  },
                  { label: "Sapato", value: "sapato" },
                  { label: "Vestuário", value: "vestuario" },
                  { label: "Outro", value: "outro" },
                ]}
                onChangeSelect={onChange}
              />
            )}
            name="type"
            defaultValue={"undefined"}
          />

          {errors.type && (
            <ErrorMessageComponent>{errors.type.message}</ErrorMessageComponent>
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
              required: "Campo Obrigatorio",
              validate: (value) =>
                value === passwordValue || "As senhas nao coincidem",
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
                >
                  <Link href="/termsAndConditions">Termos e Condições</Link>
                </CustomText>
              </View>
            )}
          />
          {errors.termsOfUse && (
            <ErrorMessageComponent>Campo Obrigatório</ErrorMessageComponent>
          )}
        </View>

        <CustomButton
          onPress={handleSubmit(onSubmit, onInvalid)}
          disabled={!termsOfUse}
        >
          Cadastrar-se
        </CustomButton>

        <CustomText style={{ fontSize: 20, color: "gray" }}>
          Já tem uma conta?{" "}
          <Link style={{ fontWeight: "bold", color: "black" }} href="/">
            Acessar!
          </Link>
        </CustomText>
        {isConfirmationModal && (
          <ConfirmationModal
            text="Cadastro realizado com sucesso!"
            onPress={() => router.navigate("/home")}
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
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: "#FFFAEB",
  },
  scrollViewContent: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
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
