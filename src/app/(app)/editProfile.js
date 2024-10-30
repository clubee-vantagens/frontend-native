import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
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
  maskCep,
  isValidDate
} from "../../utils/utils";
import axios from "axios";
import { useSession } from "../../context/ctx";
import ConfirmationModal from "../../components/ConfirmationModal";
import { useDeleteUser } from "../../hooks/useDeleteUser";
import { useUserData } from "../../hooks/useUserData";
import { scale, verticalScale } from "react-native-size-matters";
import Constants from "expo-constants";
import { router } from "expo-router";
import CameraModalComponent from "../../components/CameraModalComponent";
import ErrorMessageComponent from "../../components/ErrorMessageComponent";

export default function EditProfile(second) {
  const { session, signOut } = useSession();
  const { mutate, status, isSuccess } = useEditUser();
  const {
    mutate: userDeletion,
    status: deletionStatus,
    isSuccess: deleteSuccess,
  } = useDeleteUser(session);
  const { data: user, refetch } = useUserData(session);
  const [saveModalOpen, setSaveModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [camerModalOpen, setCameraModalOpen] = useState(false)
  const [profileImage, setProfileImage] = useState(user?.photo || null);
  
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
  const cepValue = watch('cep')
  useEffect(() => {
    setValue("phoneNumber", maskPhone(phoneValue));
    setValue('cep', maskCep(cepValue))
  }, [phoneValue, cepValue]);

  const handleDeleteUser = async () => {
    try {
      userDeletion(session);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAddressFromCep = async (cep) => {
    console.log(cep);
    
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
        nascimento: data.nascimento 
        ? convertToISOString(data.nascimento) 
        : user.nascimento,
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


  const close = () => {
    setCameraModalOpen(false)
  }

  const handleImageSelect = (image) => {
     
    setProfileImage(image); // Update the state with the new image
    setCameraModalOpen(false); // Close the modal
  };

  useEffect(() => {
    refetch()
  }, [profileImage])

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} >

      
      <ScrollView>
        <Pressable
          style={{ alignSelf: "start" }}
          onPress={() => router.navigate("/")}
        >
          <CaretLeft size={24} />
        </Pressable>
        <View
          style={{
            justifyContent: "center",
            marginRight: 30,
            alignItems: "center",
          }}
        ></View>
        <View style={{ alignItems: "center" }}>
          <View style={styles.imageContainer}>
            {user?.photo ? (
              <Image source={{ uri: user.photo }} style={styles.image} />
            ) : (
              <View style={styles.defaultImage}>
                <Image
                  source={{
                    uri:
                      profileImage ||
                      "https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_1280.png",
                  }}
                  style={styles.image}
                />
              </View>
            )}
          </View>
          <View style={styles.cameraContainer}>
            <Pressable onPress={() => {
              console.log('pressed')
              setCameraModalOpen(true)
            }
            }>

              <Camera color={"white"} size={16} />
            </Pressable>
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
            rules={{
              minLength: {
                value: 15,
                message: 'O numero de telefone esta incorreto'
              }
            }}
          />
          {errors.phoneNumber && <ErrorMessageComponent>{errors.phoneNumber.message}</ErrorMessageComponent>}
          <View style={{ flexDirection: "row" }}>
            <View>

              <Controller
                control={control}
                rules={{
                  validate: (value) => isValidDate(value) || "Data invalida, tente novamente"
                  
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    placeholder={
                      convertToDDMMYYYY(user?.nascimento) || "DD/MM/AAAA"
                    }
                    placeholderTextColor="#838383"
                    onChangeText={onChange}
                    value={maskDate(value)}
                    style={styles.smallInput}
                  />
                )}
                name="nascimento"
              />
              {errors.nascimento && <ErrorMessageComponent>{errors.nascimento.message}</ErrorMessageComponent>}
            </View>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  placeholder={user?.cep || "CEP"}
                  placeholderTextColor="#838383"
                  onChangeText={(text) => {
                    onChange(text);
                    if (text.length === 9) {
                      fetchAddressFromCep(text.replace("-", ""));
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
                  placeholderTextColor="#838383"
                  onChangeText={onChange}
                  value={value}
                  style={styles.smallInput}
                  editable={false}
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
      </KeyboardAvoidingView>
      {camerModalOpen && <CameraModalComponent close={close} onImageSelect={handleImageSelect}/>}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: Constants.statusBarHeight,
    alignItems: "center",
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
    top: verticalScale(85),
    left: scale(190),
  },
  smallInput: {
    height: 50,
    width: scale(140),
    borderRadius: 7,
    padding: 5,
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
