import { View, StyleSheet, Pressable, Vibration } from "react-native";
import { Link, router } from "expo-router";
import Checkbox from "expo-checkbox";
import { MaterialIcons } from "@expo/vector-icons";
import { useForm } from "react-hook-form";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import Select from "../components/CustomOption";
import { useEffect, useState } from "react";
import { maskCnpj } from "../utils/utils";
import CustomPasswordInput from "../components/CustomPasswordInput";
import { useMutateUsers } from "../hooks/useMutateUser";
import ConfirmationModal from "../components/ConfirmationModal";
import CustomText from "../components/CustomText";
import ErrorMessageComponent from "../components/ErrorMessageComponent";
import LoadingScreen from "../components/LoadingScreen";
import { useNavigation } from "expo-router";

export default function CompanySignUpScreen({ options }) {
  const navigation = useNavigation();

  const [isChecked, setChecked] = useState(false);
  const [isConfirmationModal, setIsConfirmationModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

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
      razaoSocial: "",
      nomeFantasia: "",
      email: "",
      password: "",
      cnpj: "",
      segment: "",
      termsOfUse: false,
      confirmPassword: "",
    },
  });

  const cnpjValue = watch("cnpj");
  const passwordValue = watch("password");

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
    if (isSuccess) {
      reset();
      setIsConfirmationModal(true);
      navigation.navigate("Login");
    }
  }, [isSuccess]);

  useEffect(() => {
    setValue("cnpj", maskCnpj(cnpjValue));
  }, [cnpjValue]);

  const onSubmit = (data) => {
    const dataToPost = {
      ...data,
      termsOfUse: isChecked,
      dateTermsOfUse: date.toISOString(),
      cnpj: null,
      roles: [],
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
    <View style={styles.container}>
      <View style={{ alignSelf: "flex-start", marginLeft: 25 }}>
        <Pressable onPress={() => router.navigate("/")}>
          <MaterialIcons name="arrow-back-ios-new" size={30} color="black" />
        </Pressable>
      </View>

      <CustomText style={{ fontSize: 30 }} variant="semiBold">
        Cadastro
      </CustomText>

      <View>
        <CustomInput
          control={control}
          name="razaoSocial"
          placeholder="Razão Social"
        />
        {errors.razaoSocial && (
          <ErrorMessageComponent>
            {errors.razaoSocial.message}
          </ErrorMessageComponent>
        )}
        <CustomInput
          control={control}
          name="nomeFantasia"
          placeholder="Nome fantasia"
        />
        {errors.nomeFantasia && (
          <ErrorMessageComponent>
            {errors.nomeFantasia.message}
          </ErrorMessageComponent>
        )}
        <CustomInput control={control} name="email" placeholder="E-mail" />
        {errors.email && (
          <ErrorMessageComponent>{errors.email.message}</ErrorMessageComponent>
        )}
        <CustomInput control={control} name="cnpj" placeholder="CNPJ" />
        {errors.cnpj && (
          <ErrorMessageComponent>{errors.cnpj.message}</ErrorMessageComponent>
        )}

        <Select
          name="segment"
          control={control}
          options={[
            { label: "Alimentos", value: "alimentos" },
            { label: "Bebidas", value: "bebidas" },
            { label: "Roupas", value: "roupas" },
          ]}
          onChangeSelect={(itemValue) => setValue("segment", itemValue)}
        />

        {errors.segment && (
          <ErrorMessageComponent>
            {errors.segment.message}
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
            pattern: {
              value:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
              message:
                "A senha deve ter pelo menos 8 caracteres, incluir pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial",
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
        <View style={styles.checkBoxContainer}>
          <Checkbox
            value={isChecked}
            onValueChange={setChecked}
            color={isChecked ? "#4630EB" : undefined}
          />
          <CustomText style={{ fontSize: 16, color: "gray" }}>
            Concordo com os
          </CustomText>
          <CustomText style={{ fontSize: 16, textDecorationLine: "underline" }}>
            Termos e Condições
          </CustomText>
        </View>
        {errors.name && (
          <ErrorMessageComponent>Campo Obrigatório</ErrorMessageComponent>
        )}
      </View>

      <CustomButton onPress={handleSubmit(onSubmit, onInvalid)}>
        Cadastrar-se
      </CustomButton>

      <CustomText style={{ fontSize: 20, color: "gray" }}>
        Já tem uma conta?{" "}
        <Link style={{ fontWeight: "bold", color: "black" }} href="/login">
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
          onPress={() => router.back()}
          iconClose={() => router.back()}
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
    paddingTop: 20,
    backgroundColor: "#FFFAEB",
    flexDirection: "column",
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
