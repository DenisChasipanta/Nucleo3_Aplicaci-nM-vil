import React, { useEffect, useState } from 'react'
import { FlatList, ImageBackground, View } from 'react-native'
import { Avatar, Button, Divider, FAB, IconButton, Modal, Portal, Text, TextInput } from 'react-native-paper'
import { styles } from '../../theme/styles';
import { onAuthStateChanged, signOut, updateCurrentUser, updateProfile } from 'firebase/auth';
import { auth, dbRealTime } from '../../config/firebaseConfig';
import firebase from '@firebase/auth'
import { CategoryCardComponent } from './components/CategoryCardComponent';
import { NewCategoryComponent } from './components/NewCategoryComponent';
import { onValue, ref } from 'firebase/database';
import { NativeScreen } from 'react-native-screens';
import { CommonActions, useNavigation } from '@react-navigation/native';



//Interface - FormUser
interface FormUser {
    name: string;
}

//Inteface - Colecciones
export interface Category {
    id: string,
    code: string,
    category: string,
    name: string,
    description: string,
}

export const HomeScreen = () => {
    //Hook de navegación
    const navigation = useNavigation();
    //Hook useState: cambiar el estado del formulario
    const [formUser, setFormUser] = useState<FormUser>({
        name: ""
    });
    //hook useState: capturar y modificar la data del usuario identificado
    const [userData, setuserData] = useState<firebase.User | null>(null);

    //hook useSate: gestionar la lista de productos
    const [cotegories, setcotegories] = useState<Category[]>([]);

    //Hook useState: permitir que el modal de usuario se visualice o no 
    const [showModalProfile, setshowModalProfile] = useState<boolean>(false);

    //hook useState: permitir que el modal de la categoria se visualize o no
    const [showModalCategory, setshowModalCategory] = useState<boolean>(false)

    //Hook useEffect: obtener información usuario identificado
    useEffect(() => {
        setuserData(auth.currentUser);
        setFormUser({ name: auth.currentUser?.displayName ?? '' })
        //Llamar la función para la lista de collecciones
        getAllCollection();
    }, []);

    //Función: actualizar la información del usuario autenticado
    const handleUpdateUser = async () => {
        try {
            await updateProfile(userData!,
                { displayName: formUser.name });
        } catch (e) {
            console.log(e);
        }
        //ocultar modal de edición
        setshowModalProfile(false);
    }

    //Función actualizar el estado del formulario
    const handleSetValues = (key: string, value: string) => {
        setFormUser({ ...formUser, [key]: value })
    }

    //Función : obtener los productos ára listarlos
    const getAllCollection = () => {
        //1. Direccionar a la tabla de la BDD
        //const dbRef = ref(dbRealTime, 'colecciones/' + auth.currentUser?.uid);
        const dbRef = ref(dbRealTime, 'colecciones');
        //2. acceder a la data..
        onValue(dbRef, (snapshot) => {
            //3. capturar la data
            const data = snapshot.val();  //Obtener la data en un formato esperado
            //4. obtener las keys de cada valor
            const getKeys = Object.keys(data);
            //5. crear un arreglo para almacenar la coleccion
            const listCollection: Category[] = [];
            //6. recorrer las keys para acceder a cada coleccion
            getKeys.forEach((key) => {
                const value = { ...data[key], id: key }
                listCollection.push(value);
            });
            //7. Actualizar la data obtenida en el arreglo hook state
            setcotegories(listCollection);
        })
    }
    //Función: Cerrar Sesión
    const handleSingOuth= async()=>{
        try{
        await signOut(auth);
        //Recetear las rutas
        navigation.dispatch(CommonActions.reset({index:0, routes:[{name:'Login'}]}));
        setshowModalProfile(false); 
        }catch (e){
            console.log(e);            
        }   

    }

    return (
        <>
            <ImageBackground source={require("../HomeScreen/home2.jpg")} style={styles.root}>
                <View style={styles.rootHome}>
                    <View style={styles.header}>
                        <Avatar.Text size={50} label="BP" />
                        <View>
                            <Text variant='bodySmall'>Bienvenid@</Text>
                            <Text variant='labelLarge'>{userData?.displayName}</Text>
                        </View>
                        <View>
                            <IconButton style={styles.iconHeader}
                                icon="account-edit"
                                size={30}
                                mode='contained'
                                onPress={() => setshowModalProfile(true)}
                            />

                        </View>
                    </View>
                    <View>
                        <FlatList
                            data={cotegories}
                            renderItem={({ item }) => <CategoryCardComponent collection={item} />}
                            keyExtractor={item => item.id}
                        />
                    </View>
                </View>
            </ImageBackground>
            <Portal>
                <Modal visible={showModalProfile} contentContainerStyle={styles.modalProfile}>
                    <View style={styles.header}>
                        <Text variant="headlineSmall">Mi Perfil</Text>
                        <View style={styles.iconHeader}>
                            <IconButton
                                icon="close-circle-outline"
                                size={30}
                                onPress={() => setshowModalProfile(false)}
                            />
                        </View>
                    </View>
                    <Divider />
                    <TextInput
                        mode='outlined'
                        label="Nombre"
                        value={formUser.name}
                        onChangeText={(value) => handleSetValues('name', value)}
                    />
                    <TextInput
                        mode='outlined'
                        label="Correo"
                        disabled
                        value={userData?.email!}
                    />
                    <Button mode='contained' onPress={handleUpdateUser}>Actualizar</Button>
                    <View style={styles.sinOut}>
                        <IconButton
                            icon="logout-variant"
                            size={30}
                            mode='contained'
                            onPress={handleSingOuth}
                        />
                    </View>
                </Modal>
            </Portal>
            <FAB
                style={styles.fab}
                icon="plus"
                onPress={() => setshowModalCategory(true)}
            />
            <NewCategoryComponent showModalCategory={showModalCategory} setshowModalCategory={setshowModalCategory} />
        </>
    )
}
