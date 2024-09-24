import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import CustomButtonTwo from "./CustomButtonTwo";
import CustomText from "./CustomText";

export default function ConfirmationModal({ text, onPress, iconClose, style }) {
  return (
    <View style={styles.mainContainer}>
      <TouchableWithoutFeedback>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>
      <View style={styles.modalContainer}>
        {/* <MaterialIcons
          name="close"
          size={30}
          color="black"
          style={styles.closeIcon}
          onPress={iconClose}
        /> */}
        {/* <Image
          source={require("@/assets/images/Clubee_logo_only_bee.png")}
          style={styles.image}
        /> */}
        <CustomText style={[styles.modalText, style]}>{text}</CustomText>
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
    width: 359,
    height: 320,
    borderRadius: 38,
    backgroundColor: "#FAF9F6",
    elevation: 10,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 24,
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
    color: "#150F02",
    fontWeight: "bold",
  },
});
