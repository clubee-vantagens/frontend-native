import { View, StyleSheet, FlatList, Dimensions, Image, Pressable } from "react-native";
import React, { useState, useRef } from "react";
import ProgressBar from "../../../../components/OnBoardingScreen-comps/ProgressBar";
import CustomText from "../../../../components/CustomText";
import { scale, verticalScale } from "react-native-size-matters";
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

const OnBoardingScreen = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const flatListRef = useRef();

  const pages = [
    {
      title: "Vantagens exclusivas? Temos!\nAcumule pontos e aproveite!",
      image: require("../../../../assets/images/onboarding-1.webp"),
    },
    {
      title: "Vamos ajudar o comércio da sua comunidade a crescer!",
      image: require("../../../../assets/images/onboarding-2.webp"),
    },
    {
      title: "Vamos descobrir lojas e produtos pertinhos de você?",
      image: require("../../../../assets/images/onboarding-3.webp"),
    },
  ];

  const handleScroll = (event) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentStep(index);
  };

  const handlePular = () => {
    router.replace('/SignIn')
  };

  const handleCadastrar = () => {
    router.replace('/SignUp')
  }

  // renderItem transforma cada "Tela do onboarding (3 no momento) em um item"
  // Definido em pages seu titulo e imagem
  // Renderizando o resto dos componentes e mostrando-os em FlatList
  const renderItem = ({ item }) => (
    <View style={styles.page}>
      <CustomText style={styles.upperText}>{item.title}</CustomText>
      <Image source={item.image} style={styles.image} />

      <Pressable style={styles.signInButton} onPress={handleCadastrar}>
        <CustomText style={styles.signInText}>Cadastre-se</CustomText>
      </Pressable>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.progressBar}>
        <ProgressBar step={currentStep + 1} />
      </View>

      <FlatList
        data={pages}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        ref={flatListRef}
      />

      <Pressable onPress={handlePular} style={styles.pularButton}>
        <CustomText style={styles.pularText}>Pular</CustomText>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(247, 247, 247, 1)',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  progressBar: {
    marginTop: 70,
    marginBottom: -70
  },
  page: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  image: {
    width: scale(300),
    height: verticalScale(325),
    resizeMode: "contain",
    marginTop: verticalScale(30),
    marginBottom: verticalScale(10),
  },
  upperText: {
    fontSize: 20,
    textAlign: 'left',
    fontWeight: 'bold',
    marginTop: -50,
  },
  signInButton: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: "rgba(21, 15, 2, 1)",
    borderRadius: 30,
    width: 315,
    paddingVertical: 10,
  },
  signInText: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  pularButton: {
    position: 'absolute',
    bottom: 50,
    left: 40,
  },
  pularText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
    textDecorationLine: "underline",
  },
});

export default OnBoardingScreen;
