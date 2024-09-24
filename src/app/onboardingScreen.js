import { Image, View, StyleSheet, Pressable } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Onboarding from "react-native-onboarding-swiper";
import CustomText from "../components/CustomText";
import { router } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingScreen from "../components/LoadingScreen";

const OnboardingScreen = () => {
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
          router.navigate("sign-in");
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

  resetStorage()

  const pages = [
    {
      title: "",
      subtitle: (
        <Pressable
          style={styles.buttonBackground}
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
        <View style={{ alignItems: "center" }}>
          <CustomText style={{ fontSize: 20, width: 300 }} variant="semiBold">
            Acumule vantagens exclusivas em suas compras.
          </CustomText>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image source={require("../../assets/images/onboarding-1.png")} />
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
          style={styles.buttonBackground}
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
        <View style={{ alignItems: "center" }}>
          <CustomText style={{ fontSize: 20, width: 300 }} variant="semiBold">
            Apoie e impulsione o comercio na sua comunidade.
          </CustomText>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <AntDesign
              name="left"
              size={24}
              color="black"
              onPress={() => onboardingRef.current.goToPage(0, true)}
            />
            <Image source={require("../../assets/images/onboarding-2.png")} />
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
          style={styles.buttonBackground}
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
        <View style={{ alignItems: "center" }}>
          <CustomText style={{ fontSize: 20, width: 300 }} variant="semiBold">
            Conheça novas lojas e produtos desenvolvidos por comerciantes
            locais.
          </CustomText>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <AntDesign
              name="left"
              size={24}
              color="black"
              onPress={() => onboardingRef.current.goToPage(1, true)}
            />
            <Image source={require("../../assets/images/onboarding-3.png")} />
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
        router.navigate("sign-in");
      }}
      onSkip={() => {
        markOnboardingComplete();
        router.navigate("sign-in");
      }}
      skipLabel={"Pular"}
      showNext={false}
      pages={pages}
      bottomBarColor="#fff"
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
    marginBottom: 20,
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 300,
    height: 300,
    contentFit: "contain",
    marginBottom: 30,
  },
  buttonBackground: {
    borderWidth: 1,
    borderColor: "#232323",
    paddingVertical: 10,
    paddingHorizontal: 20,
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

export default OnboardingScreen;
