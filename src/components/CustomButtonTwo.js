import { Pressable, Text, StyleSheet } from "react-native";
import CustomText from "./CustomText";

export default function CustomButtonTwo({ children, onPress, style }) {
  return (
    <Pressable
      style={[styles.baseButton, styles.buttonTypeTwo, style]}
      onPress={onPress}
    >
      <CustomText style={[styles.buttonText]} variant="semiBold">
        {children}
      </CustomText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  baseButton: {
    width: 133,
    height: 43,
    borderRadius: 30,
    elevation: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonTypeTwo: {
    backgroundColor: "#150F02",
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
  },
});
