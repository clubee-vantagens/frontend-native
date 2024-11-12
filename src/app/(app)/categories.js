import { Pressable, StyleSheet, TextInput, View } from "react-native";
import CustomText from "../../components/CustomText";
import { statusBarHeight } from "../../constants/constants";
import { CaretLeft, MagnifyingGlass } from "phosphor-react-native";
import { moderateScale, scale, ScaledSheet, verticalScale } from "react-native-size-matters";
import theme from "../../themes/themes";
import { MenuList } from "../../components/MenuData/MenuList";
import CatagoryBubble from "../../components/CategoriesBubble";
import {
  Dog,
  Flower,
  BookOpenText,
  DotsThree,
  CarProfile,
  DesktopTower,
  ForkKnife,
  Yarn,
  Book,
  HairDryer,
  TShirt,
  Wrench,
  Flask,
} from "phosphor-react-native";
import { router } from "expo-router";

export default function Categories(second) {
  const colors = theme.colors;
  return (
    <View style={styles.container}>
      <View style={{ alignSelf: "flex-start", marginLeft: moderateScale(30) }}>
        <Pressable onPress={() => router.back()}>
          <CaretLeft size={25} color={colors.logoPreto}/>
        </Pressable>
        <CustomText variant="bold" style={{fontSize: scale(24), marginTop: scale(10), marginBottom: scale(20)}}>Categorias</CustomText>
      </View>
      <View style={styles.searchContainer}>
        <MagnifyingGlass
          size={moderateScale(20)}
          color={colors.placeholdersGray}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Pesquisar Lojas"
          placeholderTextColor={colors.placeholdersGray}
        />
      </View>
      <View style={styles.categoriesList}>
        <CatagoryBubble page='categories' title={"PetShop"} icon={<Dog size={scale(24)} />} />
        <CatagoryBubble page='categories'
          title={"Flores e plantas"}
          icon={<Flower size={scale(24)} />}
        />
         <CatagoryBubble page='categories'
          title={"Papelaria"}
          icon={<BookOpenText size={scale(24)} />}
        />
        <CatagoryBubble page='categories'
          title={"Limpeza de automoveis"}
          icon={<CarProfile size={scale(24)} />}
        />
        <CatagoryBubble page='categories'
          title={"Informatica e eletronicos"}
          icon={<DesktopTower size={scale(24)} />}
        />
        <CatagoryBubble page='categories'
          title={"Alimentacao"}
          icon={<ForkKnife size={scale(24)} />}
        />
        <CatagoryBubble page='categories'
          title={"Produtos Artesanais"}
          icon={<Yarn size={scale(24)} />}
        />
        <CatagoryBubble page='categories' title={"Livraria"} icon={<Book size={scale(24)} />} />
        <CatagoryBubble page='categories'
          title={"Beleza e Estetica"}
          icon={<HairDryer size={scale(24)} />}
        />
        <CatagoryBubble page='categories'
          title={"Vestuario e calcados"}
          icon={<TShirt size={scale(24)} />}
        />
        <CatagoryBubble page='categories'
          title={"Manutencao de automoveis"}
          icon={<Wrench size={scale(24)} />}
        />
        <CatagoryBubble page='categories'
          title={"Perfumaria"}
          icon={<Flask size={scale(24)} />}
        /> 
      </View>
    </View>
  );
}

const styles = ScaledSheet.create({
  container: {
    marginTop: statusBarHeight,
    alignItems: "center",
    padding: '10@s'
  },
  searchContainer: {
    borderWidth: 1,
    borderRadius: "50%",
    width: '320@s',
    height: '35@vs',
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: '5@vs',
    paddingHorizontal: '15@vs',
  },
  searchInput: {
    flex: 1,
    marginLeft: '10@s',
    fontSize: '10@ms',
  },
  categoriesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flexGrow: 1,
    width: '100%', 
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: '40@s'
  }
});
