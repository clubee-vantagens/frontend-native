import { View, StyleSheet, FlatList, Dimensions, Image, Pressable } from "react-native";
import React, { useState, useRef, useEffect } from "react";
import ProgressBar from "../../../../components/OnBoardingScreen-comps/ProgressBar";
import CustomText from "../../../../components/CustomText";
import { scale, verticalScale } from "react-native-size-matters";
import { router } from 'expo-router';
import { useSession } from "../../../../context/ctx";
import AntDesign from '@expo/vector-icons/AntDesign';

const { width } = Dimensions.get('window');

const OnBoardingScreen = () => {
  // Controla a coloração da progressBar
  const [currentStep, setCurrentStep] = useState(0);
  // Controla a visibilidade das setas enquanto rola
  const [showArrows, setShowArrows] = useState(true);
  const flatListRef = useRef();
  const { session } = useSession();

  useEffect(() => {
    if (session) {
      router.replace("/menu");
    }
  }, [session]);

  // Utiliza um array pages para definir titulo e imagem de cada "página"
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

  // Metodo responsável por setar o step e pintar as barras
  const handleScroll = (event) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentStep(index);
  };

  // Metodo responsável para ir para tela de Login
  const handlePular = () => {
    router.replace('/signin')
  };

  // Metodo responsável para ir para tela de cadastro
  const handleCadastrar = () => {
    router.replace('/signup')
  }

  // Quando começa a rolar, as setas somem
  const handleScrollBegin = () => {
    setShowArrows(false);  
  };

  // Quando a rolagem termina, as setas aparecem novamente
  const handleScrollEnd = () => {
    setShowArrows(true);  
  };

  // renderItem transforma cada "Tela do onboarding (3 no momento) em um item"
  // Definido em pages seu titulo e imagem
  // Renderizando o resto dos componentes e mostrando-os em FlatList
  const renderItem = ({ item }) => (
    <View style={styles.page}>
      <CustomText style={styles.upperText}>{item.title}</CustomText>
      <Image source={item.image} style={styles.image} />

       {/* Setas de navegação */}
       {showArrows && (
          <View style={styles.arrowsContainer}>
            {/* Seta Esquerda */}
            {currentStep > 0 && (
              <AntDesign
                name="left"
                size={24}
                color="black"
                onPress={() => flatListRef.current.scrollToIndex({ index: currentStep - 1 })}
                style={styles.arrowLeft}
              />
            )}

            {/* Seta Direita */}
            {currentStep < pages.length - 1 && (
              <AntDesign
                name="right"
                size={24}
                color="black"
                onPress={() => flatListRef.current.scrollToIndex({ index: currentStep + 1 })}
                style={styles.arrowRight}
              />
            )}
          </View>
        )}
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
        onScrollBeginDrag={handleScrollBegin}  // Detecta quando começa a rolar
        onScrollEndDrag={handleScrollEnd}      // Detecta quando termina de rolar
      />

      <Pressable style={styles.signInButton} onPress={handleCadastrar}>
        <CustomText style={styles.signInText}>Cadastre-se</CustomText>
      </Pressable>

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
    marginTop: verticalScale(20),
    marginBottom: verticalScale(10),
  },
  upperText: {
    fontSize: 20,
    textAlign: 'left',
    fontWeight: 'bold',
    marginTop: -100,
  },
  arrowsContainer: {
    position: 'absolute',
    top: '50%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: scale(20),
    zIndex: 10,
  },
  arrowLeft: {
    position: 'absolute',
    left: 5,
    transform: [{ translateY: -12 }],
  },
  arrowRight: {
    position: 'absolute',
    right: 5,
    transform: [{ translateY: -12 }],
  },
  signInButton: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 120,
    borderWidth: 1,
    borderColor: "rgba(21, 15, 2, 1)",
    borderRadius: 30,
    width: 315,
    paddingVertical: 10,
    zIndex: 10,
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
    zIndex: 10,
  },
  pularText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
    textDecorationLine: "underline",
  },
});

export default OnBoardingScreen;
