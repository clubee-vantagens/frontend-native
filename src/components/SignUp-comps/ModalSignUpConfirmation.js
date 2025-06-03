import React from 'react';
import { Modal, View, Text, Pressable, StyleSheet } from 'react-native';

const ModalSignUpConfirmation = ({ visible, onPress, title, message }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalMessage}>{message}</Text>

          <Pressable style={styles.closeButton} onPress={onPress}>
            <Text style={styles.closeButtonText}>Continuar</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)'
},
modalContent: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(247, 247, 247, 1)',
    padding: 20,
    borderRadius: 20,
    width: 300,
    height: 250,
    alignItems: 'center'
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10
  },
  modalMessage: {
    fontSize: 23,
    marginBottom: 20,
    fontWeight: '600',
    textAlign: 'center'
  },
  closeButton: {
    backgroundColor: 'rgba(21, 15, 2, 1)',
    marginTop: 20,
    paddingBlock: 10,
    paddingHorizontal: 20,
    borderRadius: 30
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'rgba(247, 247, 247, 1)'
  },
});

export default ModalSignUpConfirmation;
