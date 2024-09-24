import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
} from "react-native";
import { hightlightData } from "./HightlightData";
import CustomText from "../CustomText";
import { StarFour } from "@phosphor-icons/react";
import points from "../../../assets/images/points.png";
export const Hightlight = () => {
  const { width } = Dimensions.get("window");

  return (
    <View style={styles.container}>
      <FlatList
        data={hightlightData}
        renderItem={({ item }) => <SliderItem item={item} />}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        snapToInterval={width * 0.7 + 20}
        decelerationRate="fast"
        pagingEnabled
        contentContainerStyle={{ paddingHorizontal: 20 }}
      />
    </View>
  );
};

const SliderItem = ({ item }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: item.imageStore }} style={styles.image} />

      <View style={styles.pointsContainer}>
        <Text style={styles.pointsText}>{item.points} pontos</Text>
        <Image
          style={styles.imgPoint}
          source={require("../../../assets/images/points.png")}
        />
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.row}>
          <Image source={{ uri: item.imageUser }} style={styles.imageUser} />

          <View style={styles.textContainer}>
            <CustomText style={styles.title}>{item.nameStore}</CustomText>
            <CustomText style={styles.details}>{item.distance}</CustomText>
            <CustomText style={styles.details}>
              {item.iconRate} {item.rate} ({item.totalAvaliation})
            </CustomText>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    padding: 5,
  },
  card: {
    width: 193,
    height: 229,
    borderRadius: 4,
    marginHorizontal: 4,
    overflow: "hidden",
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  pointsContainer: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 100,
    height: 25,
    backgroundColor: "#F7F5F5",
    borderRadius: 20,
    borderColor: "#9A791A",
    borderWidth: 1,
    flexDirection: "row",
    gap: 3,
    justifyContent: "center",
    alignItems: "center",
  },

  pointsText: {
    color: "#9A791A",
    fontSize: 12,
    fontWeight: "bold",

    alignItems: "center",
    justifyContent: "center",
  },
  imgPoint: {
    width: 10,
    height: 10,
    color: "#9A791A",
  },
  infoContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: 5,
    backgroundColor: "#00000066",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  imageUser: {
    width: 32,
    height: 32,
    borderWidth: 2,
    borderColor: "#F5C330",
    borderRadius: 16,
    marginRight: 10,
    objectFit: "cover",
  },
  textContainer: {
    flexShrink: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
  },
  details: {
    fontSize: 14,
    color: "#fff",
    fontWeight: 500,
  },
});
