import React, { useState } from "react";
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  View,
  TextInput,
  Modal,
} from "react-native";
import { CaretLeft } from "phosphor-react-native";
import { Picker } from "@react-native-picker/picker";
import CustomText from "../../components/CustomText";
import CustomButtonTwo from "../../components/CustomButtonTwo";
import { router } from "expo-router";

const FaleConosco = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedRadio, setSelectedRadio] = useState("");
  const [textAreaValue, setTextAreaValue] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [error, setError] = useState("");

  const handleSendMessage = () => {
    if (!selectedRadio || textAreaValue.trim().length < 100) {
      alert(
        "Por favor, selecione um motivo e escreva uma mensagem com pelo menos 100 caracteres."
      );
      return;
    }
    setModalIsOpen(true);
  };

  const handleTextChange = (text) => {
    setTextAreaValue(text);
    if (text.trim().length < 100) {
      setError("A mensagem deve ter pelo menos 100 caracteres.");
    } else if (text.length > 1000) {
      setError("A mensagem não pode ter mais de 1000 caracteres.");
    } else {
      setError("");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View>
        <CustomText style={styles.title}>Fale Conosco</CustomText>
      </View>
      <View style={styles.form}>
        <CustomText style={styles.label} variant="bold">
          Qual o motivo do seu contato?
        </CustomText>
        <RadioButtons
          options={["Reclamação", "Sugestão", "Dúvida", "Outro"]}
          selectedRadio={selectedRadio}
          setSelectedRadio={setSelectedRadio}
        />
        {selectedRadio === "Outro" && (
          <CustomPicker
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
          />
        )}
        <MessageInput
          textAreaValue={textAreaValue}
          setTextAreaValue={handleTextChange}
          error={error}
        />
      </View>
      <View style={styles.controlBtn}>
        <CustomButtonTwo onPress={handleSendMessage}>Enviar</CustomButtonTwo>
      </View>

      <Modal
        visible={modalIsOpen}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalIsOpen(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <CustomText style={styles.modalText}>Mensagem Enviada!</CustomText>
            <CustomButtonTwo
              onPress={() => {
                setModalIsOpen(false);
                router.push("/");
              }}
            >
              Continuar
            </CustomButtonTwo>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const Header = () => (
  <View style={styles.header}>
    <Pressable onPress={() => router.back()}>
      <CaretLeft size={30} color="black" />
    </Pressable>
  </View>
);

const RadioButtons = ({ options, selectedRadio, setSelectedRadio }) => (
  <>
    {options.map((option, index) => (
      <Pressable
        key={index}
        style={styles.radioContainer}
        onPress={() => setSelectedRadio(option)}
      >
        <View
          style={[
            styles.radioCircle,
            selectedRadio === option && styles.selectedCircle,
          ]}
        />
        <CustomText style={styles.radioText} variant="semibold">
          {option}
        </CustomText>
      </Pressable>
    ))}
  </>
);

const CustomPicker = ({ selectedOption, setSelectedOption }) => (
  <View style={styles.pickerContainer}>
    <Picker
      selectedValue={selectedOption}
      onValueChange={(itemValue) => setSelectedOption(itemValue)}
      style={styles.select}
    >
      <Picker.Item label="Assunto" value="assunto" />
      <Picker.Item label="Assunto 1" value="Assunto1" />
      <Picker.Item label="Assunto 2" value="Assunto2" />
      <Picker.Item label="Assunto 3" value="Assunto3" />
    </Picker>
  </View>
);

const MessageInput = ({ textAreaValue, setTextAreaValue, error }) => (
  <View style={styles.textAreaContainer}>
    {error ? <CustomText style={styles.errorText}>{error}</CustomText> : null}

    <TextInput
      style={styles.textArea}
      multiline
      placeholder="Escreva sua mensagem aqui..."
      value={textAreaValue}
      onChangeText={setTextAreaValue}
      maxLength={1000}
      textAlignVertical="top"
    />

    <CustomText style={styles.charCounter}>
      {textAreaValue.length}/1000
    </CustomText>
  </View>
);

export default FaleConosco;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 70,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 16,
  },
  form: {
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginVertical: 10,
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#000",
    marginRight: 8,
  },
  selectedCircle: {
    backgroundColor: "#000",
  },
  radioText: {
    fontSize: 16,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 8,
    overflow: "hidden",
    marginTop: 15,
  },
  select: {
    height: 50,
    width: "100%",
  },
  textAreaContainer: {
    position: "relative",
    marginVertical: 20,
  },
  textArea: {
    height: 300,
    borderColor: "#000",
    borderWidth: 1,
    padding: 10,
    textAlignVertical: "top",
    borderRadius: 8,
    width: "100%",
    textAlign: "justify",
    flexGrow: 1,
  },
  charCounter: {
    position: "absolute",
    bottom: 10,
    right: 15,
    color: "#666",
    fontSize: 14,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
  controlBtn: {
    alignItems: "center",
    justifyContent: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 8,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    fontWeight: "bold",
  },
});
