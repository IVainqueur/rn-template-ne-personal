import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useEffect} from 'react';
import HomeScreen from './HomeScreen';
import ProfileScreen from './Profile';
import {AlignJustify, House, User} from 'lucide-react-native';
import {useAuth} from '../../utils/useAuth.hook';
import {useNavigation} from '@react-navigation/native';
import {StackNavigation} from '../../utils/types';

// Create the bottom tab navigator
const Tab = createBottomTabNavigator();

const ScreenToIconMap = {
  Home: House,
  Profile: User,
  unknown: AlignJustify,
};

const Tabs = () => {
  const {loggedIn} = useAuth() ?? {};
  const navigation = useNavigation<StackNavigation>();

  useEffect(() => {
    if (!loggedIn) {
      navigation.navigate('Login');
    }
  }, []);

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}: any) => ({
        headerShown: false,
        tabBarIcon: ({focused, color, size}) => {
          const Icon = (ScreenToIconMap as any)[route.name ?? 'unknown'];
          return <Icon size={size} color={color} />;
        },
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default Tabs;
