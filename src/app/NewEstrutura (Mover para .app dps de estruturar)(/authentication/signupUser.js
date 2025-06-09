import React, { useState} from 'react';
import { Link, router } from "expo-router";
import { StyleSheet, View, Pressable, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { MaterialIcons } from "@expo/vector-icons";
import { scale, moderateVerticalScale } from "react-native-size-matters";
import { useForm, Controller } from 'react-hook-form';
import { validateCpf } from "../../../../utils/utils";
import { Fontisto } from '@expo/vector-icons';
import Checkbox from "expo-checkbox";
import CustomText from '../../../../components/CustomText';
import CustomInput from '../../../../components/SignUp-comps/CustomInput';
import { useRegisterUser } from '../../../../hooks/useUserService';
import { useSession } from "../../../../context/ctx";
import ModalSignUpConfirmation from '../../../../components/SignUp-comps/ModalSignUpConfirmation';
import ModalTermsAndConditions from '../../../../components/SignUp-comps/ModalTermsAndConditions';

const signupUser = () => {
  const { control, handleSubmit, formState: { errors }, getValues } = useForm();
  const [isChecked, setChecked] = useState(false);
  const { signIn, error, setError } = useSession();

  // variaveis de visualização de modal
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isTermsModalVisible, setIsTermsModalVisible] = useState(false);

  const registerMutation = useRegisterUser();

  const submitCadastrar = (data) => {
    // Remover confirmPassword do objeto
    const { confirmPassword, ...userData } = data;

    const userDataMockado = {
      name: userData.name,
      socialName: userData.socialName,
      email: userData.email,
      password: userData.password,
      cpf: userData.cpf,
      termsOfUse: userData.termsOfUse,
      phoneNumber: "(11)98176-5432",
      preferences: ["Alimentação", "Papelaria", "Livraria"],
      cep: "79085087",
      birthDate: "15/05/1990",
      photo: "https://example.com/photo.jpg",
      addressNumber: 150,
      complement: "Apto 42"
    };
  
    // Chama a mutation para cadastro (endpoint de cadastro)
    registerMutation.mutate(userDataMockado, {
      onSuccess: (response) => {
        // Define a mensagem do modal
        setModalMessage("Cadastro realizado com sucesso!");
        
        // Realiza login após cadastro para levar a tela de preferencias
        signIn(userData.email, userData.password)
          .then(() => {
            setIsModalVisible(true);
          })
          .catch((loginError) => {
            setError(loginError);
            setModalMessage("Erro ao realizar login após cadastro.");
            setIsModalVisible(true);
          });
      },
      onError: (error) => {
        const errorMessage = error.response?.data.message;

        // Regex para validar email
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        // Regex para validar CPF (no formato 123.456.789-00 ou 12345678900)
        const cpfRegex = /^\d{11}$/;

        // Verifica se o erro é um email ou CPF
        if (emailRegex.test(errorMessage)) {
          setError({
            type: 'email',
            message: `Usuário já cadastrado com o e-mail: ${errorMessage}`
          });
        } else if (cpfRegex.test(errorMessage)) {
          setError({
            type: 'cpf',
            message: `O CPF ${errorMessage} já está cadastrado. Verifique os dados ou entre em contato.`
          });
        } else {
          setError({
            type: 'generic',
            message: errorMessage || "Ocorreu um erro inesperado. Tente novamente."
          });
        }
      },
    });
  };


  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}>

        <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        >
          <View style={{ alignSelf: "flex-start", marginLeft: 25 }}>
            <Link href="/signup">
              <MaterialIcons name="arrow-back-ios-new" size={30} color="black" />
            </Link>
          </View>
          
          <View>
              <CustomText variant="semiBold" style={{ fontSize: scale(30) }}>Sou Cliente</CustomText>
          </View>

          {/* Janela de erro com mensagens personalizadas dependendo do retorno da API */}
          {error && (
            <View style={styles.containerError}>
              <View style={styles.contentError}>
                <Fontisto
                  name="close"
                  size={24}
                  color="rgba(169, 37, 37, 1)"
                  style={styles.icon}
                />
                <CustomText style={styles.errorMessage}>
                  {error.type === 'email' ? (
                    <>
                      Usuário já cadastrado. Selecione{" "}
                      <CustomText style={{ color: "rgba(169, 37, 37, 1)", fontWeight: 'bold' }}>“Acessar”</CustomText>{" "}
                      para{" "}
                      <CustomText style={{ color: "rgba(169, 37, 37, 1)", fontWeight: 'bold', textDecorationLine: 'underline' }}>entrar</CustomText>{" "}
                      ou{" "}
                      <CustomText style={{ color: "rgba(169, 37, 37, 1)", fontWeight: 'bold', textDecorationLine: 'underline' }}>redefinir sua senha.</CustomText>
                    </>
                  ) : error.type === 'cpf' ? (
                    "O CPF já está cadastrado. Verifique os dados ou entre em contato."
                  ) : (
                    "Oops! Algo deu errado. Tente novamente mais tarde."
                  )}
                </CustomText>
              </View>
            </View>
          )}

          {/* Formulário para Cadastro */}
          <View style={styles.containerSignUp}>
            <CustomInput
              name="name"
              placeholder="Nome Completo"
              control={control}
              autoCapitalize="none"
              rules={{
                required: "Campo Obrigatório",
                maxLength: {
                  value: 70,
                  message: "O nome não pode exceder 70 caracteres",
                },
                pattern: {
                  value: /^[a-zA-Zà-úÀ-Ú\s~^´`¨]+$/,
                message: "Nome deve conter somente letras",
                }
              }}
              errors={errors}
            />

            <CustomInput
              name="socialName"
              placeholder="Nome social/Apelido"
              control={control}
              autoCapitalize="none"
              rules={{
                maxLength: {
                  value: 70,
                  message: "O nome não pode exceder 70 caracteres",
                },
                pattern: {
                  value: /^[a-zA-Zà-úÀ-Ú\s~^´`¨]+$/,
                  message: "Nome deve conter somente letras",
                }
              }}
              errors={errors}
            />

            <CustomInput
              name="email"
              placeholder="E-mail"
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
              name="cpf"
              placeholder="CPF"
              control={control}
              autoCapitalize="none"
              keyboardType="numeric"
              rules={{
                required: "Campo Obrigatório",  
                validate: {
                  isValidCPF: (value) => {
                    if (!validateCpf(value)) {
                      return "O CPF inserido é inválido";
                    }
                    return true;
                  },
                },
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
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message: "Sua senha deve conter mais de 8 caracteres, incluindo números, letras maiúsculas e minúsculas e caracteres especiais",
                },
              }}
              errors={errors}
            />

            <CustomInput
              name="confirmPassword"
              placeholder="Confirmar Senha"
              control={control}
              autoCapitalize="none"
              secureTextEntry={true}
              rules={{
                required: "Campo Obrigatório",
                validate: value =>
                  value === getValues('password') || 'As senhas não coincidem',
              }}
              errors={errors}
            />
            
            <Controller
              control={control}
              rules={{ required: "Deve aceitar termos e condições" }}
              name="termsOfUse"
              render={({ field: { onChange, value } }) => (
                <View style={styles.checkBoxContainer}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Checkbox
                      value={value}
                      onValueChange={onChange}
                      color={value ? "#F5C330" : undefined}
                    />
                    <CustomText
                      style={{ marginTop: 3, fontSize: 16, color: "rgba(117, 117, 117, 1)", marginLeft: 8 }}
                    >
                      Concordo com os
                    </CustomText>
                    <Pressable onPress={() => setIsTermsModalVisible(true)}>
                      <CustomText
                        style={{
                          marginTop: 3,
                          fontSize: 16,
                          textDecorationLine: "underline",
                          color: "rgba(117, 117, 117, 1)",
                          marginLeft: 4,
                        }}
                      >
                        Termos e Condições
                      </CustomText>
                    </Pressable>
                  </View>

                  {/* Mensagem de erro abaixo da linha */}
                  {errors?.termsOfUse && (
                    <CustomText style={styles.errorText}>{errors.termsOfUse.message}</CustomText>
                  )}
                </View>
              )}
            />
            {/* Fim do Formulário para Cadastro */}

            <View>
              <Pressable onPress={handleSubmit(submitCadastrar)} style={styles.signUpButton}>
                <CustomText style={styles.signUpText}>Cadastrar-se</CustomText>
              </Pressable>
            </View>
            
            <CustomText style={styles.signUpLinkText}>
              Já tem uma conta?{" "}
              <Link href="/signin" style={styles.linkText}>Acessar!</Link>
            </CustomText>
          </View>

          <ModalSignUpConfirmation
            visible={isModalVisible}
            onPress={() => {
              router.navigate("preferences");
            }} // Fecha o modal
            message={modalMessage}
          />

          <ModalTermsAndConditions 
            isVisible={isTermsModalVisible} 
            onClose={() => setIsTermsModalVisible(false)} 
          />
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
    paddingTop: 50,
    zIndex: 10
  },
  containerSignUp: {
    width: scale(330),
  },
  signUpButton: {
    alignSelf: 'center',
    borderWidth: 1,
    backgroundColor: "rgba(21, 15, 2, 1)",
    borderColor: "rgba(21, 15, 2, 1)",
    borderRadius: 30,
    width: 315,
    marginTop: 50,
    paddingVertical: 10,
    zIndex: 10,
  },
  signUpText: {
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold',
    color: "rgba(255, 255, 255, 1)"
  },
  signUpLinkText: {
    fontSize: 22,
    color: "rgba(117, 117, 117, 1)",
    textAlign: 'center',
    marginTop: 30
  },
  linkText: {
    fontWeight: 'bold',
    color: "rgba(21, 15, 2, 1)",
    textAlign: 'center',
  },
  
  checkBoxContainer: {
    alignItems: "flex-start",
    gap: 3,
    marginTop: 5,
    paddingLeft: 16,
    width: scale(300),
  },
  errorText: {
    textAlign: "left",
    color: "red",
    marginLeft: 8,
    marginTop: -5,
    marginBottom: 3,
    fontSize: 13
  },

  containerError: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: scale(296),
    height: moderateVerticalScale(80),
    borderRadius: 10,
    backgroundColor: "rgba(251, 80, 80, 0.25)",
    padding: 10,
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
})

export default signupUser;