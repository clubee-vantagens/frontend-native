import { StyleSheet, SafeAreaView, View, Pressable, Dimensions } from "react-native";
import CustomText from "../../components/CustomText";
import { router } from "expo-router";
import React, { useState } from "react";
import ModalSignUpConfirmation from "../../components/SignUp-comps/ModalSignUpConfirmation";
import { useSession } from "../../context/ctx";
import { useEditUser } from "../../hooks/useUserService";
import useBackExitPrompt from '../../hooks/useBackExitPrompt';

const screenHeight = Dimensions.get('window').height;

const options = [
  "Alimentação",
  "Petshop",
  "Produtos artesanais",
  "Papelaria",
  "Flores e plantas",
  "Beleza e estética",
  "Manutenção de automóveis",
  "Limpeza de automóveis",
  "Livraria",
  "Perfumaria",
  "Vestuário e calçados",
  "Informática e eletrônicos",
];

const Preferences = () => {
  useBackExitPrompt("Tem certeza que deseja sair?");

  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const { session,  } = useSession();
  const { mutate } = useEditUser();

  // Garante que o botão só será clickavel se tiver ao menos 1 opção selecionada
  const isButtonEnabled = selectedOptions.length >= 3;

  const handlePressPreferencias = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
        setSelectedOptions([...selectedOptions, option]);
    }
  };

  const handlePreferences = () => {
    try {
      const dataToPost = {
        preferences: selectedOptions.join(","),
      };
      mutate({ userData: dataToPost, session });

      setModalMessage("Preferências cadastradas!");
      setIsModalVisible(true);
    } catch (error) {
      setModalMessage("Erro ao cadastrar preferências.");
      setIsModalVisible(true);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerView}>
        <CustomText variant="semiBold" style={styles.headerTitle}>
          Boas-Vindas
        </CustomText>
        <CustomText style={styles.headerText}>
          Queremos te conhecer melhor!
        </CustomText>
      </View>

      <View style={styles.viewSelection}>
        <CustomText variant="bold" style={styles.textSelection}>
          Selecione{" "}
          <CustomText>
            3 categorias que fazem parte do seu dia a dia, para personalizarmos
            sua experiência
          </CustomText>
        </CustomText>
      </View>

      {/* Define os botões baseado nas opções definidas em 'options' */}
      <View style={styles.optionsContainer}>
        {options.map((option, index) => (
          <Pressable
            key={index}
            style={[
              styles.optionButton,
              selectedOptions.includes(option) && styles.selectedButton,
            ]}
            onPress={() => handlePressPreferencias(option)}
          >
            <CustomText
              style={[
                styles.optionText,
                selectedOptions.includes(option) && styles.selectedText,
              ]}
            >
              {option}
            </CustomText>
          </Pressable>
        ))}
      </View>

      <View style={styles.buttonView}>
        <Pressable 
          style={[styles.continuarButton, !isButtonEnabled && styles.disabledContinuarButton]}
          onPress={isButtonEnabled ? handlePreferences : null}
          disabled={!isButtonEnabled}
          >
          <CustomText style={styles.continuarText}>Continuar</CustomText>
        </Pressable>
        <Pressable onPress={() => router.navigate("/")}>
          <CustomText
            variant="semiBold"
            style={{ fontSize: 20, marginTop: 20 }}
          >
            Pular
          </CustomText>
        </Pressable>
      </View>

      <ModalSignUpConfirmation
            visible={isModalVisible} // Controle de visibilidade
            onPress={() => {
              router.navigate("/");
            }} // Fecha o modal
            message={modalMessage} // Mensagem dinâmica
          />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(247, 247, 247, 1)',
  },
  headerView: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'semibold',
    marginTop: 70
  },
  headerText: {
    marginTop: -5,
    fontSize: 18
  },
  viewSelection: {
    marginHorizontal: 40,
    marginTop: 30,
    textAlign: "center",
  },
  textSelection: {
    fontSize: 18,
    textAlign: "center"
  },
  buttonView: {
    alignItems: 'center',
    marginTop: screenHeight > 850 ? 10 : 0,
  },
  continuarButton: {
    alignSelf: "center",
    borderWidth: 1,
    backgroundColor: "rgba(21, 15, 2, 1)",
    borderColor: "rgba(21, 15, 2, 1)",
    borderRadius: 30,
    width: 315,
    marginTop: 35,
    paddingVertical: 9,
    zIndex: 10,
  },
  disabledContinuarButton: {
    backgroundColor: "rgba(21, 15, 2, 0.2)",
    borderColor: "rgba(21, 15, 2, 0.2)"
  },
  continuarText: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
    color: "rgba(255, 255, 255, 1)",
  },
  // Estilo dos botões
  optionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginHorizontal: 20,
    marginTop: 20,
  },
  optionButton: {
    backgroundColor: "rgba(255, 255, 255, 1)",
    borderRadius: 30,
    paddingVertical: 8,
    paddingHorizontal: 15,
    alignItems: "center",
    justifyContent: "center",
    margin: 5,

    // Sombra para iOS
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,

    // Sombra para Android
    elevation: 5,
  },
  optionText: {
    color: "rgba(21, 15, 2, 1)",
    fontSize: 16,
    fontWeight: "normal",
  },
  selectedButton: {
    backgroundColor: "rgba(252, 213, 98, 1)",
    // Sombra para iOS
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,

    // Sombra para Android
    elevation: 5,
  },
  selectedText: {
    fontWeight: "bold",
    color: "rgba(21, 15, 2, 1)",
    fontSize: 18,
  },
});

export default Preferences;
