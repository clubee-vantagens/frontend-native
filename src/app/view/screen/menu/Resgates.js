import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useSession } from "../../../../context/ctx";
import { statusBarHeight } from "../../../../constants/constants";

const Resgates = () => {
  const { signOut, session } = useSession();
  return (
    <View style={{marginTop: statusBarHeight}}>
      <Text>Resgates</Text>
      <Pressable onPress={signOut}>
        <Text>Sign out</Text>
      </Pressable>
    </View>
  );
};

export default Resgates;

const styles = StyleSheet.create({});
