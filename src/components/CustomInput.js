import { TextInput, StyleSheet } from "react-native";
import { Controller } from "react-hook-form";

export default function CustomInput({ control, name, placeholder, type, rules }) {
  return (
    <Controller
      control={control}
      rules={rules}
      render={({ field: { onChange, onBlur, value } }) => (
        <TextInput
          value={value}
          style={styles.input}
          onBlur={onBlur}
          placeholder={placeholder}
          onChangeText={onChange}
          autoCapitalize="none"
          inputMode={type}
        />
      )}
      name={name}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    height: 50,
    width: 359,
    borderRadius: 7,
    padding: 10,
    backgroundColor: "#fff",
    elevation: 5,
    margin: 10,
    textAlign: "left",
    paddingLeft: 25,
    color: '#757575',
    fontSize: 18,
    fontWeight: 'semibold'
  },
});
