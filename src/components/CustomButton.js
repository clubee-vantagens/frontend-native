import { Pressable, Text, StyleSheet } from "react-native";
import CustomText from "./CustomText";

export default function CustomButton({ children, onPress, type }) {
  const buttonType = type === "red" ?  styles.buttonRed: styles.buttonGreen;
  return (
    <Pressable
      style={[buttonType, styles.baseButton]}
      onPress={onPress}
    >
      <CustomText style={styles.buttonText} variant="semiBold">{children}</CustomText>
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
  buttonRed: {
    backgroundColor: '#F04040'
  },
  buttonText: {
    fontSize: 18,
  },
});
