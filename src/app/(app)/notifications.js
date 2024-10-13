import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Modal,
  ScrollView,
  Image,
} from "react-native";
import { X, CaretRight } from "phosphor-react-native";
import NoNotification from "../../../assets/images/noNotification.png";
import CustomText from "../../components/CustomText";
import { notifications } from "../../components/UserData/Notifications"; // Certifique-se de que o caminho está correto.
import Constants from 'expo-constants'
const NotificationsModal = ({ visible, onClose }) => {
  const today = new Date().toISOString().split("T")[0];

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

  // Filtrando notificações para "hoje" e "mais antigas"
  const todayNotifications = notifications.filter(
    (notif) => notif.date === today
  );
  const oldNotifications = notifications.filter(
    (notif) => notif.date !== today
  );

  // Verificando se há notificações
  const hasNotifications =
    todayNotifications.length > 0 || oldNotifications.length > 0;

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.header}>
          <Pressable onPress={onClose}>
            <X size={24} color="#000" />
          </Pressable>
        </View>
        <View>
          <CustomText style={styles.headerText}>Notificações</CustomText>
        </View>

        {/* Se houver notificações, exibe as seções "Hoje" e "Mais Antigas", caso contrário, exibe mensagem e imagem */}
        {hasNotifications ? (
          <ScrollView style={styles.body}>
            {/* Seção de notificações de hoje */}
            {todayNotifications.length > 0 && (
              <View style={styles.section}>
                <CustomText style={styles.sectionTitle}>Hoje</CustomText>
                {todayNotifications.map((notif, index) => (
                  <View key={index} style={styles.notificationItem}>
                    <View style={styles.containerImgSender}>
                      <Image
                        source={{ uri: notif.imgSender }}
                        style={styles.image}
                      />
                    </View>
                    <View style={styles.textContainer}>
                      {/* Linha com remetente e data */}
                      <View style={styles.headerRow}>
                        <CustomText variant="bold">{notif.sender}</CustomText>
                        <CustomText color="#7F7F7F">
                          {formatDate(notif.date)}
                        </CustomText>
                      </View>

                      {/* Conteúdo da notificação */}
                      <View style={styles.containerText}>
                        <CustomText style={styles.contentText}>
                          {notif.content}
                        </CustomText>
                        <View style={styles.wrapperAcces}>
                          <CustomText
                            style={styles.notificationCount}
                            variant="bold"
                          >
                            {notif.qntdNotif}
                          </CustomText>
                          <Pressable style={styles.accessButton}>
                            <CaretRight />
                          </Pressable>
                        </View>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            )}

            {/* Seção de notificações antigas */}
            {oldNotifications.length > 0 && (
              <View style={styles.section}>
                <CustomText style={styles.sectionTitle}>
                  Mais Antigas
                </CustomText>
                {oldNotifications.map((notif, index) => (
                  <View key={index} style={styles.notificationItemOld}>
                    <View style={styles.containerImgSender}>
                      <Image
                        source={{ uri: notif.imgSender }}
                        style={styles.image}
                      />
                    </View>
                    <View style={styles.textContainer}>
                      {/* Linha com remetente e data */}
                      <View style={styles.headerRow}>
                        <CustomText variant="bold">{notif.sender}</CustomText>
                        <CustomText color="#6B6B6B">
                          {formatDate(notif.date)}
                        </CustomText>
                      </View>

                      {/* Conteúdo da notificação */}
                      <View style={styles.containerText}>
                        <CustomText style={styles.contentText} color="#6B6B6B">
                          {notif.content}
                        </CustomText>
                        <View style={styles.wrapperAcces}>
                          <CustomText
                            style={styles.notificationCountOld}
                            variant="bold"
                          >
                            {notif.qntdNotif}
                          </CustomText>
                          <Pressable style={styles.accessButton}>
                            <CaretRight />
                          </Pressable>
                        </View>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            )}
          </ScrollView>
        ) : (
          <View style={styles.noNotificationsContainer}>
            <Image
              source={NoNotification}
              style={styles.noNotificationImage}
              resizeMode="cover"
            />
            <CustomText style={styles.noNotificationsText} variant="semibold">
              Sem notificações
            </CustomText>
          </View>
        )}
      </View>
    </Modal>
  );
};

export default NotificationsModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: Constants.statusBarHeight
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  headerText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 12,
  },
  body: {
    padding: 12,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  notificationItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    borderWidth: 0.5,
    borderColor: "#949494",
    borderRadius: 5,
    backgroundColor: "#F7F7F7",
  },
  containerImgSender: {
    borderWidth: 3,
    borderColor: "#F5C330",
    borderRadius: 50,
    margin: 5,
  },
  image: {
    width: 48,
    height: 48,
    borderRadius: 50,
  },
  noNotificationsText: {
    fontSize: 30,
    color: "#757575",
  },
  textContainer: {
    flex: 1,
    flexWrap: "wrap",
    margin: 8,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  containerText: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  wrapperAcces: {
    flex: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  notificationCount: {
    backgroundColor: "#FFDA6F",
    width: 20,
    height: 20,
    borderRadius: 4,
    textAlign: "center",
    // padding: 3,
  },
  notificationCountOld: {
    backgroundColor: "#7F7F7F",
    width: 20,
    height: 20,
    borderRadius: 4,
    textAlign: "center",
  },
  accessButton: {
    fontSize: 20,
  },
  notificationItemOld: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: "#949494",
    backgroundColor: "#cdcdcd",
  },
  contentText: {
    flexWrap: "wrap",
    width: "79%",
    color: "#6B6B6B",
  },
  oldNotifications: {
    backgroundColor: "#BDBDBD",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    borderWidth: 0.5,
    borderRadius: 5,
  },
  noNotificationsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noNotificationImage: {
    width: 400,
    height: 265,
  },
});
