import { Pressable, Text, StyleSheet } from "react-native";
import CustomText from "./CustomText";

export default function CustomButton({ children, onPress, type }) {
  return (
    <Pressable
      style={[styles.baseButton, styles.buttonBlack]}
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
    height: 47,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },
  buttonBlack: {
    backgroundColor: "#150F02",
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
  },
});
