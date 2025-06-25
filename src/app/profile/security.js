import {
  View,
  Pressable,
  Button,
  StyleSheet,
  Modal,
  ScrollView,
} from "react-native";
import CustomText from "../../components/CustomText";
import { router } from "expo-router";
import { CaretRight, CaretLeft } from "phosphor-react-native";
import { useState } from "react";
import Constants from "expo-constants";
import theme from "../../themes/themes";
import PrivacyNotice from "../privacyNotice"

export default function Security() {
  const [isNoticeVisible, setIsNoticeVisible] = useState(false);
  const handleShowNotice = () => setIsNoticeVisible(true);
  const handleHideNotice = () => setIsNoticeVisible(false);

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => {
          router.navigate("/");
        }}
      >
        <CaretLeft size={30} color="black" />
      </Pressable>
      <CustomText style={{ marginTop: 16 }} variant="bold" fontSize={24}>
        Segurança
      </CustomText>
      <Pressable
        style={styles.button}
        onPress={() => router.navigate("confirmationEmail")}
      >
        <CustomText variant="bold">Confirmaçao de e-mail</CustomText>
        <CaretRight size={20} />
      </Pressable>

      <Pressable
        style={styles.button}
        onPress={() => {
          router.push("changePassword");
        }}
      >
        <CustomText variant="bold">Alterar senha</CustomText>
        <CaretRight size={20} />
      </Pressable>

      <Pressable style={styles.button} onPress={handleShowNotice}>
        <CustomText variant="bold">Aviso de privacidade</CustomText>
        <CaretRight size={20} />
      </Pressable>

      <Modal
        visible={isNoticeVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={handleHideNotice}
      >
        <View style={styles.modalContainer}>
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <PrivacyNotice handleHideNotice={handleHideNotice} />
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "start",
    padding: 20,
    marginTop: Constants.statusBarHeight,
  },
  button: {
    backgroundColor: theme.colors.bgYellowLight,
    width: 350,
    height: 71,
    borderRadius: 8,
    alignItems: "center",
    padding: 15,
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalContainer: {
    flex: 1,
  },
  scrollViewContent: {
    flex: 1,
  },
});
