import React, { useEffect, useState } from 'react';
import { View, StatusBar, StyleSheet, ImageBackground, Image, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { supabase } from '../../../utils/supabase';
import { HomeStackScreenProps, RootStackParamList } from '../../../navigation/types';
import { SafeAreaView } from 'react-native-safe-area-context';
import Modal from '../../../components/common/Modal';
import { useModal } from '../../../hooks/useModal';

type HomeScreenProps = HomeStackScreenProps<'HomeScreen'>;
type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface UserData {
    name?: string;
    email?: string;
    id?: string;
}

export default function HomeScreen({ route }: HomeScreenProps) {
    const [user, setUser] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation<HomeScreenNavigationProp>();

    useEffect(() => {
        // Fetch user data from Supabase
        const fetchUserData = async () => {
            try {
                const { data: { user: supabaseUser }, error } = await supabase.auth.getUser();

                if (error) {
                    console.error('Error fetching user:', error);
                    Alert.alert('Error', 'Failed to fetch user data');
                    return;
                }

                if (supabaseUser) {
                    setUser({
                        name: supabaseUser.user_metadata?.full_name || supabaseUser.user_metadata?.name || 'User',
                        email: supabaseUser.email || 'No email',
                        id: supabaseUser.id,
                    });
                }
            } catch (error) {
                console.error('Error in fetchUserData:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const { visible, title, description, closeModal, openModal } = useModal();


    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />


            <View style={styles.profileCard}>
                <Text style={styles.name}>User Information</Text>
                <Text style={styles.name}>Name: {user?.name}</Text>
                <Text style={styles.email}>Email: {user?.email}</Text>
            </View>
            <TouchableOpacity style={styles.signOutButton} onPress={() => openModal("Modal Title", "Modal Description")}>
                <Text style={styles.signOutText}>Open Modal</Text>
            </TouchableOpacity>

            <Modal visible={visible} closeModal={closeModal} title={title} description={description} />

        </SafeAreaView >
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center', gap: 20
    },
    profileCard: {
        borderRadius: 10,
        alignItems: 'center',

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
        borderRadius: 8,
        backgroundColor: '#FF0000',
        padding: 10,
        alignItems: 'center',
    },
    signOutText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
});