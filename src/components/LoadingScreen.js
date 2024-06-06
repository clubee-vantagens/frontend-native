import { ActivityIndicator, View } from "react-native";
export default function LoadingScreen() {
  return (
    <View
      style={{ flex: 1, alignItems: "center", justifyContent: "space-around" }}
    >
      <ActivityIndicator size="large" color="#F5C330" />
    </View>
  );
}
