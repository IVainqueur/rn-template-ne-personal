import {NavigationProp} from '@react-navigation/native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

type ScreenNames = ['Login', 'Signup', '(tabs)', 'Home', 'Profile'];

export type RootStackParamList = Record<ScreenNames[number], undefined>;
export type StackNavigation = NavigationProp<RootStackParamList>;
// export type Props = NativeStackScreenProps<RootStackParamList, typeof ScreenNames[number]>

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}
