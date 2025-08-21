import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Modal,
  ScrollView,
  Image,
  PanResponder,
  Animated,
} from "react-native";
import { X, CaretRight } from "phosphor-react-native";
import NoNotification from "../../assets/images/noNotification.png";
import CustomText from "../../components/CustomText";
import { notifications } from "../../components/UserData/Notifications";
import Constants from "expo-constants";
import {
  moderateScale,
  moderateVerticalScale,
  scale,
  verticalScale,
} from "react-native-size-matters";
import DragHandleComponent from "../../components/DragHandleComponent";

const NotificationsModal = ({ visible, onClose }) => {
  // const [translateY] = useState(new Animated.Value(0));
  const today = new Date().toISOString().split("T")[0];

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

  const todayNotifications = notifications.filter(
    (notif) => notif.date === today
  );
  const oldNotifications = notifications.filter(
    (notif) => notif.date !== today
  );

  const hasNotifications =
    todayNotifications.length > 0 || oldNotifications.length > 0;

  // const translateY = useRef(new Animated.Value(0)).current;

  // const panResponder = PanResponder.create({
  //   onStartShouldSetPanResponder: (_, gestureState) => {
  //     // Only set the responder if the gesture is near the top of the modal
  //     return gestureState.dy > 0 && translateY._value === 0;
  //   },
  //   onMoveShouldSetPanResponder: (_, gestureState) =>
  //     gestureState.dy > 0 && Math.abs(gestureState.dy) > Math.abs(gestureState.dx),
  //   onPanResponderMove: (_, gestureState) => {
  //     if (gestureState.dy > 0) {
  //       translateY.setValue(gestureState.dy);
  //     }
  //   },
  //   onPanResponderRelease: (_, gestureState) => {
  //     if (gestureState.dy > 100) {
  //       onClose();
  //     } else {
  //       Animated.spring(translateY, {
  //         toValue: 0,
  //         useNativeDriver: true,
  //       }).start();
  //     }
  //   },
  // });

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View
        style={[
          styles.modalContainer, { width: scale(350) }]}
        //   ,
        //   { transform: [{ translateY }] },
        // ]}
        // {...panResponder.panHandlers}
      >
        <View style={styles.header}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <DragHandleComponent />
            <Pressable
              onPress={onClose}
              style={{
                position: "absolute",
                right: scale(10),
                bottom: verticalScale(5),
              }}
            >
              <X size={24} color="#000" />
            </Pressable>
          </View>
          <CustomText style={styles.headerText} variant="semiBold">
            Notificações
          </CustomText>
        </View>
        <View></View>

        {hasNotifications ? (
          <ScrollView
            style={styles.body}
            contentContainerStyle={{
              paddingVertical: 10,
              flexGrow: 1, // Ensure it expands based on content
            }}
            showsVerticalScrollIndicator={false} // Optional: Hide scroll indicator
          >
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
                      <View style={styles.headerRow}>
                        <CustomText variant="bold">{notif.sender}</CustomText>
                        <CustomText color="#7F7F7F">
                          {formatDate(notif.date)}
                        </CustomText>
                      </View>
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
                      <View style={styles.headerRow}>
                        <CustomText variant="bold">{notif.sender}</CustomText>
                        <CustomText color="#6B6B6B">
                          {formatDate(notif.date)}
                        </CustomText>
                      </View>
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
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: Constants.statusBarHeight,
    position: "absolute",
    bottom: 0,
    maxHeight: "80%", // Set a maximum height for the modal
  },
  header: {
    justifyContent: "space-evenly",
    alignItems: "center",
    padding: 16,
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
  noNotificationsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noNotificationImage: {
    width: moderateScale(265),
    height: moderateVerticalScale(165),
  },
});
