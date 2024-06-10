import { View, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Controller } from "react-hook-form";

export default function CustomPicker({ control, name, placeholder, options }) {
  return (
    <Controller
      control={control}
      rules={{ required: "Campo Obrigatório" }}
      render={({ field: { onChange, value } }) => (
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={value}
            onValueChange={(itemValue) => onChange(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label={placeholder} value="" />
            {options.map((option) => (
              <Picker.Item
                key={option.value}
                label={option.label}
                value={option.value}
              />
            ))}
          </Picker>
        </View>
      )}
      name={name}
    />
  );
}

const styles = StyleSheet.create({
  pickerContainer: {
    height: 50,
    width: 359,
    borderRadius: 7,
    margin: 10,
    backgroundColor: "#fff",
    elevation: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  picker: {
    height: 50,
    width: "100%",
    alignItems: 'center',
  

  },
});
