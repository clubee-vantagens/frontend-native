import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { StyleSheet, View, Text } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { scale } from "react-native-size-matters";

const DropdownComponent = ({control, name, placeholder, data, type}) => {
  const [value, setValue] = useState(null);
  const dropdownWidth = type === 'sm' ? scale(156) : scale(256)

  const renderItem = (item) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
        {/* {item.value === value && (
            <AntDesign
              style={styles.icon}
              color="black"
              name="Safety"
              size={20}
            />
          )} */}
      </View>
    );
  };

  return (
    // <Controller 
    //     control={control}
    //     name={name}
    //     render={({field: {onChange, value}}) => {
            <Dropdown
              style={[styles.dropdown, {width: dropdownWidth}]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={data}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={placeholder}
              searchPlaceholder="Search..."
              value={value}
              onChange={(item) => setValue(item.value)}
              renderItem={renderItem}
            />

    //     }}
    // />
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  dropdown: {
    margin: 10,
    height: 50,
    width: 156,
    backgroundColor: "#fff",
    borderRadius: 7,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 5,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
