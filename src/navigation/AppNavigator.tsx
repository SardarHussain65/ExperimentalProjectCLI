// src/navigation/RootNavigator.tsx

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';

// Import navigators
import AuthNavigator from './AuthNavigator';
import TabNavigator from './TabNavigator';

// Import modal screens
import ModalScreen from '../screens/Modal';

// Import your auth hook/context
import { useAuth } from '../hooks/useAuth';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const { isAuthenticated, isLoading } = useAuth();

  // Show splash screen while checking auth
  if (isLoading) {
    return null; // Or return a SplashScreen component
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {!isAuthenticated ? (
        // Auth Stack - shown when user is not logged in
        <Stack.Screen name="Auth" component={AuthNavigator} />
      ) : (
        // Main App Stack - shown when user is logged in
        <Stack.Screen name="Main" component={TabNavigator} />
      )}

      {/* Global Modal - accessible from anywhere */}
      <Stack.Screen
        name="Modal"
        component={ModalScreen}
        options={{
          presentation: 'modal',
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
};

export default RootNavigator;