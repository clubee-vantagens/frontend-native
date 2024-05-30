import {Pressable, Text, StyleSheet} from 'react-native'

export default function CustomButton({children, onPress, type}) {
    return (
        <Pressable style={[styles.buttonTypeOne, styles.baseButton]}onPress={onPress}><Text style={styles.buttonText}>{children}</Text></Pressable>
    )
}

const styles = StyleSheet.create({
    baseButton: {
        width: 359,
        height: 50,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonTypeOne: {
        backgroundColor: "#6ff79a",
    },
    buttonText: {
        fontWeight:'bold',
        fontSize: 18,
    }
})