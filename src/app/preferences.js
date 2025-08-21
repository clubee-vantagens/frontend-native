import {
  StyleSheet,
  Text,
  View,
  Pressable,
  SafeAreaView,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import CustomText from "../components/CustomText";
import CustomButtonTwo from "../components/CustomButtonTwo";
import ConfirmationModal from "../components/ConfirmationModal";
import { router } from "expo-router";
import { useSession } from "../context/ctx";
import { useEditUser } from "../hooks/useUserService";
import Constants from "expo-constants";
import { scale } from "react-native-size-matters";

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

  const handlePreferencies = (preferences) => {
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
      <ScrollView>
        <View style={styles.containerHeader}>
          <CustomText variant="bold" style={styles.title}>
            Bem Vindo!
          </CustomText>
          <CustomText>Queremos te conhecer melhor!</CustomText>
        </View>
        {/* <View style={styles.textSelection}> */}
        <CustomText style={styles.textSelection} variant="bold">
          Selecione{" "}
          <CustomText>
            as categorias que fazem parte do seu dia a dia
          </CustomText>
        </CustomText>
        {/* </View> */}
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
              <CustomText
                variant={selectedOptions.includes(option) && "semiBold"}
                style={[
                  styles.optionText,
                  selectedOptions.includes(option) && styles.optionTextSelected,
                ]}
              >
                {option}
              </CustomText>
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
            <CustomText variant="semiBold">Pular</CustomText>
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
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FAF9F6",
    marginTop: Constants.statusBarHeight,
    flex: 1,
  },
  containerHeader: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 49,
  },
  title: {
    fontSize: 30,
  },
  textSelection: {
    marginHorizontal: "auto",
    marginBottom: 28,
    fontSize: 18,
    textAlign: "center",
  },
  containerCategory: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
    gap: 5,
    width: scale(359),
    marginHorizontal: "auto",
    padding: 10,
  },
  optionButton: {
    backgroundColor: "#FAF9F6",
    borderRadius: 30,
    paddingVertical: 10,
    marginVertical: 2,
    borderRadius: 30,
    padding: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 5,
  },
  optionButtonSelected: {
    backgroundColor: "#FCD562",
  },
  optionText: {
    fontSize: 14,
    color: "#150F02",
  },
  optionTextSelected: {
    color: "#150F02",
    fontWeight: "semibold",
  },
  buttonsControl: {
    alignItems: "center",
    justifyContent: "center",
  },
  btnContinue: {
    width: scale(300),
    marginBottom: 30,
  },
  btnContinueDisabled: {
    backgroundColor: "#d0d0d0",
  },
});
