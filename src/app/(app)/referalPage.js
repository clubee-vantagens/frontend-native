import {
  Pressable,
  StyleSheet,
  View,
  Image,
  TextInput,
  ScrollView,
  Share,
  Platform,
} from "react-native";
import { statusBarHeight } from "../../constants/constants";
import { CaretLeft, Copy, StarFour } from "phosphor-react-native";
import CustomText from "../../components/CustomText";
import { scale } from "react-native-size-matters";
import CustomButton from "../../components/CustomButton";
import ShareModal from "../../components/ShareModal";
import { useState } from "react";
import { router } from "expo-router";
import TermsAndConditionsScreen from "../termsAndConditions";
import * as Clipboard from "expo-clipboard";

export default function ReferalPage(second) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isTermsActive, setIsTermsActive] = useState(false);
  const shareLink = "https://www.example.com";
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };
  const toggleTerms = () => {
    setIsTermsActive(!isTermsActive);
  };

  if (isTermsActive) {
    return <TermsAndConditionsScreen handleHideTerms={toggleTerms} />;
  }
  const copyToClipboard = async () => {
    try {
      await Clipboard.setStringAsync(shareLink);
      // Optionally add some feedback to show the user it was copied
    } catch (error) {
      console.error("Failed to copy text: ", error);
    }
  };

  const onShare = async () => {
    try {
      const shareContent = {
        title: 'Clubee',
        message: 'Compartilhe o Clubee com seus amigos e familiares!',
        // You can also include a URL
        url: Platform.select({
          ios: 'https://apps.apple.com/us/app/',
          android: 'https://play.google.com/store/apps/'
        })
      };
      if (Platform.OS === 'ios') {
        await Share.shareAsync(shareContent.url, {
          dialogTitle: shareContent.title,
          mimeType: 'text/plain',
          UTI: 'public.plain-text'
        });
      } else {
        // For Android and other platforms
        await Share.share(shareContent);
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <CaretLeft size={24} />
        </Pressable>
        <CustomText
          style={{
            alignSelf: "flex-start",
            fontSize: scale(24),
            marginBottom: 10,
          }}
          variant="bold"
        >
          Indique Clubee
        </CustomText>
        <View style={{ alignItems: "center" }}>
          <Image
            source={require("../../../assets/images/referal-image.png")}
            style={styles.image}
          />
          <CustomText
            variant="bold"
            style={{ fontSize: scale(19), textAlign: "center" }}
          >
            Chame seus amigos para o Clubee e acumule pontos
          </CustomText>
          <CustomText
            style={{
              fontSize: scale(14),
              textAlign: "center",
              width: scale(260),
            }}
          >
            receba 600 pontos para cada amigo que entrar no Clubee!
          </CustomText>
        </View>
        <View style={{ alignItems: "center" }}>
          <CustomText
            variant="semiBold"
            style={{
              fontSize: scale(16),
              alignSelf: "flex-start",
              marginTop: 10,
            }}
          >
            Compartilhe seu link
          </CustomText>
          <View>
            <TextInput
              editable={false}
              style={styles.smallInput}
              value={shareLink}
            />
            <Pressable
              onPress={copyToClipboard}
              style={{
                position: "absolute", // Ensure it's positioned within the parent
                top: 25,
                right: 30,
                padding: 10, // Add padding for better touch target
              }}
            >
              <Copy size={24} />
            </Pressable>
          </View>
          <CustomButton onPress={onShare}>Compartilhar</CustomButton>
          <Pressable onPress={toggleTerms}>
            <CustomText
              variant="bold"
              style={{ fontSize: scale(14), marginTop: 10 }}
            >
              Termos e Condições
            </CustomText>
          </Pressable>
        </View>
        <View style={{ marginTop: 10 }}>
          <CustomText style={{ fontSize: scale(16) }}>Meus Ganhos</CustomText>
          <View
            style={{
              flexDirection: "row",
              width: scale(300),
              border: 2,
              borderColor: "red",
              justifyContent: "space-between",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <StarFour size={24} />
              <CustomText>Pontos Ganhos</CustomText>
            </View>
            <CustomText>1200 pontos</CustomText>
          </View>
        </View>
        {/* Sharing Modal */}
        {/* <ShareModal
          isVisible={isModalVisible}
          onClose={toggleModal}
          contentToShare={{
            message: "Check out this content",
            title: "Share this content!",
            url: "google.com",
          }}
        /> */}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: statusBarHeight,
    flex: 1,
    padding: 10,
  },
  backButton: {
    alignSelf: "flex-start",
    marginBottom: 10,
    marginTop: 10,
  },
  image: {
    height: scale(380),
    width: scale(380),
    marginBottom: 10,
    marginTop: 10,
  },
  smallInput: {
    height: 50,
    width: scale(320),
    borderRadius: 7,
    border: 1,
    borderColor: "#FAFAFA",
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
