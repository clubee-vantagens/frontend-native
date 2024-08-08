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
              Link de recuperacao enviado!
            </CustomText>
            <View style={styles.containerImage}>
              <Image
                source={require("../../assets/images/imgSendEmail.png")}
                style={styles.ImagemSend}
              />
            </View>
            <CustomText style={styles.modalTextConfirmation}>
              Confira sua caixa de entrada no e-mail as instruções para
              redefinir sua senha.
            </CustomText>
            <View style={styles.ButtonConfirmation}>
              <CustomButtonTwo
                onPress={() => {
                  setIsModalOpen(false);
                  router.navigate("/");
                }}
              >
                Continuar
              </CustomButtonTwo>
            </View>
          </View>
        </View>
      )}

      <View style={{ alignItems: "center", marginTop: 350 }}>
        <CustomText variant="bold" style={styles.text}>
          Redefina sua senha
        </CustomText>
        <CustomText
          style={{
            textAlign: "center",
            width: "70%",
            fontSize: "18",
            marginTop: 60,
          }}
          variant="semiBold"
        >
          Informe seu e-mail de cadastro para receber o link com as instruções.
        </CustomText>
        <CustomInput
          control={control}
          name="email"
          placeholder="Informe seu e-mail"
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
          <ErrorMessageComponent>{errors.email.message}</ErrorMessageComponent>
        )}
      </View>
      <View style={{ alignItems: "center" }}>
        <CustomButton onPress={handleSubmit(onSubmit)}>
          Receber Link
        </CustomButton>
        {isError && (
          <ErrorMessageComponent>Email nao cadastrado</ErrorMessageComponent>
        )}
        <Link href="/" style={{ marginTop: 15, marginBottom: 15 }}>
          <CustomText variant="bold">Voltar ao login</CustomText>
        </Link>
      </View>
      {/* </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F7F7F7",
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
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(52, 52, 52, 0.8)",
    position: "absolute",
    top: 0,
    zIndex: 99,
    alignItems: "center",
  },
  modal: {
    height: 359,
    width: 394,
    backgroundColor: "#FAF9F6",
    alignItems: "center",
    justifyContent: "space-around",
    borderRadius: 20,
    elevation: 5,
    marginTop: 250,
  },
  modalText: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 50,
    // PaddingHorizontal: 29,
    // width: "70%",
  },
  modalTextConfirmation: {
    fontSize: 18,
    marginHorizontal: 40,
    textAlign: "center",
  },
  containerImage: {
    backgroundColor: "rgba(76, 187, 136, 0.50)",
    width: 65,
    height: 65,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 24,
  },
  ImagemSend: {
    width: 48,
    height: 48,
    resizeMode: "contain",
  },
  ButtonConfirmation: {
    marginVertical: 24,
  },
});
