import { Pressable, StyleSheet, Text, View, Image, TextInput, ScrollView, Share } from "react-native";
import { statusBarHeight } from "../../constants/constants";
import { CaretLeft, Copy, StarFour } from "phosphor-react-native";
import CustomText from "../../components/CustomText";
import CustomInput from "../../components/CustomInput";
import { scale } from "react-native-size-matters";
import CustomButtonTwo from "../../components/CustomButtonTwo";
import CustomButton from "../../components/CustomButton";
import ShareModal from "../../components/ShareModal";
import { useState } from "react";

export default function ReferalPage(second) {
    const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };
    
  return (
    <ScrollView style={{flex: 1}}>
      <View style={styles.container}>

      <Pressable onPress={() => router.back()} style={styles.backButton}>
        <CaretLeft size={24} />
      </Pressable>
      <CustomText style={{alignSelf: 'flex-start', fontSize: scale(24), marginBottom: 10}} variant="bold">Indique Clubee</CustomText>
      <View style={{alignItems: 'center'}}>
      <Image
            source={require('../../../assets/images/referal-image.png')}
            style={styles.image}
          />
        <CustomText variant="bold" style={{fontSize: scale(19), textAlign: 'center'}}>Chame seus amigos para o Clubee e acumule pontos</CustomText>
        <CustomText style={{fontSize: scale(14), textAlign: 'center', width: scale(260)}}>receba 600 pontos para cada amigo que entrar no Clubee!</CustomText>
      </View>
      <View style={{alignItems: 'center'}}>
        <CustomText variant="semiBold" style={{fontSize: scale(16), alignSelf: 'flex-start', marginTop: 10}}>Compartilhe seu link</CustomText>
        <View>
            <TextInput editable={false} style={styles.smallInput} placeholder="LINK de COMPARTILHAMENTO"/>
            <Pressable style={{
                position: 'absolute', // Ensure it's positioned within the parent
                top: 15,
                right: 30,
                padding: 10, // Add padding for better touch target
            }}>
                <Copy size={24} />

            </Pressable>

        </View>
        <CustomButton onPress={toggleModal}>Compartilhar</CustomButton>
        <Pressable>
            <CustomText variant="bold" style={{fontSize: scale(14), marginTop: 10}}>Termos e Condicoes</CustomText>
        </Pressable>
      </View>
      <View>
        <CustomText style={{fontSize: scale(16)}}>Meus Ganhos</CustomText>
        <View style={{flexDirection: 'row', width: scale(300), border: 2, borderColor: 'red', justifyContent: 'space-between'}}>
            <View style={{flexDirection: 'row'}}>
                <StarFour size={24}/>
                <CustomText>Pontos Ganhos</CustomText>
            </View>
            <CustomText>1200 pontos</CustomText>
        </View>
      </View>
      {/* Sharing Modal */}
      <ShareModal isVisible={isModalVisible} onClose={toggleModal} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: statusBarHeight,
    flex: 1,
    padding: 10
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 10,
    marginTop: 10 
  },
  image: {
    height: scale(380),
    width: scale(380),
    marginBottom: 10,
    marginTop: 10
  },
  smallInput: {
    height: 50,
    width: scale(320),
    borderRadius: 7,
    border: 1,
    borderColor: '#FAFAFA',
    padding: 5,
    backgroundColor: "#fff",
    margin: 20,
    textAlign: "left",
    paddingLeft: 25,
    color: "#757575",
    fontSize: 18,
    fontWeight: "semibold",
  },
});
