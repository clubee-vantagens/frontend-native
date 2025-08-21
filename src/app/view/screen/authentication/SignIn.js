import React, { useEffect, useCallback } from 'react';
import { View, Pressable, StyleSheet, KeyboardAvoidingView, Platform, Image, ScrollView, BackHandler, Alert } from 'react-native';
import { Link, router, useFocusEffect } from "expo-router";
import { scale, verticalScale, moderateVerticalScale } from "react-native-size-matters";
import { useForm } from 'react-hook-form';
import CustomText from '../../../../components/CustomText';
import CustomInput from '../../../../components/SignUp-comps/CustomInput';
import { Fontisto } from '@expo/vector-icons';
import { useSession } from "../../../../context/ctx";
import useBackExitPrompt from '../../../../hooks/useBackExitPrompt';


const SignIn = () => {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const { signIn, session, error, setError } = useSession();

  // Metodo responsável por exibir tela de "Sair?" ao clicar para voltar na tela de login
  useBackExitPrompt("Tem certeza que deseja sair?");

  // Reseta erros antigos que estiverem na tela ao entrar nela
  useFocusEffect(
    useCallback(() => {
      setError(null);
    }, [])
  );

  // Redirecionamento pro menu
  useEffect(() => {
    if (session) {
      router.replace("/menu");
    }
  }, [session]);

  // Metodo responsável por mandar os dados de login pro endpoint
  const handleLogin = async data => {
    setError(null);
    try {
      await signIn(data.email, data.password);
      // redirecionamento fica no useEffect com session
    } catch (error) {
      setError(error)
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View>
          <Image style={styles.containerImage} source={require('../../../../assets/images/novoLogo.png')} />
        </View>

        {error && (
          <View style={styles.containerError}>
            <View style={styles.contentError}>
              <Fontisto
                name="close"
                size={24}
                color="rgba(169, 37, 37, 1)"
                style={styles.icon}
              />
              <CustomText style={styles.errorMessage}>Oops! Senha ou E-mail incorretos. Gostaria de <Link href="/passwordRecovery" style={{ textDecorationLine: 'underline' }}>recuperar seu acesso?</Link></CustomText>
            </View>
          </View>
        )}

        <View style={styles.containerLoginInput}>
          <CustomInput
            name="email"
            placeholder="Digite seu e-mail"
            control={control}
            autoCapitalize="none"
            rules={{
              required: "Campo Obrigatório",
              maxLength: {
                value: 50,
                message: "Atenção! E-mail não pode ultrapassar 50 caracteres",
              },
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "O e-mail inserido é inválido",
              }
            }}
            errors={errors}
          />

          <CustomInput
          name="password"
          placeholder="Senha"
          control={control}
          autoCapitalize="none"
          secureTextEntry={true}
          rules={{
            required: "Campo Obrigatório",
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
              message: "A senha deve conter: letra maiúscula, minúscula, número e caractere especial",
            },
          }}
          errors={errors}
          />

          <CustomText style={styles.forgotPassword}><Link href="/passwordRecovery">Esqueceu a senha?</Link></CustomText>
        </View>

        <Pressable onPress={handleSubmit(handleLogin)} style={styles.entrarButton}>
          <CustomText style={styles.entrarText}>Entrar</CustomText>
        </Pressable>

        <View>
          <CustomText style={styles.cadastroText}>
            Não tem Cadastro? <Link href="/SignUp"><CustomText style={styles.cadastroInsideText}>Cadastre-se agora!</CustomText></Link>
          </CustomText>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(247, 247, 247, 1)',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 20,
  },
  containerImage: {
    width: scale(230),
    height: verticalScale(325),
    resizeMode: "contain",
  },
  containerLoginInput: {
    marginTop: -45,
    width: scale(300),
  },
  forgotPassword: {
    marginTop: 15,
    marginRight: 20,
    textAlign: 'right',
    textDecorationLine: 'underline',
    color: "rgba(117, 117, 117, 1)",
  },
  entrarButton: {
    marginTop: 40,
    borderWidth: 1,
    borderRadius: 30,
    backgroundColor: "rgba(21, 15, 2, 1)",
    width: verticalScale(120),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  entrarText: {
    fontSize: 18,
    color: "rgba(247, 245, 245, 1)",
    textAlign: 'center',
    fontWeight: 'bold',
    paddingVertical: 6
  },
  cadastroText: {
    marginTop: 100,
    fontSize: 17
  },
  cadastroInsideText: {
    fontWeight: 'bold'
  },
  containerError: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: scale(270),
    height: moderateVerticalScale(80),
    borderRadius: 10,
    backgroundColor: "rgba(251, 80, 80, 0.25)",
    padding: 10,
    marginTop: scale(-90),
    marginBottom: 65
  },
  contentError: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    fontSize: 14,
  },
  errorMessage: {
    flex: 1,
    fontSize: 14,
    marginLeft: 10,
    color: "rgba(169, 37, 37, 1)"
  },
});

export default SignIn;