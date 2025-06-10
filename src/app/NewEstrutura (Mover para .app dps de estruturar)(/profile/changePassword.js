import { useState } from "react";
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Alert,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "expo-router";
import { CaretLeft } from "phosphor-react-native";
import { useChangePassword } from "../../../hooks/useChangePassword";
import CustomText from "../../../components/CustomText";
import theme from "../../../themes/themes";
import CustomPasswordInput from "../../../components/CustomPasswordInput";
import CustomButtonTwo from "../../../components/CustomButtonTwo";
import ConfirmationModal from "../../../components/ConfirmationModal";
import { useSession } from "../../../context/ctx";
import { statusBarHeight } from "../../../constants/constants";

const ChangePassword = () => {
  const [isModalConfirm, setIsModalConfirm] = useState(false);
  const { session } = useSession();
  const { mutate, isError, error, isSuccess } = useChangePassword();
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const router = useRouter();
  const newPassword = watch("newPassword");

  const onSubmit = (data) => {
    if (data.newPassword !== data.confirmPassword) {
      Alert.alert("Erro", "As senhas não coincidem.");
      return;
    }

    console.log("Enviando dados para alteração de senha:", {
      newPassword: data.newPassword,
      token: session,
    });

    mutate(
      {
        newPassword: data.newPassword,
        token: session,
      },
      {
        onSuccess: () => setIsModalConfirm(true),
        onError: (error) =>
          Alert.alert("Erro", error.message || "Erro ao alterar senha"),
      }
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Pressable onPress={() => router.back()} style={{marginBottom: 20}}>
          <CaretLeft size={24} />
        </Pressable>
        <View style={styles.title}>
          <CustomText fontSize={24} variant="bold">
            Alteração de senha
          </CustomText>
        </View>
        <CustomPasswordInput
          control={control}
          name="oldPassword"
          placeholder="Senha antiga"
          type="password"
          rules={{ required: "Senha antiga é obrigatória" }}
        />
        {errors.oldPassword && (
          <CustomText style={styles.errorText}>
            {errors.oldPassword.message}
          </CustomText>
        )}

        <CustomPasswordInput
          control={control}
          name="newPassword"
          placeholder="Nova senha"
          type="password"
          rules={{
            required: "Nova senha é obrigatória",
            minLength: {
              value: 8,
              message: "A senha deve ter pelo menos 8 caracteres",
            },
          }}
        />
        {errors.newPassword && (
          <CustomText style={styles.errorText}>
            {errors.newPassword.message}
          </CustomText>
        )}

        <CustomPasswordInput
          control={control}
          name="confirmPassword"
          placeholder="Confirmar senha"
          type="password"
          rules={{
            required: "Confirmação de senha é obrigatória",
            validate: (value) =>
              value === newPassword || "As senhas não coincidem",
          }}
        />
        {errors.confirmPassword && (
          <CustomText style={styles.errorText}>
            {errors.confirmPassword.message}
          </CustomText>
        )}
      </View>

      {isError && (
        <CustomText variant="semibold" style={styles.errorText}>
          {error.message || "Erro ao alterar senha"}
        </CustomText>
      )}
      <View style={styles.btnControl}>
        <CustomButtonTwo variant='extraWide' onPress={handleSubmit(onSubmit)}>
          Salvar
        </CustomButtonTwo>
        <Pressable onPress={() => router.back()}>
          <CustomText
            variant="bold"
            fontSize={18}
            style={{ color: theme.colors.msgErro, marginTop: 20 }}
          >
            Cancelar
          </CustomText>
        </Pressable>
      </View>
      {isModalConfirm && (
        <ConfirmationModal
          iconClose={() => {
            setIsModalConfirm(false);
            router.back();
          }}
          text="Senha alterada com sucesso!"
          style={{ fontSize: 30 }}
        />
      )}
    </SafeAreaView>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.bgWhite,
    justifyContent: "space-between",
    padding: 8,
    marginTop: statusBarHeight
  },
  title: {
    marginBottom: 20
  },
  btnControl: {
    alignItems: "center",
  },
  errorText: {
    color: theme.colors.msgErro,
    fontSize: 14,
    marginBottom: theme.spacing.small,
  },
  modalContent: {
    fontSize: 30,
  },
});
