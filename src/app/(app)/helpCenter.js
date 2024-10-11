import { View, Pressable, Button, StyleSheet, Modal, ScrollView } from "react-native";
import CustomText from "../../components/CustomText";
import { router } from "expo-router";
import { CaretRight, CaretLeft } from "phosphor-react-native";
import { useState } from "react";
import TermsAndConditionsScreen from '../termsAndConditions'

export default function HelpCenter(second) {
  const [isTermsVisible, setIsTermsVisible] = useState(false);

  const handleShowTerms = () => setIsTermsVisible(true);
  const handleHideTerms = () => setIsTermsVisible(false);

  return (
    <View style={styles.container}>
      <Pressable onPress={() => {
        console.log('pressed');
        router.navigate('/')
        
      }}>
        <CaretLeft size={30} color="black" />
      </Pressable>
      <CustomText style={{marginTop: 20}} variant="bold">Central de Ajuda</CustomText>
      <Pressable style={styles.button} onPress={() => router.navigate('/faq')}>
        <CustomText variant="semiBold">FAQ</CustomText>
        <CaretRight size={20} />
      </Pressable>
      <Pressable style={styles.button} onPress={handleShowTerms}>
        <CustomText variant="semiBold">Termos de Uso</CustomText>
        <CaretRight size={20} />
      </Pressable>
      <Pressable style={styles.button}>
        <CustomText variant="semiBold">Fale Conosco</CustomText>
        <CaretRight size={20} />
      </Pressable>

      <Modal
        visible={isTermsVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={handleHideTerms}
      >
        <View style={styles.modalContainer}>
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <TermsAndConditionsScreen handleHideTerms={handleHideTerms} />
          </ScrollView>
          {/* <Pressable onPress={handleHideTerms} style={styles.closeButton}>
            <MaterialIcons name="close" size={30} color="black" />
          </Pressable> */}
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'start',
        padding: 20,
    },
    button: {
        backgroundColor: '#FFEAAD',
        width: 350,
        height: 71,
        borderRadius: 8,
        alignItems: 'center',
        padding: 15,
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    modalContainer: {
      flex: 1
    },
    scrollViewContent: {
      flexGrow: 1,
    },
})