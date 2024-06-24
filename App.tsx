import {config} from '@gluestack-ui/config'; // Optional if you want to use default theme
import {GluestackUIProvider} from '@gluestack-ui/themed';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BootSplash from 'react-native-bootsplash';
import {ToastProvider} from 'react-native-toast-notifications';
import {RootStackParamList} from './src/utils/types';
import HomeScreen from './src/screens/HomeScreen';
import {PostsProvider} from './src/utils/usePost.hook';
import SinglePostScreen from './src/screens/SinglePostScreen';
import NewPostScreen from './src/screens/NewPostScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer
      onReady={() => {
        BootSplash.hide({fade: true});
      }}>
      <GluestackUIProvider config={config}>
        <ToastProvider>
          <PostsProvider>
            <Stack.Navigator
              initialRouteName="Home"
              screenOptions={{
                headerShown: false,
              }}>
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Single-Post" component={SinglePostScreen} />
              <Stack.Screen name="New-Post" component={NewPostScreen} />
            </Stack.Navigator>
          </PostsProvider>
        </ToastProvider>
      </GluestackUIProvider>
    </NavigationContainer>
  );
}
