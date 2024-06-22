import {Box, Button, ButtonText, Text} from '@gluestack-ui/themed';
import React, {useMemo} from 'react';
import {useToast} from 'react-native-toast-notifications';
import RotatingText from '../../components/RotatingText';
import {useAuth} from '../../utils/useAuth.hook';

const HomeScreen = () => {
  const {user} = useAuth() ?? {};
  const toast = useToast();

  const buttonToastMap = useMemo(() => {
    return [
      {
        title: 'Error Toast',
        bgColor: '$red400',
        onPress: () => {
          toast.show('This is an error toast', {
            type: 'danger',
            duration: 3000,
          });
        },
      },
      {
        title: 'Success Toast',
        bgColor: '$green400',
        onPress: () => {
          toast.show('This is a success toast', {
            type: 'success',
            duration: 3000,
          });
        },
      },
      {
        title: 'Info Toast',
        bgColor: '$blue400',
        onPress: () => {
          toast.show('This is an info toast', {
            type: 'info',
            duration: 3000,
          });
        },
      },
      {
        title: 'Warning Toast',
        bgColor: '$yellow400',
        onPress: () => {
          toast.show('This is a warning toast', {
            type: 'warning',
            duration: 3000,
          });
        },
      },
    ];
  }, [toast]);

  return (
    <Box p={'$5'}>
      <Box flexDirection='row' gap={'$2'}>
        <RotatingText />
        <Text fontSize={30} fontWeight={'$bold'}>
          Welcome back,
        </Text>
      </Box>
      <Text>
        {user?.firstName} {user?.lastName}
      </Text>
      <Box mt={'$2'}>
        <Text mb={'$3'}>What do you want to do today?</Text>
        <Box gap={'$4'}>
          {buttonToastMap.map((button, index) => (
            <Button
              key={index}
              size="md"
              variant="solid"
              bgColor={button.bgColor}
              action="primary"
              isFocusVisible={false}
              onPress={button.onPress}>
              <ButtonText>{button.title}</ButtonText>
            </Button>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default HomeScreen;
