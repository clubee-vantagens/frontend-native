import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import {
  Star,
  MapPin,
  InstagramLogo,
  FacebookLogo,
  TwitterLogo,
  WhatsappLogo,
  CaretDown,
  CaretUp,
} from "phosphor-react-native";
import CustomText from "../../components/CustomText";
import { scale, verticalScale } from "react-native-size-matters";

export default function PerfilStore() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <ScrollView style={styles.container}>
      {/* Cabeçalho da Loja */}
      <View style={styles.header}>
        <Image
          source={{ uri: "https://randomuser.me/api/portraits/women/1.jpg" }}
          style={styles.storeImage}
        />
        <View>
          <CustomText style={styles.storeName}>Livraria da Manu</CustomText>
          <View style={styles.ratingContainer}>
            <Star size={16} color="#F5C330" weight="fill" />
            <CustomText style={styles.ratingText}>4.9</CustomText>
            <CustomText style={styles.reviewCount}>(15)</CustomText>
            <CustomText style={styles.distance}>| 1,5 Km</CustomText>
          </View>
        </View>
      </View>

      <View style={styles.separator} />

      <CustomText style={styles.sectionTitle} variant="bold">
        Descrição da loja
      </CustomText>
      <CustomText style={styles.description}>
        A Livraria da Manu é uma loja local que combina livros variados e itens
        de papelaria. Com uma seleção de títulos literários e produtos como
        cadernos, canetas e planners, oferece um ambiente acolhedor e
        atendimento personalizado, ideal para quem busca conhecimento e
        criatividade em um só lugar.
      </CustomText>

      <Pressable
        style={styles.sectionHeader}
        onPress={() => setIsExpanded(!isExpanded)}
      >
        <CustomText style={styles.sectionTitle} variant="bold">
          Horário de funcionamento
        </CustomText>
        {isExpanded ? <CaretUp size={18} /> : <CaretDown size={18} />}
      </Pressable>

      {isExpanded && (
        <CustomText style={styles.schedule}>
          Segunda-Feira {"  "} 9:00h às 18:00h
        </CustomText>
      )}

      <CustomText style={styles.sectionTitle} variant="bold">
        Endereço
      </CustomText>
      <View style={styles.addressContainer}>
        <MapPin size={16} color="#000" />
        <View>
          <CustomText>Rua das Letras, 123 - Bairro do Saber</CustomText>
          <CustomText>São Paulo, SP</CustomText>
          <CustomText>CEP 01234-567</CustomText>
        </View>
      </View>

      {/* Redes Sociais */}
      <CustomText style={styles.sectionTitle} variant="bold">
        Redes Sociais
      </CustomText>

      <View style={styles.socialContainer}>
        <InstagramLogo size={16} color="#000" />
        <CustomText variant="bold">Instagram:</CustomText>
        <CustomText>@livrariadamanu</CustomText>
      </View>
      <View style={styles.socialContainer}>
        <FacebookLogo size={16} color="#000" />
        <CustomText variant="bold">facebook:</CustomText>
        <CustomText>facebook.com/livrariadamanu</CustomText>
      </View>
      <View style={styles.socialContainer}>
        <TwitterLogo size={16} color="#000" />
        <CustomText variant="bold">Twitter: </CustomText>
        <CustomText>@livrariadamanu</CustomText>
      </View>
      <View style={styles.socialContainer}>
        <WhatsappLogo size={16} color="#000" />
        <CustomText variant="bold"> WhatsApp:</CustomText>
        <CustomText>(11) 91234-5678</CustomText>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: scale(16),
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: verticalScale(16),
  },
  storeImage: {
    width: scale(50),
    height: scale(50),
    borderRadius: scale(25),
    marginRight: scale(12),
  },
  storeName: {
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
    fontSize: 16,
    fontWeight: "bold",
    marginTop: scale(16),
    marginBottom: scale(8),
  },
  description: {
    fontSize: 14,
    color: "#333",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: scale(8),
  },
  schedule: {
    fontSize: 14,
    color: "#333",
    marginBottom: scale(8),
  },
  addressContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: scale(12),
  },
  socialContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: scale(6),
  },
});
