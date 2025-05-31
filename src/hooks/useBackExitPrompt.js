// Metodo responsável por exibir tela de "Sair?" ao clicar para voltar
import { useCallback } from 'react';
import { Alert, BackHandler } from 'react-native';
import { useFocusEffect } from 'expo-router';  // ou "expo-router" dependendo de qual está usando

const useBackExitPrompt = (message = "Deseja sair do aplicativo?") => {
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        Alert.alert(
          'Sair',
          message,
          [
            { text: 'Cancelar', style: 'cancel' },
            { text: 'Sim', onPress: () => BackHandler.exitApp() },
          ],
          { cancelable: true }
        );
        return true;  // impede o comportamento padrão
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, [message])
  );
};

export default useBackExitPrompt;
