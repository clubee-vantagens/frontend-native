import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Pressable, ScrollView } from "react-native";
import { CaretDown, CaretUp } from "phosphor-react-native"; // Importing icons from Expo (you can replace this with your icon library)
import CustomText from "./CustomText";
import { scale, verticalScale } from "react-native-size-matters";

const FAQAccordion = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  return (
    <>
      {data.map((item, index) => (
        <View key={index}>
          <Pressable
            style={styles.button}
            onPress={() => toggleAccordion(index)}
          >
            <CustomText style={styles.title}>{item.question}</CustomText>
            {activeIndex === index ? (
              <CaretUp size={24} color="black" />
            ) : (
              <CaretDown size={24} color="black" />
            )}
          </Pressable>
          {activeIndex === index && (
            <View style={styles.content}>
              <CustomText style={{fontSize: 12}}>{item.answer}</CustomText>
            </View>
          )}
        </View>
      ))}
    </> 
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 20,
  },
  button: {
    backgroundColor: "#FFEAAD",
    width: scale(310),
    height: verticalScale(70),
    borderRadius: 8,
    alignItems: "center",
    padding: 15,
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 12,
    width: scale(250),
    flex:1
  },
  content: {
    padding: 15,
    backgroundColor: "#FFEAAD",
    marginVertical: -5,
    width: scale(310),
  },
});

export default FAQAccordion;
