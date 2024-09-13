import React from "react";
import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { hightlightData } from "./HightlightData";
import { StarFour } from "@phosphor-icons/react";

export const Highlights = () => {
  const { width } = Dimensions.get("window");

  const renderItem = ({ item }) => {
    return (
      <View style={styles.card}>
        {/* Imagem de fundo */}
        <Image source={{ uri: item.imageStore }} style={styles.image} />

        {/* Informações sobre o lugar */}
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{item.title}</Text>

          {/* Imagem do usuário e detalhes */}
          <View style={styles.userDetailsContainer}>
            <Image source={{ uri: item.imageUser }} style={styles.userImage} />
            <View>
              <Text style={styles.details}>{item.distance}</Text>
              <Text style={styles.details}>
                {item.rate} {item.iconRate} ({item.totalAvaliation})
              </Text>
            </View>
          </View>
        </View>

        {/* Exibição dos pontos no canto superior direito */}
        <View style={styles.pointsContainer}>
          <Text style={styles.points}>
            {item.points} pontos <StarFour size={12} weight="bold" />
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Carousel
        loop
        width={width}
        height={223} // Altura do card
        autoPlay={true}
        data={hightlightData}
        renderItem={renderItem}
        itemWidth={width * 0.6} // Ajusta a largura do card para mostrar vários
        style={{ paddingHorizontal: 10 }}
        pagingEnabled={false} // Desativa a paginação para permitir o deslizamento contínuo
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  card: {
    width: 193, // Largura do card
    height: 223, // Altura do card
    borderRadius: 10,
    overflow: "hidden",
    marginHorizontal: 10,
  },
  image: {
    ...StyleSheet.absoluteFillObject, // Faz com que a imagem preencha todo o card
    width: "100%",
    height: "100%",
  },
  infoContainer: {
    backgroundColor: "#00000066", // Fundo semitransparente
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff", // Título na cor branca
  },
  userDetailsContainer: {
    flexDirection: "row", // Coloca a imagem do usuário e os detalhes lado a lado
    alignItems: "center",
    marginTop: 5,
  },
  userImage: {
    width: 32,
    height: 32,
    borderRadius: 16, // Imagem do usuário circular
    marginRight: 10,
  },
  details: {
    fontSize: 14,
    color: "#fff",
  },
  pointsContainer: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#F7F5F5", // Fundo dos pontos
    paddingVertical: 2,
    paddingHorizontal: 10,
    borderRadius: 21,
    borderWidth: 1,
    borderColor: "#9A791A",
    width: 80, // Largura do background
    height: 22, // Altura do background
    justifyContent: "center",
    alignItems: "center",
  },
  points: {
    fontSize: 12,
    color: "#9A791A", // Cor do texto dos pontos
    fontWeight: "bold",
  },
});
