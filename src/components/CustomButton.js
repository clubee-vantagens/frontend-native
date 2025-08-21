import { Pressable, Text, StyleSheet } from "react-native";
import CustomText from "./CustomText";
import { scale, verticalScale } from "react-native-size-matters";

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
    width: scale(315),
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
