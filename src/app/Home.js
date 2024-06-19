import React from "react";
import { View, Text, StyleSheet,Pressable } from "react-native";
import {Link} from 'expo-router'

export default function Home() {
  return (
    <View style={styles.container}>
      <Pressable>Tela de inicio</Pressable>
      <Link href="/" style={{color: 'red'}}>
          Voltar para tela de login
        </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
  },
});
