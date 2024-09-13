import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import { useSession } from "../../../context/ctx";
const Menu = () => {
  const { signOut } = useSession();
  return (
    <View>
      <Pressable onPress={signOut}>
        <Text>Sair</Text>
      </Pressable>
    </View>
  );
};

export default Menu;

const styles = StyleSheet.create({});
