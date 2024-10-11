import { Button, Pressable, StyleSheet, TextInput, View } from "react-native";
import CustomText from "../../components/CustomText";
import { CaretLeft, Camera } from "@phosphor-icons/react";
import { Image } from "expo-image";
import ProfileImage from "../../../assets/images/perfil.jpg";
import Placeholder from "../../../assets/images/placeholder.jpg";
import { Form, useForm, Controller } from "react-hook-form";
import CustomInput from "../../components/CustomInput";
import CustomOption from "../../components/CustomOption";
import CustomButton from "../../components/CustomButton";
import { useEffect, useState } from "react";
import { User } from "../../components/UserData/UserData";
import DropdownComponent from "../../components/DropdownComponent";
import { useEditUser } from "../../hooks/useEditUser";
import { maskCep, maskDate } from "../../utils/utils";
import axios from "axios";
import { useSession } from "../../context/ctx";
import ConfirmationModal from "../../components/ConfirmationModal";
import { useDeleteUser } from "../../hooks/useDeleteUser";
import { Try } from "expo-router/build/views/Try";

export default function EditProfile(second) {
  const [saveModalOpen, setSaveModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  // const {data} = useUserData()
  // console.log(data);
  const { mutate, status, isSuccess } = useEditUser();
  const {mutate: userDeletion, status: deletionStatus, isSuccess: deleteSuccess } = useDeleteUser()
  const { session, signOut } = useSession();

  // useEffect para simular a requisição de dados
  useEffect(() => {
    // Simulando um fetch do backend, usando o dado mocado por enquanto
    const fetchUserData = async () => {
      // Aqui futuramente será a requisição para o backend
      // const response = await api.get('/user');
      // const data = response.data;

      // Simulando atraso de requisição
      setTimeout(() => {
        setUser(User[0]); // Definindo o usuário mocado
      }, 1000);
    };

    fetchUserData();
  }, []);
  const [user, setUser] = useState(null);

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

  const handleDeleteUser = async () => {
    try {
        userDeletion(session)
    } catch (error) {
        console.log(error);
        
    }
  }

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
        nascimento: data.nascimento || user.nascimento,
        cidade: data.cidade || user.cidade,
        estado: data.estado || user.estado,
      };
      mutate({ userData: dataToPost, session });
      console.log(status);
      console.log(dataToPost);
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
    <View style={styles.container}>
      <View style={{ alignItems: "center" }}>
        <CaretLeft style={{ alignSelf: "start" }} size={24} />
        <Image source={ProfileImage} style={styles.image} />
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
          placeholder="Nome Social"
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
          placeholder="Telefone"
        />
        <View style={{ flexDirection: "row" }}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="DD/MM/AAAA"
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
                placeholder="CEP"
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
        <CustomInput control={control} name="endereco" placeholder="Endereco" />
        <View style={{ flexDirection: "row" }}>
          <DropdownComponent control={control} name="estado" />
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Cidade"
                onChangeText={onChange}
                value={value}
                style={styles.smallInput}
              />
            )}
            name="cidade"
          />
        </View>
      </View>
      <CustomButton
        onPress={handleSubmit(handleEditUser)}
      >
        Salvar
      </CustomButton>
      {isSuccess && saveModalOpen && (
        <ConfirmationModal
          text={`Cadastro${"\n"} atualizado!`}
          onPress={() => setSaveModalOpen(false)}
          style={{fontSize: 30}}
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
            handleDeleteUser(session)
            setSaveModalOpen(false)
            signOut()
        }}
          style={{fontSize: 30}}
          type={'delete'}
          back={() => setDeleteModalOpen(false)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  image: {
    borderRadius: "50%",
    height: 120,
    width: 120,
  },
  cameraContainer: {
    borderRadius: 50,
    backgroundColor: "black",
    height: 38,
    width: 38,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 120,
    left: 208,
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
