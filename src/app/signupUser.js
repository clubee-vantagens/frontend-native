import { Text, View, StyleSheet, TextInput, Pressable } from "react-native";
import Constants from 'expo-constants';
import { Link, router } from "expo-router";
import Checkbox from "expo-checkbox";
import { MaterialIcons } from "@expo/vector-icons";
import {useForm} from 'react-hook-form'
import CustomInput from "../components/CustomInput"
import CustomButton from "../components/CustomButton"
import { useState } from 'react';
export default function UserSignUpScreen() {
    const {control, handleSubmit, formState: {errors}} = useForm({defaultValues: {name: "", email: "", cpf: "", password: ""}})
    const [isChecked, setChecked] = useState(false)
    return (
        <View style={styles.container}>
            <View style={{alignSelf: 'flex-start', marginLeft: 25}}>
                <Pressable onPress={() => router.navigate('/')}>
                    <MaterialIcons name="arrow-back-ios-new" size={30} color='black'/>
                </Pressable>
            </View>
            <Text style={{fontWeight: 'bold', fontSize: 30}}>Sou Cliente</Text>
            <View>
                <CustomInput control={control} name="name" placeholder="Nome" />
                <CustomInput control={control} name="email" placeholder="E-mail" />
                <CustomInput control={control} name="cpf" placeholder="CPF" />
                <CustomInput control={control} name="password" placeholder="Senha" secureTextEntry={true} />
                <CustomInput control={control} name="confirmPassword" placeholder="Confirmar Senha" secureTextEntry={true} />
                <View style={styles.checkBoxContainer}>
                    <Checkbox value={isChecked} onValueChange={setChecked} color={isChecked ? "#4630EB" : undefined} />
                    <Text style={{fontSize:16, color: 'gray'}}>Concordo com os</Text><Text style={{fontSize:16, textDecorationLine: 'underline'}}>Termos e Condições</Text>

                </View>
            </View>
            <CustomButton onPress={() => console.log('clicked')}>Cadastrar-se</CustomButton>
            <Text style={{fontSize: 20, color: 'gray'}}>Já tem uma conta? <Link style={{fontWeight: 'bold', color: 'black'}}href="/login">Acessar!</Link></Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
        backgroundColor: "#FFFAEB",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center"
    },
    checkBoxContainer: {
        flexDirection: "row",
        justifyContent: "start",
        gap: 10,
        marginTop: 5,
        paddingLeft: 5
    }
})