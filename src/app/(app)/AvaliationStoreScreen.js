import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  TextInput,
  Pressable,
  Text,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import {
  Star,
  Camera,
  Video,
  CaretLeft,
  Question,
  VideoCamera,
} from "phosphor-react-native";
import { scale, verticalScale } from "react-native-size-matters";
import CustomText from "../../components/CustomText";
import ModalConfirmation from "../../components/ConfirmationModal";
const AvaliationStoreScreen = () => {
  const router = useRouter();
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = () => {
    setIsModalOpen(true);
  };

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => {
          console.log("pressed");
          router.navigate("/");
        }}
      >
        <CaretLeft size={30} color="black" />
      </Pressable>
      <View style={styles.header}>
        <CustomText fontSize={24} variant="bold">
          Avaliar loja
        </CustomText>
        <Pressable style={styles.infoButton}>
          <Question size={20} color="#000" />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.storeInfo}>
          <Image
            source={{ uri: "https://randomuser.me/api/portraits/women/1.jpg" }}
            style={styles.storeImage}
          />
          <View>
            <CustomText style={styles.boldText}>Livraria da Manu</CustomText>
            <View style={styles.ratingContainer}>
              <Star size={16} color="#F5C330" weight="fill" />
              <CustomText style={styles.ratingText}>4.9</CustomText>
              <CustomText style={styles.reviewCount}>(15)</CustomText>
              <CustomText style={styles.distance}>| 1,5 Km</CustomText>
            </View>
          </View>
        </View>

        <View style={styles.separator} />

        <CustomText style={styles.sectionTitle} variant="bold" fontSize={16}>
          Avalie a loja
        </CustomText>
        <View style={styles.starContainer}>
          {Array.from({ length: 5 }, (_, i) => i + 1).map((star) => (
            <Pressable key={star} onPress={() => setRating(star)}>
              <Star
                size={46}
                weight={star <= rating ? "fill" : "regular"}
                color="#F5C330"
              />
            </Pressable>
          ))}
        </View>

        <CustomText style={styles.sectionTitle} variant="bold">
          Adicione um vídeo ou foto na sua avaliação
        </CustomText>
        <View style={styles.uploadContainer}>
          <Pressable style={styles.uploadButton}>
            <VideoCamera size={24} color="#000" />
            <CustomText>Vídeo</CustomText>
          </Pressable>
          <Pressable style={styles.uploadButton}>
            <Camera size={24} color="#000" />
            <CustomText>Foto</CustomText>
          </Pressable>
        </View>

        <CustomText style={styles.sectionTitle} variant="bold">
          Escreva sua avaliação
        </CustomText>
        <TextInput
          style={styles.textArea}
          placeholder="Sua avaliação é essencial para oferecermos a melhor experiência possível."
          multiline
          value={review}
          onChangeText={setReview}
        />

        <Pressable style={styles.submitButton} onPress={handleSubmit}>
          <Text style={{ color: "#fff", fontWeight: "bold" }}>
            Enviar avaliação
          </Text>
        </Pressable>
      </ScrollView>
      {isModalOpen && (
        <ModalConfirmation
          text="Avaliação realizada com sucesso!"
          onPress={() => setIsModalOpen(false)}
          style={{ fontSize: 30 }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: verticalScale(40),
    padding: scale(16),
  },
  scrollContainer: {
    padding: scale(16),
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(12),
  },
  backButton: {
    padding: scale(8),
  },
  infoButton: {
    padding: scale(8),
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  storeInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: verticalScale(20),
  },
  storeImage: {
    width: scale(50),
    height: scale(50),
    borderRadius: scale(25),
    marginRight: scale(12),
  },
  boldText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: scale(5),
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 4,
  },
  reviewCount: {
    fontSize: 14,
    color: "#888",
    marginHorizontal: 5,
  },
  distance: {
    fontSize: 14,
    color: "#888",
  },
  separator: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginVertical: scale(12),
  },
  sectionTitle: {
    marginTop: scale(16),
    marginBottom: scale(8),
  },
  starContainer: {
    flexDirection: "row",
    justifyContent: "start",
    marginBottom: scale(16),
  },
  uploadContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: scale(16),
  },
  uploadButton: {
    width: "48%",
    borderWidth: 1,
    borderColor: "#000",
    paddingVertical: scale(12),
    borderRadius: scale(8),
    flexDirection: "column",
    alignItems: "center",
    gap: 5,
  },
  textArea: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: scale(8),
    padding: scale(12),
    height: verticalScale(120),
    textAlignVertical: "top",
    marginBottom: scale(16),
  },
  submitButton: {
    backgroundColor: "#000",
    paddingVertical: scale(14),
    borderRadius: scale(8),
    alignItems: "center",
  },
  bottomTab: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: scale(12),
    borderTopWidth: 1,
    borderColor: "#E0E0E0",
    backgroundColor: "#fff",
  },
  tabButton: {
    padding: scale(8),
  },
  activeTabButton: {
    padding: scale(8),
    borderBottomWidth: 2,
    borderColor: "#F5C330",
  },
  tabText: {
    fontSize: 14,
    color: "#666",
  },
  activeTabText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#F5C330",
  },
});

export default AvaliationStoreScreen;
