import React, { useState } from "react";
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  View,
  TextInput,
  Modal,
  ScrollView,
} from "react-native";
import Constants from "expo-constants";
import { CaretLeft } from "phosphor-react-native";
import { useForm, Controller } from "react-hook-form";
import { router } from "expo-router";
import CustomText from "../../../components/CustomText";
import CustomButtonTwo from "../../../components/CustomButtonTwo";
import {
  moderateScale,
  verticalScale,
  scale,
  moderateVerticalScale,
} from "react-native-size-matters";
import CustomInput from "../../../components/CustomInputOld";
import DropdownComponent from "../../../components/DropdownComponent";

const FaleConosco = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      outroMotivo: "",
      radioOption: "",
      message: "",
    },
  });

  const selectedRadio = watch("radioOption");

  const handleSendMessage = (data) => {
    setModalIsOpen(true);
    console.log(data);

    reset(); // Reset form fields after successful submission
  };

  const Header = () => (
    <View style={styles.header}>
      <Pressable onPress={() => router.back()}>
        <CaretLeft size={30} color="black" />
      </Pressable>
    </View>
  );

  const RadioButtons = ({ options }) => (
    <Controller
      control={control}
      name="radioOption"
      rules={{ required: "Selecione uma opção." }}
      render={({ field: { onChange, value } }) => (
        <>
          {options.map((option, index) => (
            <Pressable
              key={index}
              style={styles.radioContainer}
              onPress={() => onChange(option)}
            >
              <View
                style={[
                  styles.radioCircle,
                  value === option && styles.selectedCircle,
                ]}
              />
              <CustomText style={styles.radioText} variant="semibold">
                {option}
              </CustomText>
            </Pressable>
          ))}
          {errors.radioOption && (
            <CustomText style={styles.errorText}>
              {errors.radioOption.message}
            </CustomText>
          )}
        </>
      )}
    />
  );

  const MessageInput = () => (
    <Controller
      control={control}
      name="message"
      rules={{
        required: "A mensagem é obrigatória.",
        minLength: {
          value: 100,
          message: "A mensagem deve ter pelo menos 100 caracteres.",
        },
        maxLength: {
          value: 1000,
          message: "A mensagem não pode ter mais de 1000 caracteres.",
        },
      }}
      render={({ field: { onChange, value } }) => (
        <View style={styles.textAreaContainer}>
          <TextInput
            style={styles.textArea}
            multiline
            placeholder="Escreva sua mensagem aqui..."
            value={value}
            onChangeText={onChange}
            maxLength={1000}
            textAlignVertical="top"
          />
          <CustomText style={styles.charCounter}>
            {value.length}/1000
          </CustomText>
          {errors.message && (
            <CustomText style={styles.errorText}>
              {errors.message.message}
            </CustomText>
          )}
        </View>
      )}
    />
  );

  return (
    <View style={styles.container}>
      <ScrollView>
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
          />
          {selectedRadio === "Outro" && (
            <DropdownComponent control={control} data={[{label: 'Assunto 1', value: 'Assunto 1'}]} placeholder='Assunto' name='outroMotivo'/>
          )}
          <MessageInput />
        </View>
        <View style={styles.controlBtn}>
          <CustomButtonTwo onPress={handleSubmit(handleSendMessage)}>
            Enviar
          </CustomButtonTwo>
        </View>

        <Modal
          visible={modalIsOpen}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setModalIsOpen(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <CustomText style={styles.modalText} variant="semiBold">
                Mensagem enviada!
              </CustomText>
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
      </ScrollView>
    </View>
  );
};

export default FaleConosco;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: scale(16),
    marginTop: Constants.statusBarHeight,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: scale(20),
    fontWeight: "bold",
    marginTop: verticalScale(16),
  },
  form: {
    marginTop: verticalScale(20),
  },
  label: {
    fontSize: scale(16),
    marginVertical: scale(10),
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: scale(5),
  },
  radioCircle: {
    height: scale(20),
    width: scale(20),
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#000",
    marginRight: scale(8),
  },
  selectedCircle: {
    backgroundColor: "#000",
  },
  radioText: {
    fontSize: scale(16),
  },
  textAreaContainer: {
    position: "relative",
    marginVertical: scale(20),
  },
  textArea: {
    height: moderateVerticalScale(300),
    borderColor: "#000",
    borderWidth: 1,
    padding: scale(10),
    textAlignVertical: "top",
    borderRadius: 8,
    width: "100%",
    textAlign: "justify",
    flexGrow: 1,
  },
  charCounter: {
    position: "absolute",
    bottom: scale(10),
    right: scale(15),
    color: "#666",
    fontSize: scale(14),
  },
  errorText: {
    color: "red",
    fontSize: scale(12),
    marginTop: scale(5),
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
    width: scale(359),
  },
  modalContent: {
    width: moderateScale(300),
    padding: scale(20),
    backgroundColor: "#fff",
    borderRadius: 8,
    alignItems: "center",
  },
  modalText: {
    fontSize: scale(25),
    marginBottom: scale(20),
  },
});
