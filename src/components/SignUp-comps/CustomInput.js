import React, { useState } from 'react';
import { TextInput, StyleSheet, Text, View, Pressable } from "react-native";
import { Controller } from "react-hook-form";
import { Eye, EyeClosed } from 'phosphor-react-native';

export default function CustomInput({ name, control, placeholder, keyboardType, autoCapitalize, rules, errors, secureTextEntry }) {
  const [isPasswordHidden, setIsPasswordHidden] = useState(secureTextEntry);

  const togglePasswordVisibility = () => {
    setIsPasswordHidden(!isPasswordHidden);
  };

  return (
    <View style={styles.container}>
      <Controller
        name={name}
        control={control}
        rules={rules || undefined}
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <TextInput
              placeholder={placeholder}
              keyboardType={keyboardType}
              style={[styles.input, errors?.[name]]}
              autoCapitalize={autoCapitalize}
              secureTextEntry={secureTextEntry ? isPasswordHidden : false}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholderTextColor="#838383"
            />

            {secureTextEntry && (
              <Pressable style={styles.icon} onPress={togglePasswordVisibility}>
                {isPasswordHidden ? (
                  <EyeClosed size={20} color="gray" />
                ) : (
                  <Eye size={20} color="gray" />
                )}
              </Pressable>
            )}
          </>
        )}
      />
      {errors?.[name] && <Text style={styles.errorText}>{errors[name].message}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '90%',
    alignSelf: 'center',
  },
  input: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
    paddingRight: 40,  // espaço pro ícone
  },
  errorText: {
    color: 'red',
    marginLeft: 5,
    marginTop: -8,
    marginBottom: 8,
  },
  icon: {
    position: 'absolute',
    right: 15,
    top: 25,
  },
});
