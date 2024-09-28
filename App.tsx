import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { StackNavigator } from './src/navigator/StackNavigator'
import { PaperProvider } from 'react-native-paper'

export const App = () => {
  return (
    <NavigationContainer>
    <PaperProvider>
    <StackNavigator/>
    </PaperProvider>
    </NavigationContainer>
  )
}
export default App;