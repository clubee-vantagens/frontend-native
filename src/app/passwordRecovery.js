import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";
import CustomText from "../components/CustomText";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { useForm } from "react-hook-form";
import { Link, router } from "expo-router";
import { usePasswordRecovery } from "../hooks/usePasswordRecovery";
import { useEffect, useState } from "react";
import CustomButtonTwo from "../components/CustomButtonTwo";
import LoadingScreen from "../components/LoadingScreen";
import ErrorMessageComponent from "../components/ErrorMessageComponent";

export default function PasswordRecoveryScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm({ defaultValues: { email: "" } });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { mutate, isSuccess, status, isError } = usePasswordRecovery();
  const onSubmit = (data) => {
    mutate(data);
  };

  useEffect(() => {
    if (isSuccess) {
      reset();
      setIsModalOpen(true);
    }
  }, [isSuccess]);
  if (status === "pending") {
    return <LoadingScreen />;
  }

  return (
    <View style={styles.container}>
      {isModalOpen && (
        <View style={styles.confirmation}>
          <View style={styles.modal}>
            <CustomText variant="bold" style={styles.modalText}>
              Pronto! Pode ir lá conferir a sua caixa de entrada!
            </CustomText>
            <CustomText style={styles.modalText}>
              Foi enviado para seu e-mail as instruções para redefinir sua
              senha.
            </CustomText>
            <CustomButtonTwo
              onPress={() => {
                setIsModalOpen(false);
                router.navigate("/");
              }}
            >
              Voltar ao login
            </CustomButtonTwo>
          </View>
        </View>
      )}
      <View
        style={{
          alignItems: "center",
          padding: 10,
          justifyContent: "space-around",
          width: "80%",
          height: "70%",
        }}
      >
        <Image
          style={styles.image}
          source={require("@/assets/images/Clubee_logo_only_bee.png")}
        />
        <CustomText variant="bold" style={styles.text}>
          Redefinir senha
        </CustomText>
        <CustomText
          style={{ textAlign: "center", width: "75%", fontSize: "18" }}
        >
          Para redefinir sua senha, informe o e-mail cadastrado na sua conta e
          lhe enviaremos um link com as instruções.
        </CustomText>
        <CustomInput
          control={control}
          name="email"
          placeholder="Informe seu e-mail"
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
        <CustomButton onPress={handleSubmit(onSubmit)} type="red">
          Enviar Link
        </CustomButton>
        {isError && <ErrorMessageComponent>Email nao cadastrado</ErrorMessageComponent>}
      </View>
      <Link href="/">
        <CustomText variant="bold" style={{ textDecorationLine: "underline" }}>
          Voltar ao login
        </CustomText>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#FFFAEB",
  },
  image: {
    width: 168,
    height: 136,
    marginTop: 50,
    contentFit: "contain",
  },
  text: {
    fontSize: 30,
  },
  confirmation: {
    height: "80%",
    width: "100%",
    backgroundColor: "#fff",
    position: "absolute",
    top: "35%",
    zIndex: 99,
    backgroundColor: "#FFFAEB",
    alignItems: "center",
  },
  modal: {
    height: 339,
    width: 331,
    backgroundColor: "#6FF79A4D",
    alignItems: "center",
    borderRadius: 10,
    justifyContent: "space-around",
  },
  modalText: {
    fontSize: 20,
    textAlign: "center",
    width: "70%",
  },
});
