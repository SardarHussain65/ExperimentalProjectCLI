import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from '../utils/supabase';

interface AuthContextType {
  session: Session | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  session: null,
  isAuthenticated: false,
  isLoading: true,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 1. Get initial session
   supabase.auth.getSession().then(({ data }) => {
  console.log("this is the session data",data);
  setSession(data.session);
  setIsLoading(false);
});


    // 2. Listen for changes (login, logout, etc.)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ session, isAuthenticated: !!session, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};



// src/context/AuthContext.tsx

// import React, { createContext, useState, useEffect, ReactNode } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// interface User {
//   id: string;
//   name: string;
//   email: string;
// }

// interface AuthContextType {
//   isAuthenticated: boolean;
//   isLoading: boolean;
//   user: User | null;
//   login: (email: string, password: string) => Promise<void>;
//   register: (name: string, email: string, password: string) => Promise<void>;
//   logout: () => Promise<void>;
// }

// export const AuthContext = createContext<AuthContextType>({
//   isAuthenticated: false,
//   isLoading: true,
//   user: null,
//   login: async () => {},
//   register: async () => {},
//   logout: async () => {},
// });

// interface AuthProviderProps {
//   children: ReactNode;
// }

// export const AuthProvider = ({ children }: AuthProviderProps) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const [user, setUser] = useState<User | null>(null);

//   // Check if user is logged in on app start
//   useEffect(() => {
//     checkAuthStatus();
//   }, []);

//   const checkAuthStatus = async () => {
//     try {
//       const token = await AsyncStorage.getItem('userToken');
//       const userData = await AsyncStorage.getItem('userData');
      
//       if (token && userData) {
//         setUser(JSON.parse(userData));
//         setIsAuthenticated(true);
//       }
//     } catch (error) {
//       console.error('Error checking auth status:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const login = async (email: string, password: string) => {
//     try {
//       // Replace with your actual API call
//       const response = await fetch('https://api.example.com/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         // Save token and user data
//         await AsyncStorage.setItem('userToken', data.token);
//         await AsyncStorage.setItem('userData', JSON.stringify(data.user));
        
//         setUser(data.user);
//         setIsAuthenticated(true);
//       } else {
//         throw new Error(data.message || 'Login failed');
//       }
//     } catch (error) {
//       throw error;
//     }
//   };

//   const register = async (name: string, email: string, password: string) => {
//     try {
//       // Replace with your actual API call
//       const response = await fetch('https://api.example.com/register', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ name, email, password }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         await AsyncStorage.setItem('userToken', data.token);
//         await AsyncStorage.setItem('userData', JSON.stringify(data.user));
        
//         setUser(data.user);
//         setIsAuthenticated(true);
//       } else {
//         throw new Error(data.message || 'Registration failed');
//       }
//     } catch (error) {
//       throw error;
//     }
//   };

//   const logout = async () => {
//     try {
//       await AsyncStorage.removeItem('userToken');
//       await AsyncStorage.removeItem('userData');
      
//       setUser(null);
//       setIsAuthenticated(false);
//     } catch (error) {
//       console.error('Error logging out:', error);
//     }
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         isAuthenticated,
//         isLoading,
//         user,
//         login,
//         register,
//         logout,
//       }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };