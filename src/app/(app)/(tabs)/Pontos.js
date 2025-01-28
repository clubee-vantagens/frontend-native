import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import {
  ArrowDownRight,
  ArrowUp,
  ArrowUpRight,
  CaretDown,
  CaretLeft,
  Eye,
  EyeClosed,
  FadersHorizontal,
  QuestionMark,
} from "phosphor-react-native";
import CustomText from "../../../components/CustomText";
import PointsIcon from "../../../components/icons/PointsIcon";
import { statusBarHeight } from "../../../constants/constants";
import { useUserData } from "../../../hooks/useUserData";
import { useSession } from "../../../context/ctx";
import { scale } from "react-native-size-matters";
import { Image } from "expo-image";
import LastestActvitiesComponent from "../../../components/LastestActvitiesComponent";
import CatagoryBubble from "../../../components/CategoriesBubble";

const Pontos = () => {
  const activitiesMock = [
    { name: "Business 1", date: "02/06/2023", pointsUsed: "20" },
    { name: "Business 2", date: "03/02/2024", pointsUsed: "05" },
    { name: "Business 2", date: "04/05/2024", pointsUsed: "30" },
  ];
  const activityCategories = [
    { id: "1", category: "PetShop" },
    { id: "2", category: "Roupas" },
    { id: "3", category: "Papelaria" },
    { id: "3", category: "Papelaria" },
    { id: "3", category: "Papelaria" },
    { id: "3", category: "Papelaria" }
  ];
  const [viewPoints, setViewPoints] = useState(false);
  const { signOut, refreshAccessToken, session } = useSession();
  const { data: user, isLoading, error, refetch } = useUserData(session);


  return (
    <ScrollView style={{ marginTop: statusBarHeight, flex: 1 }}>
      <Pressable>
        <CaretLeft size={24} />
      </Pressable>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: scale(10),
        }}
      >
        <CustomText fontSize={scale(24)} variant="semiBold">Meus Pontos</CustomText>
        <View
          style={{ borderWidth: 1, borderColor: "black", borderRadius: 50 }}
        >
          <Pressable onPress={() => setViewPoints(!viewPoints)}>
            <QuestionMark size={20} />
          </Pressable>
        </View>
      </View>
      <View
        style={{
          backgroundColor: "black",
          height: scale(298),
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={styles.containerPoints}>
          <View style={styles.descriptionPoints}>
            <CustomText style={styles.textPoints}>
              Pontos Disponíveis
            </CustomText>
            <CustomText style={styles.points}>
              {viewPoints ? `${user.points || "1"} pts` : "**** pts"}
            </CustomText>
          </View>

          <View>
            <View style={styles.startEye}>
              <Pressable
                style={styles.eyeButton}
                onPress={console.log("clicked")}
              >
                {viewPoints ? <EyeClosed size={24} /> : <Eye size={24} />}
              </Pressable>
              <View style={styles.circleContainer}>
                <PointsIcon />
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            marginTop: 15,
            backgroundColor: "#f7f7f7",
            height: scale(70),
            width: scale(300),
            borderRadius: 8,
            borderCurve: 2,
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <ArrowUpRight size={24} color="green" />
            <View>
              <CustomText fontSize={12}>Pontos adquiridos</CustomText>
              <CustomText style={{ textAlign: "right" }} fontSize={12}>
                +40 pontos
              </CustomText>
            </View>
          </View>
          <View
            style={{
              borderWidth: StyleSheet.hairlineWidth,
              borderColor: "black",
              height: "60%",
            }}
          ></View>
          <View style={{ flexDirection: "row" }}>
            <ArrowDownRight size={24} color="red" />
            <View>
              <CustomText fontSize={12}>Pontos utilizados</CustomText>
              <CustomText style={{ textAlign: "right" }} fontSize={12}>
                -40 pontos
              </CustomText>
            </View>
          </View>
        </View>
      </View>
      <View style={{ alignItems: "center", marginBottom: 20, marginTop: 20 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "90%",
          }}
        >
          <CustomText fontSize={scale(16)} variant="semiBold">
            Suas Ultimas Atividades
          </CustomText>
          <Pressable onPress={() => console.log("clicked")}>
            <FadersHorizontal size={24} />
          </Pressable>
        </View>
        {/* container ultimas atividades */}
        {activitiesMock.map((activity, index) => {
          return (
            <LastestActvitiesComponent
              key={index}
              name={activity.name}
              date={activity.date}
              points={activity.pointsUsed}
            />
          );
        })}
      </View>
      <View style={{ alignItems: "center",}}>
        <View
          style={{
            borderWidth: StyleSheet.hairlineWidth,
            borderColor: "black",
            marginTop: 20,
            width: "90%",
          }}
        ></View>
        <View style={{ marginTop: 20, marginLeft: 10 }}>
          <CustomText fontSize={scale(16)} variant="semiBold">
            Categorias
          </CustomText>
          <ScrollView 
            horizontal={true} 
            showsHorizontalScrollIndicator={false}
            style={{ flexGrow: 0 }}
          >
            <View style={{ flexDirection: "row", marginTop: 20 }}>
              {activityCategories.map((category, index) => {
                return (
                  <CatagoryBubble
                    title={category.category}
                    icon={<Eye />}
                    key={index}
                  />
                );
              })}
            </View>
          </ScrollView>
          
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  containerPoints: {
    backgroundColor: "#FFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    height: scale(157),
    width: scale(300),
    marginHorizontal: 20,
    borderRadius: 8,
  },

  descriptionPoints: {
    justifyContent: "center",
  },
  textPoints: {
    color: "#757575",
  },
  points: {
    fontSize: 50,
  },
  startEye: {
    width: 100,
    height: 100,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  eyeButton: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: "#F1F1EF",
    width: 35,
    height: 35,
    borderRadius: 50,
    padding: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  circleContainer: {
    // width: 50,
    // height: 50,

    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    left: 0,
    zIndex: 1,
  },
});

export default Pontos;
