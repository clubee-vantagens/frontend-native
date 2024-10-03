import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Pressable, ScrollView } from "react-native";
import { CaretDown, CaretUp } from "@phosphor-icons/react"; // Importing icons from Expo (you can replace this with your icon library)
import CustomText from "./CustomText";

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
              <CustomText>{item.answer}</CustomText>
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
    borderWidth:1,
    borderColor: 'red'
  },
  button: {
    backgroundColor: "#FFEAAD",
    width: 350,
    height: 71,
    borderRadius: 8,
    alignItems: "center",
    padding: 15,
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 14,
  },
  content: {
    padding: 15,
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
    marginVertical: 10,
  },
});

export default FAQAccordion;
