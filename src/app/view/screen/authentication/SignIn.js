import React from 'react';
import { View, TextInput, Pressable, StyleSheet, KeyboardAvoidingView, Platform, Image, ScrollView } from 'react-native';
import { Link } from "expo-router";
import { scale, verticalScale } from "react-native-size-matters";
import { useForm, Controller } from 'react-hook-form';
import CustomText from '../../../../components/CustomText';

const SignIn = () => {

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = data => {
    console.log('Form válido:', data);
    // aqui você pode chamar sua API, navegar etc.
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

        <View style={styles.containerLoginInput}>
          <TextInput
            name="email"
            placeholder="Informe seu e-mail"
            keyboardType="email-address"
            style={styles.input}
            autoCapitalize="none"
          />
          <TextInput
            name="password"
            placeholder="Senha"
            secureTextEntry
            style={styles.input}
          />

          <CustomText style={styles.forgotPassword}>Esqueceu a senha?</CustomText>
        </View>

        <Pressable onPress={() => { console.log("oi") }} style={styles.entrarButton}>
          <CustomText style={styles.entrarText}>Entrar</CustomText>
        </Pressable>

        <View>
          <CustomText style={styles.cadastroText}>
            Não tem Cadastro? <Link href="/signup"><CustomText style={styles.cadastroInsideText}>Cadastre-se agora!</CustomText></Link>
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
    marginTop: 10,
    resizeMode: "contain",
  },

  containerLoginInput: {
    marginTop: -45
  },
  input: {
    width: scale(280),
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  forgotPassword: {
    marginTop: 15,
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
  }
});

export default SignIn;
