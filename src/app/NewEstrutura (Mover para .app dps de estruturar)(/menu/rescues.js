import React from "react";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { CaretLeft, ClockClockwise, Heart } from "phosphor-react-native";
import CustomText from "../../../components/CustomText";
import { MyRescues } from "../../../components/UserData/rescuesData";
import theme from "../../../themes/themes";
import { router } from "expo-router";

export default function Avaliation() {
  const favorites = MyRescues.filter((rescue) => rescue.isFavorite);
  const recent = MyRescues.filter((rescue) => !rescue.isFavorite);

  const getStatusStyles = (status) => {
    switch (status) {
      case "Resgatado":
        return {
          bgColor: theme.colors.statusResgatadoBg,
          circleColor: theme.colors.statusResgatadoCircle,
        };
      case "Pendente":
        return {
          bgColor: theme.colors.statusPendenteBg,
          circleColor: theme.colors.statusPendenteCircle,
        };
      case "Cancelado":
        return {
          bgColor: theme.colors.statusCanceladoBg,
          circleColor: theme.colors.statusCanceladoCircle,
        };
      default:
        return {
          bgColor: "#FFFFFF",
          circleColor: "#000000",
        };
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Pressable onPress={() => router.navigate('/')}>
        <CaretLeft size={24} />
      </Pressable>
      <View style={styles.header}>
        <CustomText fontSize={24} variant="bold">
          Meus resgates
        </CustomText>
      </View>
      {/* Seção de Recentes */}
      <View style={styles.sectionTitle}>
        <ClockClockwise />
        <CustomText fontSize={20} variant="bold">
          Recentes
        </CustomText>
      </View>
      {recent.map((rescue, index) => {
        const { bgColor, circleColor } = getStatusStyles(rescue.status);
        return (
          <View key={index} style={[styles.rescueCard]}>
            <View style={styles.containerStatus}>
              <CustomText fontSize={18} variant="bold">
                {rescue.name}
              </CustomText>
              <View
                style={[styles.statusContainer, { backgroundColor: bgColor }]}
              >
                <View
                  style={[
                    styles.circleStatus,
                    { backgroundColor: circleColor },
                  ]}
                ></View>
                <CustomText style={styles.status} variant="bold" fontSize={14}>
                  {rescue.status}
                </CustomText>
              </View>
            </View>
            <View style={styles.descriptions}>
              <CustomText
                style={{ color: theme.colors.details }}
                variant="bold"
              >
                Resgate feito dia {rescue.date}
              </CustomText>
              <CustomText
                style={{ color: theme.colors.details }}
                variant="bold"
              >
                Item resgatado: {rescue.item}
              </CustomText>
            </View>
            <CustomText
              style={[
                { color: theme.colors.details },
                { textDecorationLine: "underline" },
              ]}
            >
              avalie sua experiência
            </CustomText>
          </View>
        );
      })}

      <View style={styles.sectionTitle}>
        <Heart />
        <CustomText fontSize={20} variant="bold">
          Favoritos
        </CustomText>
      </View>
      <ScrollView>
        {/* Seção de Favoritos */}
        {favorites.map((rescue, index) => {
          const { bgColor, circleColor } = getStatusStyles(rescue.status);
          return (
            <View key={index} style={[styles.rescueCard]}>
              <View style={styles.containerStatus}>
                <CustomText fontSize={18} variant="bold">
                  {rescue.name}
                </CustomText>
                <View
                  style={[styles.statusContainer, { backgroundColor: bgColor }]}
                >
                  <View
                    style={[
                      styles.circleStatus,
                      { backgroundColor: circleColor },
                    ]}
                  ></View>
                  <CustomText
                    style={styles.status}
                    variant="bold"
                    fontSize={14}
                  >
                    {rescue.status}
                  </CustomText>
                </View>
              </View>
              <View style={styles.descriptions}>
                <CustomText
                  style={{ color: theme.colors.details }}
                  variant="bold"
                >
                  Resgate feito dia {rescue.date}
                </CustomText>
                <CustomText
                  style={{ color: theme.colors.details }}
                  variant="bold"
                >
                  Item resgatado: {rescue.item}
                </CustomText>
                <CustomText
                  style={[
                    { color: theme.colors.details },
                    { textDecorationLine: "underline" },
                  ]}
                >
                  avalie sua experiência
                </CustomText>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    flex: 1,
    backgroundColor: theme.colors.bgWhite,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 16,
  },
  rescueCard: {
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
  },
  containerStatus: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 118,
    height: 40,
    borderRadius: 30,
  },
  status: {
    marginLeft: 8,
    fontSize: 16,
    color: theme.colors.details,
  },
  circleStatus: {
    width: 9,
    height: 9,
    borderRadius: 10,
  },
  descriptions: {
    marginTop: 20,
  },
  sectionTitle: {
    flexDirection: "row",
    gap: 3,
    marginTop: 16,
    marginBottom: 10,
    color: theme.colors.textOne,
  },
});
