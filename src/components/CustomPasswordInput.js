import { TextInput, StyleSheet, View, Pressable } from "react-native";
import { Controller } from "react-hook-form";
import { Ionicons } from "@expo/vector-icons";
import {Eye,  EyeClosed } from '@phosphor-icons/react'
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
          <EyeClosed size={15} color="gray" />
        ) : (
          <Eye size={15} color="gray" />
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
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 5,
    margin: 10,
    height: 50,
  },
  input: {
    flex: 1,
    paddingLeft: 15,
    color: '#757575',
    fontSize: 18
    // textAlign: "center",
  },
  icon: {
    fontSize: 18,
    padding: 5,
    position: "absolute",
    right: 30,
  },
});
