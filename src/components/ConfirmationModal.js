import React from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { Image } from "expo-image";
import { MaterialIcons } from "@expo/vector-icons";
import CustomButtonTwo from "./CustomButtonTwo";
import CustomText from './CustomText';

export default function ConfirmationModal({ text, onPress, iconClose }) {
  return (
    <View style={styles.mainContainer}>
      <TouchableWithoutFeedback>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>
      <View style={styles.modalContainer}>
        <MaterialIcons
          name="close"
          size={30}
          color="black"
          style={styles.closeIcon}
          onPress={iconClose}
        />
        <Image
          source={require("@/assets/images/Clubee_logo_only_bee.png")}
          style={styles.image}
        />
        <CustomText style={styles.modalText}>{text}</CustomText>
        <CustomButtonTwo onPress={onPress}>Continuar!</CustomButtonTwo>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modalContainer: {
    width: 398,
    height: 464,
    borderRadius: 38,
    backgroundColor: "#FFFAEB",
    elevation: 10,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    padding: 20,
  },
  image: {
    width: 168,
    height: 136,
  },
  closeIcon: {
    alignSelf: "flex-end",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 20,
    textAlign: "center",
  },
});