import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { CaretLeft } from "phosphor-react-native";
import React from "react";
import CustomText from "../../components/CustomText";
import theme from "../../themes/themes";
import CustomPasswordInput from "../../components/CustomPasswordInput";
import CustomButtonTwo from "../../components/CustomButtonTwo";

const ChangePassword = () => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();


  const navigation = useNavigation();

  // Observa o valor do campo "newPassword" para validação de confirmação
  const newPassword = watch("newPassword");

  // Função de submissão do formulário
  const onSubmit = (data) => {
    if (data.newPassword !== data.confirmPassword) {
      alert("As senhas não coincidem.");
      return;
    }
    // Lógica para salvar a nova senha
    alert("Senha alterada com sucesso!");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Pressable onPress={() => navigation.goBack()}>
        <CaretLeft size={32} />
      </Pressable>

      <View style={styles.title}>
        <CustomText fontSize={24} variant="bold">
          Alteração de senha
        </CustomText>
      </View>

      <View>
        <CustomPasswordInput
          control={control}
          name="oldPassword"
          placeholder="Senha antiga"
          type="password"
          rules={{ required: "Senha antiga é obrigatória" }}
        />
        {errors.oldPassword && (
          <Text style={styles.errorText}>{errors.oldPassword.message}</Text>
        )}

        <CustomPasswordInput
          control={control}
          name="newPassword"
          placeholder="Nova senha"
          type="password"
          rules={{
            required: "Nova senha é obrigatória",
            minLength: {
              value: 6,
              message:
                "A senha deve ter pelo menos 8 caracteres e no máximo 20",
            },
          }}
        />
        {errors.newPassword && (
          <Text style={styles.errorText}>{errors.newPassword.message}</Text>
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
          <Text style={styles.errorText}>{errors.confirmPassword.message}</Text>
        )}
      </View>

      <View style={styles.btnControl}>
        <CustomButtonTwo variant="bold" onPress={handleSubmit(onSubmit)}>
          Salvar
        </CustomButtonTwo>
        <Pressable onPress={() => navigation.goBack()}>
          <CustomText
            variant="bold"
            fontSize={18}
            style={{ color: theme.colors.msgErro, marginTop: 20 }}
          >
            Cancelar
          </CustomText>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: theme.spacing.extraLarge,
    backgroundColor: theme.colors.bgWhite,
  },
  title: {
    marginTop: theme.spacing.medium,
  },
  btnControl: {
    alignItems: "center",
    marginTop: theme.spacing.extraLarge,
  },
  errorText: {
    color: theme.colors.msgErro,
    fontSize: 14,
    marginBottom: theme.spacing.small,
  },
});
