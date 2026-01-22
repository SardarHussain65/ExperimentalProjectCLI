// src/navigation/types.ts

import { NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

// Auth Stack
export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
};

// Main Tab Navigator
export type MainTabParamList = {
  HomeTab: undefined;
  SearchTab: undefined;
  ProfileTab: undefined;
  SettingsTab: undefined;
};

// Home Stack (nested in Home Tab)
export type HomeStackParamList = {
  HomeScreen: { user?: { name?: string; email?: string; id?: string } };
  ProductDetail: { productId: string };
  Cart: undefined;
};

// Profile Stack (nested in Profile Tab)
export type ProfileStackParamList = {
  ProfileScreen: undefined;
  EditProfile: undefined;
  Orders: undefined;
  OrderDetail: { orderId: string };
};

// Root Navigator
export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Main: NavigatorScreenParams<MainTabParamList>;
  Modal: { title: string; message: string };
};

// Screen Props Types
export type AuthStackScreenProps<T extends keyof AuthStackParamList> =
  NativeStackScreenProps<AuthStackParamList, T>;

export type HomeStackScreenProps<T extends keyof HomeStackParamList> =
  NativeStackScreenProps<HomeStackParamList, T>;

export type ProfileStackScreenProps<T extends keyof ProfileStackParamList> =
  NativeStackScreenProps<ProfileStackParamList, T>;

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

export type MainTabScreenProps<T extends keyof MainTabParamList> =
  BottomTabScreenProps<MainTabParamList, T>;

// Declare global navigation types
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList { }
  }
}