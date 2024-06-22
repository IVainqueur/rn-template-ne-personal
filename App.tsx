import { config } from '@gluestack-ui/config'; // Optional if you want to use default theme
import {
  GluestackUIProvider
} from '@gluestack-ui/themed';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ToastProvider } from 'react-native-toast-notifications';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import { RootStackParamList } from './src/utils/types';
import { AuthProvider } from './src/utils/useAuth.hook';
import Tabs from './src/screens/(tabs)';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <GluestackUIProvider config={config}>
        <ToastProvider>
          <AuthProvider>
            <Stack.Navigator
              initialRouteName="(tabs)"
              screenOptions={{
                headerShown: false,
              }}>
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Signup" component={SignupScreen} />
              <Stack.Screen name="(tabs)" component={Tabs} />
            </Stack.Navigator>
          </AuthProvider>
        </ToastProvider>
      </GluestackUIProvider>
    </NavigationContainer>
  );
}
