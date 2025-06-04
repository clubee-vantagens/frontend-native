import React from 'react';
import { View, StyleSheet } from 'react-native';
import CustomText from '../../components/CustomText';
import { notifications } from '../../components/UserData/Notifications';

export default function TotalNotificationBadge() {
  // Função contagem das notificações
  const getTotalNotifications = () => {
    return notifications.reduce((total, notif) => total + notif.qntdNotif, 0);
  };

  const total = getTotalNotifications();

  if (!total || total <= 0) return null;

  return (
    <View style={styles.notificationBadge}>
      <CustomText style={styles.notificationText}>{total}</CustomText>
    </View>
  );
}

const styles = StyleSheet.create({
  notificationBadge: {
    position: "absolute",
    left: -11,
    bottom: -9,
    backgroundColor: "#FCD562",
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  notificationText: {
    color: "#000",
    fontSize: 10,
    fontWeight: "bold",
  },
});