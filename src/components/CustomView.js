import React from "react";
import {
  View,
  Text,
  Modal,
  FlatList,
  StyleSheet,
  Pressable,
} from "react-native";
import { Fontisto } from "@expo/vector-icons";

const CustomView = ({
  options,
  selectedValue,
  onChangeSelect,
  visible,
  setVisible,
}) => {
  const handleSelect = (value) => {
    onChangeSelect(value);
    setVisible(false);
  };

  return (
    <View style={styles.input}>
      <Pressable onPress={() => setVisible(true)} style={styles.selector}>
        <Text>
          {selectedValue
            ? options.find((option) => option.value === selectedValue)?.label
            : "Selecione uma opção"}
        </Text>
        <Fontisto
          name={visible ? "angle-up" : "angle-down"}
          size={16}
          color="gray"
          style={styles.icon}
        />
      </Pressable>
      <Modal
        visible={visible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <Pressable
          style={styles.overlay}
          onPress={() => setVisible(false)}
        >
          <View style={styles.modalContainer}>
            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <Pressable onPress={() => handleSelect(item.value)}>
                  <Text style={styles.optionText}>{item.label}</Text>
                </Pressable>
              )}
            />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 50,
    width: 359,
    borderRadius: 7,
    padding: 10,
    backgroundColor: "#fff",
    elevation: 5,
    margin: 10,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  selector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  icon: {
    marginLeft: 10,
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0)",
  },
  modalContainer: {
    width: 360,
    height: 200,
    backgroundColor: "white",
    borderRadius: 10,
    position: "absolute",
    bottom: 15,
    left: 25,
    padding: 10,
    elevation: 5,
  },
  optionText: {
    padding: 10,
  },
});

export default CustomView;
