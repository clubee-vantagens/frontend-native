import React from 'react';
import { View, Text, Pressable, StyleSheet, FlatList, Image, Modal, Share } from 'react-native';

export default function ShareModal({ isVisible, onClose, contentToShare }) {
  // Function to handle sharing
  const handleShare = async (app) => {
    try {
      const shareOptions = {
        message: contentToShare.message,
        title: contentToShare.title,
        // You can also include a URL if needed
        url: contentToShare.url,
      };

      const result = await Share.share(shareOptions);
      
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
          console.log('Shared with activity type:', result.activityType);
        } else {
          // shared
          console.log('Shared successfully');
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
        console.log('Share dismissed');
      }
      onClose();
    } catch (error) {
      console.error(error.message);
    }
  };

  const apps = [
    { 
      id: '1', 
      name: 'Telegram', 
      icon: require('../assets/images/icons/Icone pontos card categorias.svg'),
      action: () => handleShare('telegram')
    },
    // Add more apps with their respective actions
  ];

  const renderAppItem = ({ item }) => (
    <Pressable 
      style={styles.app} 
      onPress={item.action}
    >
      <Image source={item.icon} style={styles.appIcon} />
      <Text style={styles.appName}>{item.name}</Text>
    </Pressable>
  );

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Share via</Text>
            <Pressable onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>×</Text>
            </Pressable>
          </View>

          <FlatList
            data={apps}
            keyExtractor={(item) => item.id}
            numColumns={4}
            renderItem={renderAppItem}
            contentContainerStyle={styles.appsList}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '80%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 8,
  },
  closeButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#999',
  },
  appsList: {
    paddingVertical: 10,
  },
  app: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    maxWidth: '25%',
  },
  appIcon: {
    width: 50,
    height: 50,
    marginBottom: 5,
  },
  appName: {
    fontSize: 12,
    textAlign: 'center',
  },
});

