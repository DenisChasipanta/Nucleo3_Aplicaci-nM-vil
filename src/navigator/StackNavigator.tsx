
import { LoginScreen } from '../screens/LoginScreen';
import { RegisterScreen } from '../screens/RegisterScreen';
import { HomeScreen } from '../screens/HomeScreen/HomeScreen';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { styles } from '../theme/styles';
import { createStackNavigator } from '@react-navigation/stack';
//Interface - Routes(StackSreenc)
interface Routes {
    name: string;
    screen: () => JSX.Element; //componente react
}

//arreglo - route cuando el usuario no esté autenticado
const routesNoAuth: Routes[] = [
    { name: "Login", screen: LoginScreen },
    { name: "Register", screen: RegisterScreen }
];

//arreglo - route cuando el usuario esté identificado
const routesAuth: Routes[] = [
    { name: "Home", screen: HomeScreen }
];
const Stack = createStackNavigator();

export const StackNavigator = () => {
    // hook useState :Verificar si esta autenticado o no
    const [isAuth, setisAuth] = useState<boolean>(false);
    // hook useState : controlar carga inicial
    const [isLoading, setisLoading] = useState<boolean>(false);
    // hook useEffect: Validar el estao de autenticación
    useEffect(() => {
        //Cargar el activity  indicator
        setisLoading(true);
        onAuthStateChanged(auth, (user) => {
            if (user) { //existe autenticación
                //console.log(user);
                setisAuth(true);
            }
            //Ocultar el activity indicator
            setisLoading(false);
        });
    }, []);
    return (
        <>
            {isLoading ? (
                <View style={styles.rootActivity}>
                    <ActivityIndicator animating={true} size={30}/>
                </View>
            ) : (

                <Stack.Navigator>
                    {
                        !isAuth ?
                            routesNoAuth.map((item, index) => (
                                <Stack.Screen key={index}
                                    name={item.name}
                                    options={{ headerShown: false }}
                                    component={item.screen} />
                            ))
                            :
                            routesAuth.map((item, index) => (
                                <Stack.Screen key={index}
                                    name={item.name}
                                    options={{ headerShown: false }}
                                    component={item.screen} />
                            ))
                    }
                </Stack.Navigator>
            )}
        </>
    );

}