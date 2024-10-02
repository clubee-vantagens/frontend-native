// CustomText.js
import React from "react";
import { Text, StyleSheet } from "react-native";

const fontVariants = {
  regular: "PoppinsReg",
  bold: "PoppinsBold",
  semiBold: "PoppinsSemiBold",
  italic: "PoppinsItalic",
  thin: "PoppinsThin",
  // Add other variants as needed
};

const CustomText = ({
  style,
  variant = "regular",
  color = "#000",
  ...props
}) => {
  return (
    <Text
      style={[styles.text, { fontFamily: fontVariants[variant], color }, style]}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  text: {},
});

export default CustomText;
