import React, { useState } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import StoreReview from "../StoreReview";
import PerfilStore from "../PerfilStore";
const Inicio = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Início</Text>
  </View>
);

const Avaliacoes = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Avaliações</Text>
  </View>
);

const Perfil = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Perfil</Text>
  </View>
);

const Lojas = () => {
  const [selectedTab, setSelectedTab] = useState("Inicio");

  const renderContent = () => {
    switch (selectedTab) {
      case "Inicio":
        return <Inicio />;
      case "Avaliacoes":
        return <StoreReview />;
      case "Perfil":
        return <PerfilStore />;
      default:
        return <Inicio />;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => setSelectedTab("Inicio")}>
          <Text
            style={selectedTab === "Inicio" ? styles.activeTab : styles.tab}
          >
            Início
          </Text>
        </Pressable>
        <Pressable onPress={() => setSelectedTab("Avaliacoes")}>
          <Text
            style={selectedTab === "Avaliacoes" ? styles.activeTab : styles.tab}
          >
            Avaliações
          </Text>
        </Pressable>
        <Pressable onPress={() => setSelectedTab("Perfil")}>
          <Text
            style={selectedTab === "Perfil" ? styles.activeTab : styles.tab}
          >
            Perfil
          </Text>
        </Pressable>
      </View>
      {renderContent()}
    </View>
  );
};

export default Lojas;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "black",
    // paddingVertical:10,
    paddingTop: 50,
    paddingBottom: 10,
  },
  tab: {
    color: "white",
    fontSize: 16,
  },
  activeTab: {
    color: "white",
    fontSize: 16,
    textDecorationLine: "underline",
  },
  text: {
    color: "black",
    fontSize: 20,
    textAlign: "center",
    marginTop: 20,
  },
});
