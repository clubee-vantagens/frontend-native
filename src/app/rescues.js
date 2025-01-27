import React from "react";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { CaretLeft } from "phosphor-react-native";
import CustomText from "../components/CustomText";
import { MyRescues } from "../components/UserData/rescuesData";

export default function Avaliation() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable>
          <CaretLeft size={24} />
        </Pressable>
        <CustomText fontSize={24} variant="bold">
          Meus resgates
        </CustomText>
      </View>

      {/* Conteúdo principal */}
      <ScrollView>
        {MyRescues.map((rescue, index) => (
          <View key={index} style={styles.rescueCard}>
            <CustomText fontSize={18} variant="bold">
              {rescue.name}
            </CustomText>
            <Text>Status: {rescue.status}</Text>
            <Text>Data: {rescue.date}</Text>
            <Text>Item: {rescue.item}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7", // Tema principal
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  rescueCard: {
    backgroundColor: "#FFFFFF", // Fundo branco
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 4,
  },
});
