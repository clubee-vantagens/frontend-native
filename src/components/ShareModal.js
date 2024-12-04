import React from 'react';
import { View, Text, Pressable, StyleSheet, FlatList, Image, Modal } from 'react-native';

export default function ShareModal({ isVisible, onClose }) {
  // Dummy data for contacts and apps
  const contacts = [
    { id: '1', name: 'Roberta', image: require('../../assets/images/perfil.jpg') },
    { id: '2', name: 'Carlos', image: require('../../assets/images/perfil.jpg') },
    { id: '3', name: 'Fábio', image: require('../../assets/images/perfil.jpg') },
    { id: '4', name: 'Sandra', image: require('../../assets/images/perfil.jpg') },
    { id: '5', name: 'Maria', image: require('../../assets/images/perfil.jpg') },
  ];

  const apps = [
    { id: '1', name: 'Telegram', icon: require('../../assets/images/icons/Icone pontos card categorias.svg') },
    { id: '2', name: 'Gmail', icon: require('../../assets/images/icons/Icone pontos card categorias.svg') },
    { id: '3', name: 'WhatsApp', icon: require('../../assets/images/icons/Icone pontos card categorias.svg') },
    { id: '4', name: 'X', icon: require('../../assets/images/icons/Icone pontos card categorias.svg') },
    { id: '5', name: 'Instagram', icon: require('../../assets/images/icons/Icone pontos card categorias.svg') },
  ];

  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose} style={styles.modal}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Compartilhar</Text>
          <Pressable onPress={onClose}>
            <Text style={styles.closeButton}>×</Text>
          </Pressable>
        </View>
        {/* Contacts Row */}
        <FlatList
          data={contacts}
          keyExtractor={(item) => item.id}
          horizontal
          contentContainerStyle={styles.contactsList}
          renderItem={({ item }) => (
            <View style={styles.contact}>
              <Image source={item.image} style={styles.contactImage} />
              <Text style={styles.contactName}>{item.name}</Text>
            </View>
          )}
        />
        {/* Apps Grid */}
        <FlatList
          data={apps}
          keyExtractor={(item) => item.id}
          numColumns={4}
          contentContainerStyle={styles.appsList}
          renderItem={({ item }) => (
            <View style={styles.app}>
              <Image source={item.icon} style={styles.appIcon} />
              <Text style={styles.appName}>{item.name}</Text>
            </View>
          )}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  container: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#999',
  },
  contactsList: {
    marginBottom: 20,
  },
  contact: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  contactImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 5,
  },
  contactName: {
    fontSize: 12,
    textAlign: 'center',
  },
  appsList: {
    alignItems: 'center',
  },
  app: {
    alignItems: 'center',
    margin: 10,
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
