import React from 'react';
import { View, StatusBar, StyleSheet, ImageBackground, Image, Text, TouchableOpacity, Alert } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../../../utils/supabase';

export default function HomeScreen({ route }) {
    const { user } = route.params || {};
    const navigation = useNavigation();

    const handleSignOut = async () => {
        try {
            await GoogleSignin.signOut(); // Google Sign-Out
            await supabase.auth.signOut(); // Supabase Sign-Out

            Alert.alert("Signed Out", "You have been signed out successfully.");
            navigation.replace('Login'); // Navigate back to SignIn screen
        } catch (error) {
            console.error("Sign Out Error:", error);
            Alert.alert("Error", "Failed to sign out. Please try again.");
        }
    };

    return (
        <View>
            <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
            <View style={styles.container}>
                <View style={styles.profileCard}>
                    <Text style={styles.name}>{user?.name}</Text>
                    <Text style={styles.email}>{user?.email}</Text>
                    <Text style={styles.userId}>User ID: {user?.id}</Text>

                    {/* Sign Out Button */}
                    <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
                        <Text style={styles.signOutText}>Sign Out</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginBottom: 10,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    email: {
        fontSize: 14,
        color: '#666',
    },
    userId: {
        fontSize: 12,
        color: '#999',
        marginTop: 5,
    },
    signOutButton: {
        marginTop: 20,
        backgroundColor: '#ff3b30', // Red color for sign out
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 3,
    },
    signOutText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
});