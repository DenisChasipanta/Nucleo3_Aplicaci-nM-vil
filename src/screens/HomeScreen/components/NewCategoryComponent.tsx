import React, { useState } from 'react'
import { Button, Divider, IconButton, Modal, Portal, Snackbar, Text, TextInput } from 'react-native-paper'
import { styles } from '../../../theme/styles';
import { View } from 'react-native';
import { dbRealTime } from '../../../config/firebaseConfig';
import { push, ref, set } from 'firebase/database';

//interface - Pops (propiedades que enviamos de un componente padre a un componente hijo)
interface Props {
    showModalCategory: boolean;
    setshowModalCategory: Function; // función useState
}
//inteface - FormCategory
interface FormCategoy {
    code: string;
    category: string;
    name: string;
    description: string;
}
//Interface - Message
interface ShowMessage {
    visible: boolean;
    message: string;
    color: string;
}
export const NewCategoryComponent = ({ showModalCategory, setshowModalCategory }: Props) => {
    //hook useState: cambiar el estado del formulario
    const [formCategory, setformCategory] = useState<FormCategoy>({
        code: '',
        category: '',
        name: '',
        description: ''
    });
    //hook useState: cambiar el estado del mensage
    const [showMesagge, setshowMesagge] = useState<ShowMessage>({
        visible: false,
        message: "",
        color: "#fff"
    });

    //funció: actualizar el estado del formulario
    const handleSetValues = (key: string, value: string) => {
        setformCategory({ ...formCategory, [key]: value });
    }
    //Función: agregar los productos
    const handleSaveCategory = async() => {
        if (!formCategory.code || !formCategory.category || !formCategory.name || !formCategory.description) {
            setshowMesagge({ visible: true, message: "Completa todos los campos", color: "#de2040" });
            return;
        }
        //console.log(formCategory);
        //1. crear o direccionar a la tabla de la BDD
        const dbRef= ref (dbRealTime, 'colecciones');
        //2. crear una colección que agrege los datos en la dbRef
        const saveCollection = push(dbRef);
        //3. almacenar los datos en la BDD
        try{
        await set(saveCollection, formCategory);
        setshowModalCategory(false);
        }catch (e){
            console.log(e);
            setshowMesagge({ 
                visible: true, 
                message: "No se completo la transacción, intentalo de nuevo o más tarde!", 
                color: "#de2040" });            
        }
    }
    return (
        <>
            <Portal>
                <Modal visible={showModalCategory} contentContainerStyle={styles.modalProfile}>
                    <View style={styles.header}>
                        <Text variant='headlineSmall'>Nuevo</Text>
                        <View style={styles.iconHeader}>
                            <IconButton
                                icon='close-circle-outline'
                                size={30}
                                onPress={() => setshowModalCategory(false)} />
                        </View>
                    </View>
                    <Divider />
                    <TextInput
                        label='Código'
                        mode='outlined'
                        onChangeText={(value) => handleSetValues('code', value)} />
                    <TextInput
                        label='Categoria'
                        mode='outlined'
                        onChangeText={(value) => handleSetValues('category', value)} />
                    <TextInput
                        label='Nombre'
                        mode='outlined'
                        onChangeText={(value) => handleSetValues('name', value)} />
                    <TextInput
                        label='Descripción'
                        mode='outlined'
                        multiline
                        numberOfLines={3}
                        onChangeText={(value) => handleSetValues('description', value)} />
                    <Button mode='contained' onPress={handleSaveCategory}>Agregar</Button>
                </Modal>
            </Portal>
            <Snackbar
                visible={showMesagge.visible}
                onDismiss={() => setshowMesagge({ ...showMesagge, visible: false })}
                style={{
                    ...styles.message,
                    backgroundColor: showMesagge.color
                }}>
                {showMesagge.message}
            </Snackbar>
        </>
    )
}
