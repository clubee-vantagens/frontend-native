import { Pressable, View, StyleSheet } from "react-native";
import CustomText from "./CustomText";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { router } from "expo-router";
import theme from "../themes/themes";

export default function CatagoryBubble({icon, title, page}) {
    const navigationTitle = title.toLowerCase()
    const textColor = page === 'index' ? '#fff' : 'black'
    const backgroundColor = theme.colors.mainBgColor
    const textSize = page === 'index' ? moderateScale(12) : moderateScale(8)
    const border = page === 'index' ? null : 1
  return (
    <View style={styles.menuItem}>
      <Pressable
        style={[styles.MenuButton, { backgroundColor, borderWidth: border }]}
        onPress={() => router.navigate(`/${navigationTitle}`)}
      >
        {icon}
      </Pressable>
      {title === 'categories' ? null : <CustomText style={[styles.buttonText, { color: textColor, fontSize: textSize }]}>{title}</CustomText>}
    </View>
  );
}

const styles = StyleSheet.create({
    menuItem: {
        alignItems: 'center',
        width: scale(80), // Set a fixed width for consistent alignment
        minHeight: verticalScale(100), // Add a minHeight to account for wrapped text
      },
      MenuButton: {
        width: scale(70),
        height: scale(70),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
      },
      buttonText: {
        marginTop: 4,
        width: scale(70),
        textAlign: 'center',
        flexWrap: 'wrap', // Allow text to wrap
      },

})