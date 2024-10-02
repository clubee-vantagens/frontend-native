import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function Select({ options, onChangeSelect, label }) {
  const [selectedValue, setSelectedValue] = useState(null);

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedValue}
        onValueChange={(itemValue) => {
          setSelectedValue(itemValue);
          onChangeSelect(itemValue);
        }}
        style={styles.picker}
      >
        <Picker.Item label={label} value={null} />
        {options.map((opt, index) => (
          <Picker.Item key={index} label={opt.label} value={opt.value} />
        ))}
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: 156,
    borderRadius: 7,
    margin: 10,
    backgroundColor: "#fff",
    elevation: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
  },
  picker: {
    flex: 1,
  },
});
