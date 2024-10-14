import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import { useSession } from "../../../context/ctx";
import { router } from "expo-router";
const Menu = () => {
  const { signOut } = useSession();
  return (
    <View style={{flex: 1, margin: 60}}>
      <Pressable onPress={signOut}>
        <Text>Sair</Text>
      </Pressable>
      <Pressable onPress={() => router.navigate('/helpCenter')}><Text>Ir para central de ajuda</Text></Pressable>
      <Pressable onPress={() => router.navigate('/editProfile')}><Text>Ir para edicao de perfil</Text></Pressable>

    </View>
  );
};

export default Menu;

const styles = StyleSheet.create({});
