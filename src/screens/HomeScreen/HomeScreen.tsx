import React, { useEffect, useState } from 'react'
import { FlatList, ImageBackground, View } from 'react-native'
import { Avatar, Button, Divider, FAB, IconButton, Modal, Portal, Text, TextInput } from 'react-native-paper'
import { styles } from '../../theme/styles';
import { onAuthStateChanged, signOut, updateCurrentUser, updateProfile } from 'firebase/auth';
import { auth } from '../../config/firebaseConfig';
import firebase from '@firebase/auth'
import { CategoryCardComponent } from './components/CategoryCardComponent';
import { NewCategoryComponent } from './components/NewCategoryComponent';


//Interface - FormUser
interface FormUser {
    name: string;
}

//Inteface - Colecciones
interface Category {
    id: string,
    code: string,
    category: string,
    name: string,
    description: string,
}

export const HomeScreen = () => {
    //Hook useState: cambiar el estado del formulario
    const [formUser, setFormUser] = useState<FormUser>({
        name: ""
    });
    //hook useState: capturar y modificar la data del usuario identificado
    const [userData, setuserData] = useState<firebase.User | null>(null);

    //hook useSate: gestionar la lista de productos
    const [cotegories, setcotegories] = useState<Category[]>([
        {
            id: '1',
            code: '4326ggg',
            category: 'Pelicula',
            name: 'El Rey leon',
            description: 'Me parecio una pelicula muy buena'
        },
        {
            id: '2',
            code: '1udh33',
            category: 'Musica',
            name: 'Hola',
            description: 'Muy buena'
        }
    ]);

    //Hook useState: permitir que el modal de usuario se visualice o no 
    const [showModalProfile, setshowModalProfile] = useState<boolean>(false);

    //hook useState: permitir que el modal de la categoria se visualize o no
    const [showModalCategory, setshowModalCategory] = useState<boolean>(false)

    //Hook useEffect: obtener información usuario identificado
    useEffect(() => {
        setuserData(auth.currentUser);
        setFormUser({ name: auth.currentUser?.displayName ?? '' })

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
                            renderItem={({ item }) => <CategoryCardComponent />}
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
                </Modal>
            </Portal>
            <FAB            
                style={styles.fab}
                icon="plus"                
                onPress={() => setshowModalCategory(true)}
            />
            <NewCategoryComponent showModalCategory={showModalCategory} setshowModalCategory={setshowModalCategory}/>
        </>
    )
}