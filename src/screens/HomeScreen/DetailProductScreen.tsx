import React, { useEffect, useState } from 'react'
import { ImageBackground, View } from 'react-native'
import { Button, Divider, Text, TextInput } from 'react-native-paper'
import { styles } from '../../theme/styles'
import { useRoute, useNavigation } from '@react-navigation/native';
import { Category } from './HomeScreen'
import { ref, remove, update } from 'firebase/database'
import { auth, dbRealTime } from '../../config/firebaseConfig'


export const DetailProductScreen = () => {
    //hook useRoute: acceder a toda la información de navegación
    const route = useRoute();
    //console.log(route);
    //@ts-ignore
    const { collection } = route.params;
    //console.log(collection);

    //hook useNavigation: permite navegar
    const navigation = useNavigation();

    //hook useState: cambiar el estado del formulario de editar y eliminar
    const [formEdit, setformEdit] = useState<Category>({
        id: '',
        code: '',
        category: '',
        name: '',
        description: ''
    });

    //hook useEffect: cargar y mostar la data en el formulario de detalle
    useEffect(() => {
        //Actualizar los datos en el formulario
        setformEdit(collection);
    }, []);

    //Funcion: actualizar los datos capturados desde el formulario
    const handleSetValues = (key: string, value: string) => {
        setformEdit({ ...formEdit, [key]: value })
    }

    //Funcion: actualizar la data del producto
    const handleUpdateCollection = async () => {
        //console.log(formEdit);
        //1. Direccionar a la tabla de la BDD y al dato a editar
        const dbRef = ref(dbRealTime, 'colecciones/' + formEdit.id);
        //2. Acturalizar el dato seleccionado
        try {
            await update(dbRef, {
                code: formEdit.code,
                category: formEdit.category,
                name: formEdit.name,
                description: formEdit.description
            });
            //3. Regresar al anterior screenn
            navigation.goBack();
        } catch (e) {
            console.log(e);
        }
    }

    //Función: Elimiar la data de coleccion
    const handleDeleteCollection = async () => {
        //1. Direccionar a la tabla de la BDD y al dato a eliminar
        //const dbRef = ref(dbRealTime, 'colecciones/'+auth.currentUser?.uid + '/' + formEdit.id);
        const dbRef = ref(dbRealTime, 'colecciones/' + formEdit.id);
        //2. Eliminar el producto
        try {
            await remove(dbRef);
            //3. Regresar al anterior screenn Home
            navigation.goBack();
        } catch (e) {
            console.log(e);
        }

    }

    return (
        <ImageBackground source={require("../HomeScreen/home3.jpg")} style={styles.root}>
            <View style={styles.rootDeatil}>
                <View>
                    <Text variant='bodyLarge'>Código</Text>
                    <TextInput
                        value={formEdit.code}
                        onChangeText={(value) => handleSetValues('code', value)}
                    />
                    <Text variant='bodyLarge'>Categoría</Text>
                    <TextInput
                        value={formEdit.category}
                        onChangeText={(value) => handleSetValues('category', value)}
                    />
                    <Text variant='bodyLarge'>Nombre</Text>
                    <TextInput
                        value={formEdit.name}
                        onChangeText={(value) => handleSetValues('name', value)}
                    />
                    <Text variant='bodyLarge'>Descripción</Text>
                    <TextInput
                        value={formEdit.description}
                        onChangeText={(value) => handleSetValues('description', value)}
                        multiline
                        numberOfLines={4}
                    />
                </View>
                <Button
                    mode='contained'
                    icon="archive-refresh"
                    onPress={handleUpdateCollection}
                >Actualizar</Button>

                <Button
                    mode='contained'
                    icon="archive-remove"
                    onPress={handleDeleteCollection}
                >Eliminar</Button>
            </View>
        </ImageBackground>
    )
}
