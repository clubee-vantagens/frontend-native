import React from "react";
import { View, Text, StyleSheet,Pressable } from "react-native";
import {Link} from 'expo-router'
import { useSession } from "../../context/ctx";

export default function Home() {
  const {signOut, refreshAccessToken} = useSession()
  return (
    <View style={styles.container}>
      <Pressable><Text>Tela de inicio</Text></Pressable>
      <Pressable onPress={refreshAccessToken}><Text>Refresh token</Text></Pressable>
      <Link href="/sign-in" style={{color: 'red'}}>
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
