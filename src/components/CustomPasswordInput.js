import { TextInput, StyleSheet, View, Pressable } from "react-native";
import { Controller } from "react-hook-form";
import { Octicons } from "@expo/vector-icons";
import { useState } from "react";

export default function CustomPasswordInput({
  control,
  name,
  placeholder,
  type,
  rules,
}) {
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const handleShowPassword = () => {
    setIsPasswordHidden(!isPasswordHidden);
  };
  return (
    <View style={styles.container}>
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
            secureTextEntry={isPasswordHidden ? true : false}
          />
        )}
        name={name}
      />
      <Pressable style={styles.icon} onPress={handleShowPassword}>
        {isPasswordHidden ? (
          <Octicons name="eye" size={15} color="black" />
        ) : (
          <Octicons name="eye-closed" size={15} color="black" />
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 7,
    padding: 10,
    backgroundColor: "#fff",
    elevation: 5,
    margin: 10,
    height: 50,
  },
  input: {
    flex: 1,
    textAlign: "center",
  },
  icon: {
    padding: 5,
    position: "absolute",
    right: 0,
  },
});
