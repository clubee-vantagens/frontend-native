import { Pressable, Text, StyleSheet } from "react-native";
import CustomText from "./CustomText";

export default function CustomButton({ children, onPress, type }) {
  const buttonType =
    type === "red"
      ? styles.buttonRed
      : type === "black"
      ? styles.buttonBlack
      : styles.buttonGreen;
  // const buttonTextColor = type === "red" ? styles.buttonTextWhite : null;
  const buttonTextColor =
    type === "black" || type === "red" ? styles.buttonTextWhite : null;
  return (
    <Pressable
      style={[buttonType, styles.baseButton, buttonTextColor]}
      onPress={onPress}
    >
      <CustomText style={styles.buttonText} variant="semiBold">
        {children}
      </CustomText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  baseButton: {
    width: 359,
    height: 50,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },
  buttonGreen: {
    backgroundColor: "#6ff79a",
  },
  buttonBlack: {
    backgroundColor: "#150F02",
  },
  buttonRed: {
    backgroundColor: "#F04040",
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
  },
  buttonTextWhite: {
    color: "#fff",
  },
});
