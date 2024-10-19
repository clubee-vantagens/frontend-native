import { TextInput, StyleSheet } from "react-native";
import { Controller } from "react-hook-form";

import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

export default function CustomInput({ control, name, placeholder, type, rules, editable }) {
  return (
    <Controller
      control={control}
      rules={rules || undefined}
      render={({ field: { onChange, onBlur, value } }) => (
        <TextInput
          value={value}
          style={styles.input}
          onBlur={onBlur}
          placeholder={placeholder}
          onChangeText={onChange}
          autoCapitalize="none"
          inputMode={type}
          editable={editable}
        />
      )}
      name={name}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    height: 50,
    width: scale(300),
    borderRadius: 7,
    padding: 10,
    backgroundColor: "#fff",
    shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,

      elevation: 5,
    margin: 10,
    textAlign: "left",
    paddingLeft: 25,
    color: '#757575',
    fontSize: 18,
    fontWeight: 'semibold'
  },
});
