import React from "react";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { CaretLeft, Star, Heart, ClockClockwise } from "phosphor-react-native";
import CustomText from "../../components/CustomText";
import { MyAvaliations } from "../../components/UserData/avaliations";
import theme from "../../themes/themes";

export default function Avaliation() {
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={`full-${i}`} size={18} weight="fill" color="#FFD700" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Star
          key="half"
          size={18}
          weight="duotone"
          color="#FFD700"
          opacity={0.5}
        />
      );
    }

    return stars;
  };

  const favorites = MyAvaliations.filter((item) => item.isFavorite);
  const recent = MyAvaliations.filter((item) => !item.isFavorite);

  const renderAvaliations = (list) =>
    list.map((item, index) => (
      <View key={index} style={styles.avaliationCard}>
        <View style={styles.cardHeader}>
          <CustomText fontSize={18} variant="bold" style={styles.cardTitle}>
            {item.title}
          </CustomText>
          <CustomText style={styles.cardDate} variant="bold">
            {item.date}
          </CustomText>
        </View>

        <View style={styles.starsContainer}>
          {renderStars(item.avaliation)}
          <CustomText style={styles.ratingText}>
            {item.avaliation.toFixed(1)}
          </CustomText>
        </View>

        <CustomText style={styles.cardText}>{item.text}</CustomText>
      </View>
    ));

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable>
          <CaretLeft size={24} />
        </Pressable>
      </View>
      <CustomText fontSize={24} variant="bold" style={styles.headerTitle}>
        Minhas Avaliações
      </CustomText>

      {/* Seções */}
      <ScrollView>
        {/* Favoritas */}
        <View style={{ flexDirection: "row", alignItems: "center", gap: 3 }}>
          <Heart size={20} />
          <CustomText fontSize={20} variant="bold" style={styles.sectionTitle}>
            Favoritas
          </CustomText>
        </View>
        {favorites.length > 0 ? (
          renderAvaliations(favorites)
        ) : (
          <CustomText style={styles.noItemsText}>
            Nenhuma avaliação favorita encontrada.
          </CustomText>
        )}

        {/* Recentes */}
        <View style={{ flexDirection: "row", alignItems: "center", gap: 3 }}>
          <ClockClockwise size={20} />
          <CustomText fontSize={20} variant="bold" style={styles.sectionTitle}>
            Recentes
          </CustomText>
        </View>
        {recent.length > 0 ? (
          renderAvaliations(recent)
        ) : (
          <CustomText style={styles.noItemsText}>
            Nenhuma avaliação recente encontrada.
          </CustomText>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.bgWhite,
    padding: 16,
    paddingTop: 50,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  headerTitle: {
    marginLeft: 16,
    marginVertical: 16,
  },
  sectionTitle: {
    marginTop: 20,
    marginBottom: 10,
    color: theme.colors.textOne,
  },
  avaliationCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardTitle: {
    color: theme.colors.textOne,
  },
  cardDate: {
    fontSize: 14,
    color: theme.colors.details,
  },
  starsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  ratingText: {
    marginLeft: 8,
    fontSize: 14,
    color: "#757575",
  },
  cardText: {
    fontSize: 14,
    color: theme.colors.textOne,
    lineHeight: 20,
  },
  noItemsText: {
    fontSize: 14,
    color: theme.colors.details,
    marginBottom: 10,
  },
});
