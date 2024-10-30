import { View } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";

export default function DragHandleComponent(second) {
    return (
        <View style={{width: scale(40), 
            height: verticalScale(5), 
            borderRadius: 3, 
            backgroundColor: "#ccc", 
            marginTop: verticalScale(0), 
            marginBottom: verticalScale(16), }} />
    )
}