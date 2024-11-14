import React, { useEffect, useState } from "react";
import {
  Animated,
  Modal,
  Pressable,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  PanResponder,
} from "react-native";
import CustomText from "./CustomText";
import { Camera, Image, Trash, X } from "phosphor-react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import * as ImagePicker from "expo-image-picker";
import { Camera as CameraExpo } from "expo-camera";
import axios from "axios";
import * as FileSystem from "expo-file-system";
import * as ImageManipulator from "expo-image-manipulator";
import { useSession } from "../context/ctx";
import { useEditUser } from "../hooks/useEditUser";
import { useUserData } from "../hooks/useUserData";
import LoadingScreen from "./LoadingScreen";
import DragHandleComponent from "./DragHandleComponent";
import theme from "../themes/themes";

export default function CameraModalComponent({ close, onImageSelect }) {
  const { mutate, status, isSuccess } = useEditUser();
  const { session, signOut } = useSession();
  const { data: user, isLoading, error, refetch } = useUserData(session);
  const [isPolling, setIsPolling] = useState(false);
  const [translateY] = useState(new Animated.Value(0)); // Track vertical movement of modal
  const colors = theme.colors

  console.log(translateY);

  const uploadToImgur = async (base64image) => {
    const clientId = "546c25a59c58ad7";

    try {
      const response = await axios.post(
        `https://api.imgur.com/3/image`,
        {
          image: base64image,
          type: "base64",
          title: "Simple Upload",
          description: "Simple Upload",
        },
        {
          headers: {
            Authorization: `Client-ID ${clientId}`,
          },
        }
      );

      if (response.data && response.data.data) {
        return response.data.data.link; // Return the hosted image URL
      }
    } catch (error) {
      console.error(error);
      throw new Error("An error occurred while uploading the image");
    }
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (event, gestureState) => {
      if (gestureState.dy > 0) {
        // Only update translateY if swiping down (dy > 0)
        translateY.setValue(gestureState.dy);
      }
    },
    onPanResponderRelease: (event, gestureState) => {
      if (gestureState.dy > 100) {
        close();
      } else {
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      }
    },
  });
  
  // Function to pick an image from the gallery
  const pickImageFromGallery = async () => {
    // Ask for media library permission
    const mediaLibraryStatus =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (mediaLibraryStatus.status !== "granted") {
      Alert.alert("Sorry, we need gallery permissions to make this work!");
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1], // Square aspect ratio
      quality: 1,
    });

    if (!result.canceled) {
      const resizedImage = await resizeImage(result.assets[0].uri);

      const base64 = await FileSystem.readAsStringAsync(resizedImage, {
        encoding: FileSystem.EncodingType.Base64,
      });
      setIsPolling(true);
      const imgUrl = await uploadToImgur(base64);
      console.log("Image uploaded:", imgUrl);
      mutate(
        { userData: { photo: imgUrl }, session },
        {
          onSuccess: () => {
            console.log("Mutation succeeded, refetching...");
            refetch(); // Refetch after successful mutation
            onImageSelect(base64); // Update the selected image
          },
          onError: (error) => {
            console.log("Mutation failed", error);
          },
        }
      );
    }
    close();
  };

  const resizeImage = async (uri) => {
    const manipResult = await ImageManipulator.manipulateAsync(
      uri,
      [{ resize: { width: 800 } }], // Resize to 800px width, keeping aspect ratio
      { compress: 1, format: ImageManipulator.SaveFormat.JPEG }
    );
    return manipResult.uri;
  };

  // Function to take a picture using the camera
  const takePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({ allowsEditing: true });
    if (!result.canceled) {
      const resizedImage = await resizeImage(result.assets[0].uri);

      const base64 = await FileSystem.readAsStringAsync(resizedImage, {
        encoding: FileSystem.EncodingType.Base64,
      });

      try {
        setIsPolling(true);
        const imgUrl = await uploadToImgur(base64);
        console.log("Image uploaded:", imgUrl);
        mutate(
          { userData: { photo: imgUrl }, session },
          {
            onSuccess: () => {
              console.log("Mutation succeeded, refetching...");
              refetch(); // Refetch after successful mutation
              onImageSelect(base64); // Update the selected image
            },
            onError: (error) => {
              console.log("Mutation failed", error);
            },
          }
        );
      } catch (error) {
        console.log("Upload failed", error);
      } finally {
        close();
      }
    }
  };
  const handleImageDeletion = async() => {
    try {
      setIsPolling(true)
      mutate({ userData: { photo: '' }, session })
      onImageSelect('https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_1280.png')
      
    } catch (error) {
      
    }
  }

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={close}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>

      <Animated.View
        style={[styles.modal, { transform: [{ translateY }] }]}
        {...panResponder.panHandlers} // Spread `panHandlers` here
      >
        <DragHandleComponent />
        <View style={styles.header}>
          <CustomText variant="semiBold" style={styles.headerText}>
            Foto de Perfil
          </CustomText>
          <Pressable onPress={close} style={styles.closeButton}>
            <X size={moderateScale(20)} />
          </Pressable>
        </View>

        <View style={styles.iconRow}>
        <View style={{alignItems: 'center'}}>
          <Pressable style={[styles.iconsContainer, {backgroundColor: colors.textoPreto}]} onPress={takePhoto}>
            <Camera color="white" size={moderateScale(24)} />
          </Pressable>
          <CustomText style={{color: colors.textoPreto}}>Câmera</CustomText>
          </View>
          <View style={{alignItems: 'center'}}>
          <Pressable
            style={[styles.iconsContainer, {backgroundColor: colors.textoPreto}]}
            onPress={pickImageFromGallery}
          >
            <Image color="white" size={moderateScale(24)} />

          </Pressable>
          <CustomText style={{color: colors.textoPreto}}>Galeria</CustomText>
          </View>
          <View style={{alignItems: 'center'}}>
          <Pressable
            style={[styles.iconsContainer, {backgroundColor: colors.textoPreto}]}
            onPress={handleImageDeletion}
          >
            <Trash color="white" size={moderateScale(24)} />

          </Pressable>
          <CustomText style={{color: colors.textoPreto}}>Excluir Foto</CustomText>
          </View>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 10000,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modal: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    height: verticalScale(158),
    backgroundColor: "#fff",
    position: "absolute",
    bottom: 0,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(16),
  },
  header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: scale(16),
    paddingBottom: verticalScale(10),
  },
  headerText: {
    fontSize: moderateScale(16),
    flex: 1,
    textAlign: "center",
  },
  closeButton: {
    position: "absolute",
    right: scale(16),
    bottom: verticalScale(22),
  },
  iconRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
  },
  iconsContainer: {
    borderRadius: 50,
    height: verticalScale(50),
    width: verticalScale(50),
    alignItems: "center",
    justifyContent: "center",
  },
});

