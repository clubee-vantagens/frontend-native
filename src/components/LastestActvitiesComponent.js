import { Pressable, StyleSheet, View } from "react-native";
import CustomText from "./CustomText";
import { scale } from "react-native-size-matters";
import { CaretDown } from "phosphor-react-native";

export default LatestActivitiesComponent = ({nome, date, points}) => {
  return (
    <View style={styles.container}>
      <View style={styles.image}></View>
      <CustomText>{nome}</CustomText>
      <View style={styles.dateContainer}>
        <CustomText fontSize={10} color="#575757">{date}</CustomText>
      </View>
      <CustomText>{points} pts</CustomText>
      <Pressable onPress={() => console.log('clicked')}>
        <CaretDown size={20} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    borderWidth: 1,
    borderColor: "#bdbdbd",
    borderRadius: 8,
    height: scale(72),
    width: "90%",
    marginTop: scale(10),
  },
  image: {
    height: scale(32),
    width: scale(32),
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#F5C330",
  },
  dateContainer: {
    width: scale(72),
    height: scale(18),
    backgroundColor: "#bdbdbd",
    alignItems: 'center',
    justifyContent: 'center',
  },
});
