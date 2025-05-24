import {  Image, View, StyleSheet, Pressable, Button } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Onboarding from "react-native-onboarding-swiper";
import CustomText from "../../../../components/CustomText";
import { router } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingScreen from "../../../../components/LoadingScreen";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import Constants from 'expo-constants'

const OnBoardingScreen = () => {
  const onboardingRef = useRef(null);
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(null);

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      try {
        const value = await AsyncStorage.getItem("hasSeenOnboarding");
        if (value === null) {
          // User did not see onboarding
          setHasSeenOnboarding(false);
        } else {
          // User has seen Onboarding
          setHasSeenOnboarding(true);
          router.navigate("SignIn");
        }
      } catch (error) {
        console.error(error);
      }
    };
    checkOnboardingStatus();
  }, []);

  // Set onboarding status when user completes it
  const markOnboardingComplete = async () => {
    try {
      await AsyncStorage.setItem("hasSeenOnboarding", "true");
      setHasSeenOnboarding(true);
    } catch (e) {
      console.error("Failed to save onboarding status", e);
    }
  };

  const resetStorage = async () =>
    await AsyncStorage.removeItem("hasSeenOnboarding");

  resetStorage();

  const dotComponent = () => {
    return null
  }

  const Skip = ({ onPress, isLight, skipLabel, ...props }) => (
    <Pressable
      title={'Pular'}
      containerViewStyle={{
        marginVertical: 10,
        width: 70,
      }}
      // textStyle={{ color: color(isLight) }}
      style={{marginLeft: 50 }}
      {...props}
      onPress={onPress}
    >
      <CustomText variant="semiBold" style={{textDecorationLine: 'underline'}}>{skipLabel}</CustomText>
      
    </Pressable>
  );

  const pages = [
    {
      title: "",
      subtitle: (
        <Pressable
          style={[styles.buttonBackground, {marginTop: -15}]}
          onPress={() => {
            markOnboardingComplete();
            router.navigate("signupUser");
          }}
        >
          <CustomText variant="semiBold" style={styles.button}>
            Cadastre-se
          </CustomText>
        </Pressable>
      ),
      backgroundColor: "#fff",
      image: (
        <View style={{ marginTop: -20, alignItems: "center" }}>
          <View style={{ backgroundColor: "#d3d3d3", width: scale(300), height: verticalScale(8), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 50, borderRadius: 120}}>
            <View style={{ backgroundColor: "#757575", height: verticalScale(8), width: moderateScale(100), borderRadius: 120 }}></View>
            <View style={{ backgroundColor: "#757575", height: verticalScale(8), width: moderateScale(100), borderRadius: 120 }}></View>
            <View style={{ backgroundColor: "#d3d3d3", height: verticalScale(8), width: moderateScale(100), borderRadius: 120 }}></View>
          </View>
          <CustomText style={{ fontSize: 20, width: 330 }} variant="semiBold">
            Vantagens exclusivas? Temos!
            Acumule pontos e aproveite!
          </CustomText>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image source={require("../../../../assets/images/onboarding-1.webp")} />
            <AntDesign
              name="right"
              size={24}
              color="black"
              onPress={() => onboardingRef.current.goNext()}
            />
          </View>
        </View>
      ),
    },
    {
      title: "",
      subtitle: (
        <Pressable
          style={[styles.buttonBackground, {marginTop: -50}]}
          onPress={() => {
            markOnboardingComplete();
            router.navigate("signupUser");
          }}
        >
          <CustomText variant="semiBold" style={styles.button}>
            Cadastre-se
          </CustomText>
        </Pressable>
      ),
      backgroundColor: "#fff",
      image: (
        <View style={{ marginTop: -15, alignItems: "center" }}>
          <View style={{ backgroundColor: "#d3d3d3", width: scale(300), height: verticalScale(8), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 50, borderRadius: 120}}>
            <View style={{ backgroundColor: "#757575", height: verticalScale(8), width: moderateScale(100), borderRadius: 120 }}></View>
            <View style={{ backgroundColor: "#757575", height: verticalScale(8), width: moderateScale(100), borderRadius: 120 }}></View>
            <View style={{ backgroundColor: "#d3d3d3", height: verticalScale(8), width: moderateScale(100), borderRadius: 120 }}></View>
          </View>
          <CustomText style={{ fontSize: 20, width: 340 }} variant="semiBold">
            Vamos ajudar o comércio da sua comunidade a crescer!
          </CustomText>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <AntDesign
              name="left"
              size={24}
              color="black"
              onPress={() => onboardingRef.current.goToPage(0, true)}
            />
            <Image source={require("../../../../assets/images/onboarding-2.webp")} />
            <AntDesign
              name="right"
              size={24}
              color="black"
              onPress={() => onboardingRef.current.goNext()}
            />
          </View>
        </View>
      ),
    },
    {
      title: "",
      subtitle: (
        <Pressable
          style={[styles.buttonBackground, {marginTop: -25}]}
          onPress={() => {
            markOnboardingComplete();
            router.navigate("signupUser");
          }}
        >
          <CustomText variant="semiBold" style={styles.button}>
            Cadastre-se
          </CustomText>
        </Pressable>
      ),
      backgroundColor: "#fff",
      image: (
        <View style={{ marginTop: -5, alignItems: "center" }}>
          <View style={{ backgroundColor: "#d3d3d3", width: scale(300), height: verticalScale(8), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 50, borderRadius: 120}}>
            <View style={{ backgroundColor: "#757575", height: verticalScale(8), width: moderateScale(100), borderRadius: 126 }}></View>
            <View style={{ backgroundColor: "#757575", height: verticalScale(8), width: moderateScale(100), borderRadius: 126 }}></View>
            <View style={{ backgroundColor: "#757575", height: verticalScale(8), width: moderateScale(100), borderRadius: 126 }}></View>
          </View>
          <CustomText style={{ fontSize: 20, width: 300 }} variant="semiBold">
            Vamos descobrir lojas e produtos pertinhos de você?
          </CustomText>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <AntDesign
              name="left"
              size={24}
              color="black"
              onPress={() => onboardingRef.current.goToPage(1, true)}
            />
            <Image source={require("../../../../assets/images/onboarding-3.webp")} />
          </View>
        </View>
      ),  
    },
  ];

  // If the onboarding status is still loading, return null or a loading indicator
  if (hasSeenOnboarding === null) {
    return <LoadingScreen />; // You can replace this with a loading spinner if needed
  }

  return (
    <Onboarding
      ref={onboardingRef}
      onDone={() => {
        markOnboardingComplete();
        router.navigate("SignIn");
      }}
      onSkip={() => {
        markOnboardingComplete();
        router.navigate("SignIn");
      }}
      skipLabel={"Pular"}
      showNext={false}
      pages={pages}
      bottomBarColor="#fff"
      DotComponent={dotComponent}
      SkipButtonComponent={Skip}
    />
  );
};
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "blue",
  },
  headerTop: {
    color: "#232323",
    fontSize: 28,
    marginBottom: verticalScale(20),
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: scale(300),
    height: verticalScale(300),
    contentFit: "contain",
    marginBottom: verticalScale(30),
  },
  buttonBackground: {
    borderWidth: 1,
    borderColor: "#232323",
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(20),
    borderRadius: 25,
    marginTop: 20,
  },
  button: {
    color: "#232323",
    fontSize: 18,
    textAlign: "center",
    width: 300,
  },
});

export default OnBoardingScreen;
