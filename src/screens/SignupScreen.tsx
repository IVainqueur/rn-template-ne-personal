import React from 'react';
import {
  Box,
  Button,
  ButtonText,
  Center,
  KeyboardAvoidingView,
  Text,
} from '@gluestack-ui/themed';
import CustomInput from '../components/CustomInput';
import {useNavigation} from '@react-navigation/native';
import {StackNavigation} from '../utils/types';
import {useToast} from 'react-native-toast-notifications';
import {useAuth} from '../utils/useAuth.hook';

const SignupScreen = () => {
  const navigation = useNavigation<StackNavigation>();
  const toast = useToast();
  const {registering, register} = useAuth() ?? {};
  const [formData, setFormData] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const validateFormData = () => {
    let isValid = true;
    const newErrors = {firstName: '', lastName: '', email: '', password: ''};

    if (!formData.firstName) {
      newErrors.firstName = 'First name is required.';
      isValid = false;
    }

    if (!formData.lastName) {
      newErrors.lastName = 'Last name is required.';
      isValid = false;
    }

    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
      isValid = false;
    }

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
        if (register)
          register(
            formData.firstName,
            formData.lastName,
            formData.email,
            formData.password,
          );
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
    if (
      formData.firstName &&
      formData.lastName &&
      formData.email &&
      formData.password
    ) {
      validateFormData();
    }
  }, [formData]);

  return (
    <KeyboardAvoidingView>
      <Box pt={'$10'}>
        <Center gap={'$4'}>
          <Text fontSize={30} fontWeight={'$bold'}>
            Sign Up
          </Text>
          <CustomInput
            label="First Name"
            type="text"
            placeholder="Enter your first name"
            value={formData.firstName}
            onChange={e =>
              setFormData({...formData, firstName: e.nativeEvent.text})
            }
            errorText={errors.firstName}
            isInvalid={!!errors.firstName}
          />
          <CustomInput
            label="Last Name"
            type="text"
            placeholder="Enter your last name"
            value={formData.lastName}
            onChange={e =>
              setFormData({...formData, lastName: e.nativeEvent.text})
            }
            errorText={errors.lastName}
            isInvalid={!!errors.lastName}
          />
          <CustomInput
            label="Email"
            type="text"
            placeholder="Enter your email"
            value={formData.email}
            onChange={e =>
              setFormData({...formData, email: e.nativeEvent.text})
            }
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
            isInvalid={!!errors.password}
          />
          <Button
            size="md"
            variant="solid"
            action="primary"
            w={'$72'}
            isDisabled={registering}
            isFocusVisible={false}
            onPress={handleSubmit}>
            <ButtonText>
              {registering ? 'Registering...' : 'Sign Up'}
            </ButtonText>
          </Button>
          <Box>
            <Text fontSize={14} color={'$gray.500'}>
              Already have an account?{' '}
              <Text
                fontSize={14}
                color={'$primary400'}
                onPress={() => {
                  navigation.navigate('Login');
                }}>
                Login
              </Text>
            </Text>
          </Box>
        </Center>
      </Box>
    </KeyboardAvoidingView>
  );
};

export default SignupScreen;
