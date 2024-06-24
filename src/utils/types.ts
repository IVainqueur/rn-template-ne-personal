import { NavigationProp } from '@react-navigation/native';

type ScreenNames = ['Home', 'New-Post'];

export type RootStackParamList = {
    [K in ScreenNames[number]]: undefined;
} & {
    'Single-Post': { postId: string };
};

export type StackNavigation = NavigationProp<RootStackParamList>;
// export type Props = NativeStackScreenProps<RootStackParamList, typeof ScreenNames[number]>

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}