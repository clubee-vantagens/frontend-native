import React from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { Star, ThumbsUp, ThumbsDown } from "phosphor-react-native";
import CustomText from "../CustomText";
import { scale } from "react-native-size-matters";

const ReviewCard = ({ review }) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Image source={{ uri: review.image }} style={styles.userImage} />

        <View style={styles.textContainer}>
          <View style={styles.nameAndDate}>
            <CustomText
              fontSize={scale(14)}
              variant="bold"
              style={styles.userName}
            >
              {review.user}
            </CustomText>
            <CustomText
              fontSize={scale(12)}
              color="#A0A0A0"
              style={styles.date}
            >
              {review.date}
            </CustomText>
          </View>
          <View style={styles.rating}>{renderStars(review.rating)}</View>
        </View>
      </View>

      <CustomText variant="bold" fontSize={scale(14)} style={styles.title}>
        {review.title}
      </CustomText>
      <CustomText style={styles.comment}>{review.comment}</CustomText>

      <View style={styles.actions}>
        <Pressable style={styles.button}>
          <ThumbsUp size={20} color="#000" />
          <CustomText style={styles.buttonText}>{review.likes}</CustomText>
        </Pressable>
        <Pressable style={styles.button}>
          <ThumbsDown size={20} color="#000" />
          <CustomText style={styles.buttonText}>{review.dislike}</CustomText>
        </Pressable>
      </View>
    </View>
  );
};

const renderStars = (rating) => {
  return (
    <View style={styles.starContainer}>
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={scale(16)}
          weight={i < rating ? "fill" : "regular"}
          color="#F5C330"
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: scale(16),
    marginVertical: scale(12),
    borderRadius: scale(8),
    borderWidth: 1,
    borderColor: "#000",
    alignSelf: "center",
    width: "92%",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: scale(8),
  },
  userImage: {
    width: scale(50),
    height: scale(50),
    borderRadius: scale(25),
    marginRight: scale(12),
  },
  textContainer: {
    flex: 1,
    flexDirection: "column",
  },
  nameAndDate: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  userName: {
    fontWeight: "bold",
    fontSize: scale(14),
    marginBottom: scale(4),
  },
  date: {
    fontSize: scale(12),
    color: "#A0A0A0",
  },
  rating: {
    flexDirection: "row",
    marginBottom: scale(6),
  },
  starContainer: {
    flexDirection: "row",
    marginBottom: scale(4),
  },
  title: {
    marginBottom: scale(4),
    fontWeight: "bold",
    fontSize: scale(14),
  },
  comment: {
    fontSize: scale(14),
    lineHeight: scale(18),
    color: "#555",
    marginVertical: scale(6),
    textAlign: "left",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: scale(10),
    marginTop: scale(12),
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: scale(50),
    padding: scale(6),
    width: scale(70),
    height: scale(34),
  },
  buttonText: {
    fontSize: scale(14),
    marginLeft: scale(6),
    color: "#000",
  },
});

export default ReviewCard;
