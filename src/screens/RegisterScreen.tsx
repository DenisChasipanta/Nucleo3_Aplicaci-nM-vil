import React, { useState } from 'react'
import { ImageBackground, View } from 'react-native'
import { Button, Snackbar, Text, TextInput } from 'react-native-paper'
import { styles } from '../theme/styles'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../config/firebaseConfig'
import { CommonActions, useNavigation } from '@react-navigation/native'


//Interface-FromRegister
interface FormRegister {
    email: string;
    password: string;
}
//Interface - Message
interface ShowMessage {
    visible: boolean;
    message: string;
    color: string;
}

export const RegisterScreen = () => {
    //hook useState: cambiar el estado del formulario
    const [formRegister, setformRegister] = useState<FormRegister>({
        email: "",
        password: ""
    });
    //hook useState: cambiar el estado del mensage
    const [showMesagge, setshowMesagge] = useState<ShowMessage>({
        visible: false,
        message: "",
        color: "#fff"
    });

    //hook useState: hacer que la contraseña sea visible si o no
    const [hiddenPassword, sethiddenPassword] = useState<boolean>(true);
    //hook useNavitation: permite la navegacion de un screen a otro
    const navigation = useNavigation();

    //Función: Actualizar el estado del formulario
    const handleSetValues = (key: string, value: string) => {
        setformRegister({ ...formRegister, [key]: value });
    }

    //Función Registrar: registar a nuevos usuarios
    const handleRegister = async () => {
        if (!formRegister.email || !formRegister.password) {
            setshowMesagge({ visible: true, message: "Completa todos los campos", color: "#de2040" });
            return;
        }
        console.log(formRegister);
        try {
            const response = await createUserWithEmailAndPassword(
                auth,
                formRegister.email,
                formRegister.password
            );
            setshowMesagge({
                visible: true,
                message: 'Registro exitoso',
                color: '#34de20'
            });
        } catch (e) {
            console.log(e);
            setshowMesagge({
                visible: true,
                message: 'No se logró completar la transición, intentelo más tarde',
                color: '#de2040'
            });
        }
    }
    return (
        <ImageBackground source={require("../image/fondoPantalla.jpg")} style={styles.root}>
            <View style={styles.root}>
                <Text style={styles.text}>Regístrate</Text>
                <TextInput
                    label="Correo"
                    mode="outlined"
                    placeholder='Escribe tu correo'
                    onChangeText={(value) => handleSetValues('email', value)}
                />
                <TextInput
                    label="Contraseña"
                    mode="outlined"
                    placeholder='Escribe contraseña'
                    secureTextEntry={hiddenPassword}
                    onChangeText={(value) => handleSetValues('password', value)}
                    right={<TextInput.Icon icon="eye" onPress={() => sethiddenPassword(!hiddenPassword)} />}
                />
                <Button mode="contained" onPress={handleRegister}>
                    Registrar
                </Button>
                <Text style={styles.textRedirect} onPress={() => navigation.dispatch(CommonActions.navigate({ name: "Login" }))}
                >Ya tienes una cuenta? Inicia Sesión ahora</Text>
                <Snackbar
                    visible={showMesagge.visible}
                    onDismiss={() => setshowMesagge({ ...showMesagge, visible: true })}
                    style={{
                        ...styles.message,
                        backgroundColor: showMesagge.color
                    }}>
                    {showMesagge.message}
                </Snackbar>
            </View>
        </ImageBackground>
    )
}
