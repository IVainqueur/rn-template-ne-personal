import AsyncStorage from '@react-native-async-storage/async-storage';
import {useContext, createContext, useState, useEffect} from 'react';
import {useToast} from 'react-native-toast-notifications';
import {StackNavigation, User} from './types';
import axios from './axios.config';
import {useNavigation} from '@react-navigation/native';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  loggingIn: boolean;
  register: (firstName: string, lastName: string, email: string, password: string) => Promise<void>;
  registering: boolean;
  logout: () => Promise<void>;
  loggingOut: boolean;
  initialLoading: boolean;
  loggedIn: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
  const navigation = useNavigation<StackNavigation>();
  const toast = useToast();
  const [loggingIn, setLoggingIn] = useState(false);
  const [registering, setRegistering] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
          setLoggedIn(true);
        }
      } catch (error) {
        setLoggedIn(false);
        console.error('Failed to load user from storage', error);
      } finally {
        setInitialLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (email: string, password: string) => {
    setLoggingIn(true);
    try {
      const response = await axios.post('/auth/login', {email, password});
      const {user, access_token} = response.data;
      await AsyncStorage.setItem('user', JSON.stringify(user));
      await AsyncStorage.setItem('token', access_token);
      setUser(user);
      setLoggedIn(true);
      navigation.navigate('(tabs)');
    } catch (error: any) {
      toast.show(
        error.response?.data?.message || 'Login failed. Please try again.',
        {
          type: 'danger',
        },
      );
    } finally {
      setLoggingIn(false);
    }
  };

  const register = async (firstName: string, lastName: string, email: string, password: string) => {
    setRegistering(true);
    try {
      const response = await axios.post('/auth/signup', {firstName, lastName, email, password});
      navigation.navigate('Login');
    } catch (error: any) {
      toast.show(
        error.response?.data?.message ||
          'Registration failed. Please try again.',
        {type: 'danger'},
      );
    } finally {
      setRegistering(false);
    }
  };

  const logout = async () => {
    setLoggingOut(true);
    try {
      await AsyncStorage.removeItem('user');
      await AsyncStorage.removeItem('token');
      setUser(null);
      setLoggedIn(false);
      navigation.navigate('Login');
    } catch (error) {
      toast.show('Logout failed. Please try again.', {type: 'danger'});
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        loggingIn,
        register,
        registering,
        logout,
        loggingOut,
        initialLoading,
        loggedIn,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
