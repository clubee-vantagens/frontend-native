import React from "react";
import Svg, { Path } from "react-native-svg";
import { StyleSheet, View, Text } from "react-native";

const ScoreStore = ({ width = 9, height = 9, color = "#9A791A" }) => {
  return (
    <View style={styles.container}>
      <Svg width={width} height={height} viewBox="0 0 48 48" fill="none">
        <Path
          d="M16.34 5.52C18.7702 4.5199 21.3721 4.00358 24 4C26.62 4 29.22 4.52 31.66 5.52C34.08 6.52 36.28 8 38.14 9.86C40 11.72 41.48 13.92 42.48 16.34C43.48 18.78 44 21.38 44 24C44 29.3 41.9 34.4 38.14 38.14C36.2852 40 34.0813 41.4751 31.6547 42.4808C29.2281 43.4864 26.6267 44.0027 24 44C21.3721 43.9964 18.7702 43.4801 16.34 42.48C13.9161 41.4726 11.7143 39.9979 9.86001 38.14C8.00005 36.2852 6.52488 34.0812 5.51923 31.6547C4.51359 29.2281 3.9973 26.6267 4.00001 24C4.00001 18.7 6.10001 13.6 9.86001 9.86C11.72 8 13.92 6.52 16.34 5.52ZM24 34L27.12 27.16L34 24L27.12 20.88L24 14L20.86 20.88L14 24L20.86 27.16L24 34Z"
          fill={color}
        />
      </Svg>
    </View>
  );
};

export default ScoreStore;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
});
