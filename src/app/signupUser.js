import { Text, View, StyleSheet, Pressable } from "react-native";
import Constants from "expo-constants";
import { Link, router } from "expo-router";
import Checkbox from "expo-checkbox";
import { MaterialIcons } from "@expo/vector-icons";
import { useForm } from "react-hook-form";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { useEffect, useState } from "react";
import { maskCpf } from "../utils/utils";
import CustomPasswordInput from "../components/CustomPasswordInput";
import { useMutateUsers } from "../hooks/useMutateUser";
import ConfirmationModal from "../components/ConfirmationModal";
import CustomText from "../components/CustomText";

export default function UserSignUpScreen() {
  const [isChecked, setChecked] = useState(false);
  const [isConfirmationModal, setIsConfirmationModal] = useState(false);
  const date = new Date();
  const { mutate, isError, error, isSuccess } = useMutateUsers();
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
      termsOfUse: isChecked,
      dateTermsOfUse: date.toISOString(),
      cnpj: null,
      roles: [],
    };
    mutate(dataToPost);
  };

  return (
    <View style={styles.container}>
      <View style={{ alignSelf: "flex-start", marginLeft: 25 }}>
        <Pressable onPress={() => router.navigate("/")}>
          <MaterialIcons name="arrow-back-ios-new" size={30} color="black" />
        </Pressable>
      </View>
      <CustomText style={{ fontSize: 30 }} variant="semiBold">Sou Cliente</CustomText>
      <View>
        <CustomInput control={control} name="name" placeholder="Nome" />
        {errors.name && <CustomText style={styles.errorText}>Campo obrigatório</CustomText>}
        <CustomInput control={control} name="email" placeholder="E-mail" />
        {errors.email && (
          <CustomText style={styles.errorText}>Campo obrigatório</CustomText>
        )}
        <CustomInput control={control} name="cpf" placeholder="CPF" />
        {errors.cpf && <CustomText style={styles.errorText}>Campo obrigatório</CustomText>}
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
          <CustomText style={styles.errorText}>{errors.password.message || 'Campo obrigatorio'}</CustomText>
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
          <CustomText style={styles.errorText}>{errors.confirmPassword.message}</CustomText>
        )}
        <View style={styles.checkBoxContainer}>
          <Checkbox
            value={isChecked}
            onValueChange={setChecked}
            color={isChecked ? "#4630EB" : undefined}
          />
          <CustomText style={{ fontSize: 16, color: "gray" }}>Concordo com os</CustomText>
          <CustomText style={{ fontSize: 16, textDecorationLine: "underline" }}>
            Termos e Condições
          </CustomText>
        </View>
        {errors.name && <CustomText style={styles.errorText}>Campo obrigatório</CustomText>}
      </View>
      <CustomButton onPress={handleSubmit(onSubmit)}>Cadastrar-se</CustomButton>
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
        <CustomText style={styles.errorText}>
          {error?.response?.data || "Erro inesperado"}
        </CustomText>
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
