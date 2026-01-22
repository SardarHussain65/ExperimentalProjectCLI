// src/navigation/SettingsStackNavigator.tsx

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProfileStackParamList } from './types';
import SettingsScreen from '../screens/Settings/SettingsScreen';

// Import screens

const Stack = createNativeStackNavigator<ProfileStackParamList>();

const SettingsStackNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: true,
                headerStyle: {
                    backgroundColor: '#6200ee',
                },
                headerTintColor: '#fff',
            }}>
            <Stack.Screen
                name="SettingsScreen"
                component={SettingsScreen}
                options={{ title: 'Settings' }}
            />

        </Stack.Navigator>
    );
};

export default SettingsStackNavigator;