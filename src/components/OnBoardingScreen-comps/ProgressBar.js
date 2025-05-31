import React from "react";
import { View } from "react-native";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";

const ProgressBar = ({ step }) => {
  return (
    <View
      style={{ backgroundColor: "rgba(228, 228, 228, 1)", width: scale(300), height: verticalScale(8),
        flexDirection: "row", alignItems: "center", justifyContent: "space-between",
        marginBottom: 50, borderRadius: 120
      }}
    >
      {[1, 2, 3].map((item) => (
        <View
          key={item}
          style={{
            backgroundColor:
              step >= item ? "rgba(117, 117, 117, 1)" : "rgba(228, 228, 228, 1)",
            height: verticalScale(8), width: moderateScale(100), borderRadius: 120,
          }}
        />
      ))}
    </View>
  );
};

export default ProgressBar;