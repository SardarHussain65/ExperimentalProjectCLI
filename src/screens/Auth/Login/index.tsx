import React, { useEffect, useState } from 'react';
import { View, Alert, StatusBar, StyleSheet, TouchableOpacity, Image, Text, ActivityIndicator } from 'react-native';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../../../utils/supabase';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Login() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/drive.readonly'],
      webClientId: '375186088808-fo5ltqt0o8sd4safcr2p65hqoe59c370.apps.googleusercontent.com',
    });

    // Check if user is already signed in
    checkUserSignedIn();
  }, []);

  const checkUserSignedIn = async () => {
    try {
      const userInfo = await GoogleSignin.signInSilently(); // Auto sign-in if already logged in
      if (userInfo && userInfo?.data?.user) {
        console.log('User already signed in:', userInfo);
        navigation.replace('Home', { user: userInfo.data.user }); // Fixed: userInfo.user instead of userInfo.data.user
      } else {
        console.log('No user signed in');
      }
    } catch (error) {
      console.log('User not signed in:', error);
    } finally {
      setLoading(false); // Hide loader after checking
    }
  };


  const handleGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('Google Sign-In Success:', userInfo);

      if (userInfo.data.idToken) {
        const { data, error } = await supabase.auth.signInWithIdToken({
          provider: 'google',
          token: userInfo.data.idToken,
        });

        console.log('Supabase Auth Response:', { data, error });

        if (error) {
          Alert.alert('Error', error.message);
        } else {
          console.log("Signed in with Google successfully");
          navigation.replace('Home', { user: userInfo.data.user });
        }
      } else {
        throw new Error('No ID token present!');
      }
    } catch (error) {
      console.error('Google Sign-In Error:', error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        Alert.alert('Sign In Cancelled', 'User cancelled the login flow.');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        Alert.alert('Sign In In Progress', 'Sign in is already in progress.');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('Play Services Error', 'Google Play services not available or outdated.');
      } else {
        Alert.alert('Error', error.message);
      }
    }
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <View style={styles.container}>
        <TouchableOpacity style={styles.googleButton} onPress={handleGoogleSignIn}>
          <Text style={styles.googleText}>Sign in with Google</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>)
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
  googleButton: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  googleIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  googleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000050',
  },
});