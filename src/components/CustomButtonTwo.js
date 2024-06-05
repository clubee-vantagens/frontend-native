import {Pressable, Text, StyleSheet} from 'react-native'
import CustomText from './CustomText'

export default function CustomButtonTwo({children, onPress}) {
    return (
        <Pressable style={[styles.baseButton, styles.buttonTypeTwo]} onPress={onPress}>
            <CustomText style={styles.buttonText} variant="semiBold">{children}</CustomText>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    baseButton: {
        width: 270,
        height: 50,
        borderRadius: 15,
        elevation: 5,
        alignItems: "center",
        justifyContent: "center"
    },
    buttonTypeTwo: {
        backgroundColor: "#6FF79A",
    },
    buttonText: {
        fontSize: 18
    }
})