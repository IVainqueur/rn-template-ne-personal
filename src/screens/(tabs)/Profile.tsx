import {
  Avatar,
  AvatarFallbackText,
  Button,
  ButtonIcon,
  ButtonText,
  Center,
  Icon,
  Text,
} from '@gluestack-ui/themed';
import {Box} from '@gluestack-ui/themed';
import React from 'react';
import {useAuth} from '../../utils/useAuth.hook';
import {LogOut, User} from 'lucide-react-native';

const ProfileScreen = () => {
  const {user, logout} = useAuth() ?? {};

  return (
    <Box p={'$4'} pt={'$12'}>
      <Center>
        {!user && (
          <Text fontSize={30} fontWeight={'$bold'}>
            Please login to view your profile
          </Text>
        )}
        {user && (
          <>
            <Avatar bgColor="$amber600" size="md" borderRadius="$full">
              <Icon as={User} color='$white'/>
            </Avatar>
            <Text fontSize={30} fontWeight={'$bold'}>
              {user?.firstName} {user?.lastName}
            </Text>
            <Text fontSize={16} fontWeight={'$medium'} color="$gray500">
              {user?.email}
            </Text>
            <Button
              mt={'$2'}
              size="md"
              variant="solid"
              bgColor="$red400"
              action="primary"
              isFocusVisible={false}
              gap={4}
              onPress={logout}>
              <ButtonText>Logout </ButtonText>
              <ButtonIcon as={LogOut} />
            </Button>
          </>
        )}
      </Center>
    </Box>
  );
};

export default ProfileScreen;
