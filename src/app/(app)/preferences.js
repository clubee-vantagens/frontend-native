import {
  StyleSheet,
  Text,
  View,
  Pressable,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import CustomText from "../../components/CustomText";
import CustomButtonTwo from "../../components/CustomButtonTwo";
import ConfirmationModal from "../../components/ConfirmationModal";
import { router } from "expo-router";
import { useSession } from "../../context/ctx";
import { useEditUser } from "../../hooks/useEditUser";

const options = [
  "Alimentação",
  "Petshop",
  "Produtos artesanais",
  "Informática e eletrônicos",
  "Papelaria",
  "Flores e plantas",
  "Beleza e estética",
  "Manutenção de automóveis",
  "Limpeza de automóveis",
  "Livraria",
  "Perfumaria",
  "Vestuário e calçados",
  "Informática e eletrónicos",
];

export default function Preferences() {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { session } = useSession();
  const { mutate, status } = useEditUser();

  const handleSelect = (option) => {
    setSelectedOptions((prevState) =>
      prevState.includes(option)
        ? prevState.filter((item) => item !== option)
        : [...prevState, option]
    );
  };

  const handleSkip = () => {
    setSelectedOptions(options);
    handlePreferencies(options);
    setIsLoading(true);
    setModalOpen(false);
    router.navigate("/");
  };

  const isButtonEnabled = selectedOptions.length > 0;

  const handlePreferencies = async (preferences) => {
    setIsLoading(true);
    try {
      const dataToPost = {
        preferences: preferences.join(","),
      };
      mutate({ userData: dataToPost, session });

      console.log(status);
      if (status === "idle") {
        setIsLoading(true);
      }
      setModalOpen(true);
    } catch (error) {
      console.log("Erro ao enviar preferências", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#FCD562" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerHeader}>
        <CustomText variant="bold" style={styles.title}>
          Bem Vindo!
        </CustomText>
        <CustomText>Queremos te conhecer melhor!</CustomText>
      </View>
      <View style={styles.textSelection}>
        <CustomText variant="bold">Selecione</CustomText>
        <Text> as categorias que fazem parte do seu dia a dia</Text>
      </View>
      <View style={styles.containerCategory}>
        {options.map((option) => (
          <Pressable
            key={option}
            style={[
              styles.optionButton,
              selectedOptions.includes(option) && styles.optionButtonSelected,
            ]}
            onPress={() => handleSelect(option)}
          >
            <Text
              style={[
                styles.optionText,
                selectedOptions.includes(option) && styles.optionTextSelected,
              ]}
            >
              {option}
            </Text>
          </Pressable>
        ))}
      </View>
      <View style={styles.buttonsControl}>
        <CustomButtonTwo
          style={[
            styles.btnContinue,
            !isButtonEnabled && styles.btnContinueDisabled,
          ]}
          disabled={!isButtonEnabled}
          onPress={() => handlePreferencies(selectedOptions)}
        >
          Continuar
        </CustomButtonTwo>
        <Pressable onPress={handleSkip}>
          <Text>Pular</Text>
        </Pressable>
      </View>
      {modalOpen && (
        <ConfirmationModal
          text={"Preferências cadastradas!"}
          iconClose={() => setModalOpen(false)}
          onPress={() => router.navigate("/")}
          style={{ fontSize: 30 }}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FAF9F6",
    justifyContent: "center",
    paddingTop: 100,
  },
  containerHeader: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 49,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
  textSelection: {
    flexDirection: "row",
    marginHorizontal: "auto",
    justifyContent: "center",
    marginBottom: 28,
    fontSize: 18,
  },
  containerCategory: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
    gap: 5,
    width: "90%",
    marginHorizontal: "auto",
  },
  optionButton: {
    backgroundColor: "#FAF9F6",
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 5,
    boxShadow: "0px 4px 3px rgba(0,0,0,0.2)",
  },
  optionButtonSelected: {
    backgroundColor: "#FCD562",
  },
  optionText: {
    fontSize: 14,
    color: "#150F02",
    fontWeight: "semibold",
  },
  optionTextSelected: {
    color: "#150F02",
  },
  buttonsControl: {
    marginTop: 146,
    alignItems: "center",
    justifyContent: "center",
  },
  btnContinue: {
    width: 359,
    marginBottom: 24,
  },
  btnContinueDisabled: {
    backgroundColor: "#d0d0d0",
  },
});
