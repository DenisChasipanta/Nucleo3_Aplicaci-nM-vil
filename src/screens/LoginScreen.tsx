import React, { useState } from 'react'
import { ImageBackground, View } from 'react-native'
import { styles } from '../theme/styles'
import { Button, Snackbar, Text, TextInput } from 'react-native-paper'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';
import { CommonActions, useNavigation } from '@react-navigation/native';

//Interface-FromLogin
interface FormLogin {
    email: string;
    password: string;
}
//Interface - Message
interface ShowMessage {
    visible: boolean;
    message: string;
    color: string;
}
export const LoginScreen = () => {
    //hook useState: cambiar el estado del formulario
    const [formLogin, setformLogin] = useState({
        email: "",
        password: ""
    });
    //hook useState: hacer que la contraseña sea visible si o no
    const [hiddenPassword, sethiddenPassword] = useState<boolean>(true);
    //hook useNavitation: permite la navegacion de un screen a otro
    const navigation = useNavigation();

    //hook useState: cambiar el estado del mensage
    const [showMesagge, setshowMesagge] = useState<ShowMessage>({
        visible: false,
        message: "",
        color: "#fff"
    });

    //Función: Actualizar el estado del formulario
    const handleSetValues = (key: string, value: string) => {
        setformLogin({ ...formLogin, [key]: value });
    }
    //Función: Iniciar sesión con el usurio registrado
    const handelSingIn = async () => {
        //Validar que los campos esten llenos
        if (!formLogin.email || !formLogin.password) {
            setshowMesagge({ visible: true, message: "Completa todos los campos", color: "#de2040" });
            return;
        }
        console.log(formLogin);
        try {
            const reponse = await signInWithEmailAndPassword(
                auth,
                formLogin.email,
                formLogin.password
            );
            console.log(reponse);
        } catch (e) {
            console.log(e);
            setshowMesagge({
                visible: true,
                message: "Correo o contraseña incorrecta!",
                color: "#de2040"
            })
        }
    }
    return (
        <ImageBackground source={require("../image/login.jpg")} style={styles.root}>
            <View style={styles.root}>
                <Text style={styles.text}>Inicia Sesión</Text>
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
                <Button mode="contained" onPress={handelSingIn}>
                    Iniciar
                </Button>
                <Text style={styles.textRedirect} onPress={() => navigation.dispatch(CommonActions.navigate({ name: "Register" }))}
                >No tienes una cuenta? Regístrate ahora</Text>
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
