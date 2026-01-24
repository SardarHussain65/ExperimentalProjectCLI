import React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar, useColorScheme } from 'react-native';

import { AuthProvider } from './src/context/AuthContext';
import RootNavigator from './src/navigation/AppNavigator';
import { ModalProvider } from './src/context/ModalContext';

const App = () => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  return (
    <SafeAreaProvider>
      <ModalProvider>
        <AuthProvider>
          <NavigationContainer theme={isDarkMode ? DarkTheme : DefaultTheme}>
            <StatusBar
              barStyle={isDarkMode ? 'light-content' : 'dark-content'}
              backgroundColor={isDarkMode ? '#000000' : '#ffffff'}
            />
            <RootNavigator />
          </NavigationContainer>
        </AuthProvider>
      </ModalProvider>
    </SafeAreaProvider>
  );
};

export default App;