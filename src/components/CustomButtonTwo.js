import { Pressable, Text, StyleSheet } from "react-native";
import CustomText from "./CustomText";

export default function CustomButtonTwo({ children, onPress, style, variant = 'default' }) {
  return (
    <Pressable
      style={[
        styles.baseButton, 
        styles.buttonTypeTwo, 
        styles[variant], 
        style
      ]}
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
    height: 43,
    borderRadius: 30,
    elevation: 5,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 5,
  },
  buttonTypeTwo: {
    backgroundColor: "#150F02",
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
  },
  // Size variants
  default: {
    width: 133,
  },
  wide: {
    width: 200,
  },
  extraWide: {
    width: '100%',
  }
});
