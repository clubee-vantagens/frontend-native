// TermsModal.js
import React from 'react';
import { Modal, View, Pressable, StyleSheet } from 'react-native';
import TermsAndConditions from '../../app/NewEstrutura (Mover para .app dps de estruturar)(/authentication/TermsAndConditions';
import CustomText from '../CustomText';

const ModalTermsAndConditions = ({ isVisible, onClose }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
          <TermsAndConditions onClose={onClose} />
    </Modal>
  );
};

export default ModalTermsAndConditions;
