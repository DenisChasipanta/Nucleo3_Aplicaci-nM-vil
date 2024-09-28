import React from 'react';
import { View } from 'react-native';
import { IconButton, Text } from 'react-native-paper'
import { styles } from '../../../theme/styles';

export const CategoryCardComponent = () => {
  return (
    <View style={styles.rootListCollection}>
      <View>
        <Text variant='labelLarge'>Categoria: </Text>
        <Text variant='bodyMedium'>Nombre: </Text>
      </View>
      <View style={styles.iconHeader}>
        <IconButton
          icon="arrow-right-bold-box"
          size={30}
          mode='contained'
          onPress={() => console.log('Pressed')}
        />
      </View>
    </View>
  )
}
