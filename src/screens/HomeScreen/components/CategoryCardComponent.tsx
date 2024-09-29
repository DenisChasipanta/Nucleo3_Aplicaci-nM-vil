import React from 'react';
import { View } from 'react-native';
import { IconButton, Text } from 'react-native-paper'
import { styles } from '../../../theme/styles';
import { Category } from '../HomeScreen';
import { CommonActions, useNavigation } from '@react-navigation/native';

// interfaace - Props
interface Props{
  collection: Category;
}

export const CategoryCardComponent = ({collection}: Props) => {
  // hook useNavigation: permite navegar de un screen  otro
  const navigation = useNavigation();
  return (
    <View style={styles.rootListCollection}>
      <View>
        <Text variant='labelLarge'>Categoria: {collection.category} </Text>
        <Text variant='bodyMedium'>Nombre: {collection.name}</Text>
      </View>
      <View style={styles.iconHeader}>
        <IconButton
          icon="arrow-right-bold-box"
          size={30}
          mode='contained'
          onPress={() => navigation.dispatch(CommonActions.navigate({name: "Detail", params:{collection}}))}
        />
      </View>
    </View>
  )
}
