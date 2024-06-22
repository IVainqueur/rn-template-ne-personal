import {
  Box,
  Button,
  ButtonText,
  Center,
  Text,
  View,
} from '@gluestack-ui/themed';
import React, {useEffect} from 'react';
import CustomInput from '../components/CustomInput';
import {useNavigation} from '@react-navigation/native';
import {StackNavigation} from '../utils/types';
import {useToast} from 'react-native-toast-notifications';
import {useAuth} from '../utils/useAuth.hook';

const LoginScreen = () => {
  const navigation = useNavigation<StackNavigation>();
  const toast = useToast();
  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = React.useState({
    email: '',
    password: '',
  });
  const {loggingIn, login, loggedIn} = useAuth() ?? {};

  useEffect(() => {
    if (loggedIn) {
      navigation.navigate('(tabs)');
    }
  }, [loggedIn]);

  const validateFormData = () => {
    let isValid = true;
    const newErrors = {email: '', password: ''};

    // Simple email validation
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
      isValid = false;
    }

    // Simple password validation
    if (!formData.password || formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = () => {
    const isFormDataValid = validateFormData();

    if (isFormDataValid) {
      try {
        if (login) login(formData.email, formData.password);
      } catch (error) {
      } finally {
      }
    } else {
      toast.show('Please fix the errors in the form.', {
        type: 'error',
        placement: 'bottom',
      });
    }
  };

  React.useEffect(() => {
    if (formData.email && formData.password) {
      validateFormData();
    }
  }, [formData]);

  return (
    <Box pt={'$10'}>
      <Center gap={'$4'}>
        <Text
          fontSize={30}
          fontWeight={'$bold'}
          // mb={'$4'}
        >
          Login
        </Text>
        <CustomInput
          label="Email"
          type="text"
          placeholder="Enter your email"
          value={formData.email}
          onChange={e => setFormData({...formData, email: e.nativeEvent.text})}
          errorText={errors.email}
          isInvalid={!!errors.email}
        />
        <CustomInput
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={e =>
            setFormData({...formData, password: e.nativeEvent.text})
          }
          errorText={errors.password}
          isInvalid={!!errors.email}
        />
        <Button
          size="md"
          variant="solid"
          action="primary"
          w={'$72'}
          isDisabled={loggingIn}
          isFocusVisible={false}
          onPress={handleSubmit}>
          <ButtonText>{loggingIn ? 'Loading...' : 'Login'}</ButtonText>
        </Button>
        <Box>
          <Text fontSize={14} color={'$gray.500'}>
            Don't have an account?{' '}
            <Text
              fontSize={14}
              color={'$primary400'}
              onPress={() => {
                navigation.navigate('Signup');
              }}>
              Register
            </Text>
          </Text>
        </Box>
      </Center>
    </Box>
  );
};

export default LoginScreen;
