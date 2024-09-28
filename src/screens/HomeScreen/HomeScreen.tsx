import React, { useEffect, useState } from 'react'
import { ImageBackground, View } from 'react-native'
import { Avatar, Button, Text } from 'react-native-paper'
import { styles } from '../../theme/styles';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../../config/firebaseConfig';
import { CommonActions } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';




//Interface - UserAuth
interface UserAuth{
    name: string;
}
export const HomeScreen = () => {
    const navigation = useNavigation();

    //Hook useState: cambiar el estado del formulario
    const [userAuth, setUserAuth] = useState<UserAuth>({
        name: ""
    });

    //Hook useEffect: validar el estado de autenticación
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserAuth({name: user.displayName ?? 'NA'})
            }
        })
    }, []);

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            // Navegar de vuelta a la pantalla de inicio de sesión
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'Login' }],
                })
            );
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
            // Aquí podrías mostrar un mensaje de error al usuario
        }
    };
    return (
        <ImageBackground source={require("../HomeScreen/home.jpg")} style={styles.root}>
        <View style={styles.rootHome}>
            <View style={styles.headerHome}>
                <Avatar.Text size={50} label="IM" />
                <View style={styles.headerHome}>
                    <Text variant='bodySmall'>Bienvenid@</Text>
                    <Text variant='labelLarge'>{userAuth.name}</Text>
                </View>
            </View>
            <Button mode="outlined" onPress={handleSignOut} style={styles.signOutButton}>
            Cerrar Sesión
        </Button>
        </View>
        </ImageBackground>
    )
}
