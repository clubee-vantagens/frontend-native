import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import CustomText from "../../components/CustomText";
import { CaretLeft, Camera } from "phosphor-react-native";
import { Image } from "expo-image";
import { useForm, Controller } from "react-hook-form";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { useEffect, useState } from "react";
import DropdownComponent from "../../components/DropdownComponent";
import { useEditUser } from "../../hooks/useEditUser";
import {
  maskDate,
  convertToISOString,
  maskPhone,
  convertToDDMMYYYY,
} from "../../utils/utils";
import axios from "axios";
import { useSession } from "../../context/ctx";
import ConfirmationModal from "../../components/ConfirmationModal";
import { useDeleteUser } from "../../hooks/useDeleteUser";
import { useUserData } from "../../hooks/useUserData";
import { scale } from "react-native-size-matters";
import Constants from "expo-constants";
import { router } from "expo-router";

export default function EditProfile(second) {
  const { session, signOut } = useSession();
  const { mutate, status, isSuccess } = useEditUser();
  const {
    mutate: userDeletion,
    status: deletionStatus,
    isSuccess: deleteSuccess,
  } = useDeleteUser(session);
  const { data: user } = useUserData(session);
  const [saveModalOpen, setSaveModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  console.log(isSuccess);

  // useEffect para simular a requisição de dados
  // useEffect(() => {
  //   // Simulando um fetch do backend, usando o dado mocado por enquanto
  //   const fetchUserData = async () => {
  //     // Aqui futuramente será a requisição para o backend
  //     // const response = await api.get('/user');
  //     // const data = response.data;

  //     // Simulando atraso de requisição
  //     setTimeout(() => {
  //       setUser(User[0]); // Definindo o usuário mocado
  //     }, 1000);
  //   };

  //   fetchUserData();
  // }, []);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      name: "",
      socialName: "",
      email: "",
      password: "",
      cpf: "",
      phoneNumber: "",
      cep: "",
      endereco: "",
      estado: "",
      cidade: "",
      nascimento: "",
    },
  });
  const phoneValue = watch("phoneNumber");
  useEffect(() => {
    setValue("phoneNumber", maskPhone(phoneValue));
  }, [phoneValue]);

  const handleDeleteUser = async () => {
    try {
      userDeletion(session);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAddressFromCep = async (cep) => {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      const data = response.data;

      if (data.erro) {
        Alert.alert("CEP inválido", "Por favor, insira um CEP válido.");
        return;
      }

      // Popular campos
      setValue("endereco", data.logradouro);
      setValue("cidade", data.localidade);
      setValue("estado", data.uf);
    } catch (error) {
      console.error("Erro ao buscar o CEP:", error);
    }
  };
  const handleEditUser = async (data) => {
    // setIsLoading(true);
    try {
      const dataToPost = {
        name: data.name || user.name,
        socialName: data.socialName || user.socialName,
        phoneNumber: data.phoneNumber || user.phoneNumber,
        cep: data.cep || user.cep,
        nascimento: convertToISOString(data.nascimento) || user.nascimento,
        endereco: data.endereco || user.endereco,
        cidade: data.cidade || user.cidade,
        estado: data.estado || user.estado,
      };
      mutate({ userData: dataToPost, session });
      setSaveModalOpen(true);
      if (status === "idle") {
        console.log("idle");
      }
      //   setModalOpen(true);
    } catch (error) {
      console.log("error", error);
    } finally {
      //   setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View
          style={{
            justifyContent: "flex-start",
            marginRight: 30,
          }}
        >
          <Pressable
            style={{ alignSelf: "start" }}
            onPress={() => router.navigate("/")}
          >
            <CaretLeft size={24} />
          </Pressable>
        </View>
        <View style={{ alignItems: "center" }}>
          <View style={styles.imageContainer}>
            {user?.photo ? (
              <Image source={{ uri: user.photo }} style={styles.image} />
            ) : (
              <View style={styles.defaultImage}>
                <Image
                  source={
                    user?.photo ||
                    "https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_1280.png"
                  }
                  style={styles.image}
                />
              </View>
            )}
          </View>
          <View style={styles.cameraContainer}>
            <Camera color={"white"} size={16} />
          </View>
          <CustomText style={{ marginTop: 20 }}>Editar Dados</CustomText>
        </View>
        <View>
          <CustomInput
            control={control}
            name="name"
            placeholder={user?.name || "Nome"}
          />
          <CustomInput
            control={control}
            name="socialName"
            placeholder={user?.socialName || "Nome Social"}
          />
          <CustomInput
            control={control}
            name="cpf"
            placeholder={user?.cpf || "CPF"}
            editable={false}
          />
          <CustomInput
            control={control}
            name="email"
            placeholder={user?.email || "E-mail"}
            editable={false}
          />
          <CustomInput
            control={control}
            name="phoneNumber"
            placeholder={user?.phoneNumber || "Telefone"}
          />
          <View style={{ flexDirection: "row" }}>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder={
                    convertToDDMMYYYY(user?.nascimento) || "DD/MM/AAAA"
                  }
                  onChangeText={onChange}
                  value={maskDate(value)}
                  style={styles.smallInput}
                />
              )}
              name="nascimento"
            />
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  placeholder={user?.cep || "CEP"}
                  onChangeText={(text) => {
                    onChange(text);
                    if (text.length === 8) {
                      fetchAddressFromCep(text);
                    }
                  }}
                  value={value}
                  style={styles.smallInput}
                />
              )}
              name="cep"
            />
          </View>
          <CustomInput
            control={control}
            name="endereco"
            placeholder={user?.endereco || "Endereco"}
          />
          <View style={{ flexDirection: "row" }}>
            <DropdownComponent control={control} name="estado" />
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder={user?.cidade || "Cidade"}
                  onChangeText={onChange}
                  value={value}
                  style={styles.smallInput}
                />
              )}
              name="cidade"
            />
          </View>
        </View>
        <CustomButton onPress={handleSubmit(handleEditUser)}>
          Salvar
        </CustomButton>
        {saveModalOpen && (
          <ConfirmationModal
            text={`Cadastro${"\n"} atualizado!`}
            onPress={() => setSaveModalOpen(false)}
            style={{ fontSize: 30 }}
          />
        )}
        <Pressable
          style={{ alignSelf: "center", marginTop: 18, color: "red" }}
          onPress={() => setDeleteModalOpen(true)}
        >
          <CustomText variant="semiBold" style={{ color: "#A92525" }}>
            Deletar conta
          </CustomText>
        </Pressable>
        {deleteModalOpen && (
          <ConfirmationModal
            text={`Tem certeza que deseja deletar sua conta no Clubee?`}
            onPress={() => {
              handleDeleteUser(session);
              setSaveModalOpen(false);
              signOut();
            }}
            style={{ fontSize: 30 }}
            type={"delete"}
            back={() => setDeleteModalOpen(false)}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: Constants.statusBarHeight,
  },
  imageContainer: {
    borderRadius: 60, // Metade do valor da largura e altura para circular
    overflow: "hidden",
    width: 120,
    height: 120,
  },
  image: {
    borderRadius: "50%",
    height: 120,
    width: 120,
    // backgroundColor: "#019295",
  },
  defaultImage: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  cameraContainer: {
    borderRadius: 50,
    backgroundColor: "black",
    height: 38,
    width: 38,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 90,
    left: 200,
  },
  smallInput: {
    height: 50,
    width: 170,
    borderRadius: 7,
    padding: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 5,
    margin: 10,
    textAlign: "left",
    paddingLeft: 25,
    color: "#757575",
    fontSize: 18,
    fontWeight: "semibold",
  },
});
